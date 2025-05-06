# cv_scoring.py

from fastapi import FastAPI, File, UploadFile, HTTPException, Form
from pydantic import BaseModel
from typing import List, Optional, Union
import io
import re
import json
import logging
import datetime
import pdfplumber
import docx2txt
import pytesseract
from PIL import Image
import easyocr
import numpy as np
import spacy
from transformers import pipeline
from dateutil import parser
import language_tool_python

# ─── App & Logging ────────────────────────────────────────────────────────────
app = FastAPI()
logging.basicConfig(level=logging.INFO)

# ─── Load Models ───────────────────────────────────────────────────────────────
nlp = spacy.load("en_core_web_sm")
classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")
reader = easyocr.Reader(["en"], gpu=False)
tool = language_tool_python.LanguageTool('en-US')

# ─── Data Models ───────────────────────────────────────────────────────────────
class Requirement(BaseModel):
    name: str
    pattern: Optional[str] = None
    type: Optional[str] = "numeric"            # 'numeric', 'boolean', 'profession'
    threshold: Optional[float] = None
    expected: Optional[Union[str, List[str]]] = None

class CVScoreDetail(BaseModel):
    requirement: str
    present: bool
    value: Optional[str]
    passed: bool

class CVScore(BaseModel):
    filename: str
    details: List[CVScoreDetail]
    total_score: float   # 0–100%

class CVScoresResponse(BaseModel):
    requirements: List[Requirement]
    results: List[CVScore]

class AutoFieldValidation(BaseModel):
    field_type: str      # "date", "email", "phone", "money", "grammar"
    raw_value: str
    valid: bool
    error: Optional[str]
    line_number: Optional[int] = None

class AutoValidationResponse(BaseModel):
    results: List[AutoFieldValidation]

# ─── Text Extraction Helpers ───────────────────────────────────────────────────
async def extract_text_from_pdf(bytes_data: bytes) -> str:
    text = ""
    with pdfplumber.open(io.BytesIO(bytes_data)) as pdf:
        for page in pdf.pages:
            text += (page.extract_text() or "") + "\n"
        if not text.strip():
            logging.info("No embedded text, falling back to Tesseract + EasyOCR")
            for page in pdf.pages:
                img = page.to_image(resolution=300).original
                t_txt = pytesseract.image_to_string(img)
                if t_txt.strip():
                    text += t_txt + "\n"
                else:
                    arr = np.array(img.convert("RGB"))
                    lines = reader.readtext(arr, detail=0)
                    text += "\n".join(lines) + "\n"
    return text

async def extract_text_from_docx(bytes_data: bytes) -> str:
    return docx2txt.process(io.BytesIO(bytes_data)) or ""

async def extract_text(file: UploadFile) -> str:
    data = await file.read()
    ext = file.filename.rsplit('.', 1)[-1].lower()
    if ext == "pdf":
        raw = await extract_text_from_pdf(data)
    elif ext in ("doc", "docx"):
        raw = await extract_text_from_docx(data)
    else:
        try:
            raw = data.decode('utf-8', errors='ignore')
        except:
            raise HTTPException(400, f"Unsupported file type: {ext}")
    text = raw.replace('’', "'").replace('‘', "'")
    text = re.sub(r"\s+", " ", text).strip().lower()
    return text

# ─── ML Helper ────────────────────────────────────────────────────────────────
def ml_extract_experience(text: str) -> float:
    nums = [float(m.group(1)) for m in re.finditer(r"(\d+(?:\.\d+)?)\s*years?", text)]
    max_num = max(nums) if nums else 0.0
    durations = []
    rng = re.compile(r"(\d{1,2}/\d{4}|[A-Za-z]+ \d{4})\s*[–-]\s*(\d{1,2}/\d{4}|[A-Za-z]+ \d{4}|present|current)", re.IGNORECASE)
    for m in rng.finditer(text):
        parts = re.split(r"[–-]", m.group(0))
        try:
            start = parser.parse(parts[0].strip())
            end = datetime.datetime.today() if 'present' in parts[1].lower() else parser.parse(parts[1].strip())
            delta = (end - start).days/365.25
            if delta > 0:
                durations.append(delta)
        except:
            continue
    total_dates = sum(durations) if durations else 0.0
    return round(max(max_num, total_dates), 2)

# ─── Scoring Endpoint ─────────────────────────────────────────────────────────
@app.post("/score-evaluation", response_model=CVScoresResponse)
async def score_cvs(requirements: str = Form(...), files: List[UploadFile] = File(...)):
    try:
        reqs = [Requirement(**r) for r in json.loads(requirements)]
    except Exception as e:
        raise HTTPException(400, f"Invalid requirements JSON: {e}")
    results: List[CVScore] = []
    for file in files:
        text = await extract_text(file)
        details: List[CVScoreDetail] = []
        passed = 0
        for req in reqs:
            present = False; value = None; ok = False
            if req.type == "numeric":
                yrs = ml_extract_experience(text)
                present = yrs > 0
                value = f"{yrs:.2f}" if present else None
                ok = req.threshold is None or yrs >= req.threshold
            elif req.type == "profession":
                labels = req.expected if isinstance(req.expected, list) else [req.expected]
                cls = classifier(text, candidate_labels=labels, multi_label=False)
                top, score = cls['labels'][0], cls['scores'][0]
                present, ok = score > 0.1, score > 0.5
                value = f"{top} ({score:.2f})"
            else:
                if req.pattern:
                    m = re.search(req.pattern, text)
                    present = bool(m)
                    value = m.group(0).strip() if m else None
                    ok = present
            if ok: passed += 1
            details.append(CVScoreDetail(requirement=req.name, present=present, value=value, passed=ok))
        total = round(passed/len(reqs)*100, 2) if reqs else 0.0
        results.append(CVScore(filename=file.filename, details=details, total_score=total))
    return CVScoresResponse(requirements=reqs, results=results)

# ─── Auto-Validate Endpoint ───────────────────────────────────────────────────
@app.post("/auto-validate", response_model=AutoValidationResponse)
async def auto_validate(file: UploadFile = File(...)):
    text = await extract_text(file)
    results: List[AutoFieldValidation] = []
    lines = text.splitlines()
    # 1) Dates
    for pat in [r"\b\d{2}/\d{2}/\d{4}\b", r"\b\d{4}-\d{2}-\d{2}\b"]:
        for m in re.finditer(pat, text):
            raw = m.group(0)
            line_no = text.count("\n", 0, m.start()) + 1
            try:
                parser.parse(raw, dayfirst=True)
                results.append(AutoFieldValidation(field_type="date", raw_value=raw, valid=True, error=None, line_number=line_no))
            except:
                results.append(AutoFieldValidation(field_type="date", raw_value=raw, valid=False, error="Invalid date", line_number=line_no))
    # 2) Emails
    for m in re.finditer(r"\b\S+@\S+\.\S+\b", text):
        raw = m.group(0)
        line_no = text.count("\n", 0, m.start()) + 1
        results.append(AutoFieldValidation(field_type="email", raw_value=raw, valid=True, error=None, line_number=line_no))
    # 3) Phones
    for m in re.finditer(r"\(\+\d+\)\s*\d+", text):
        raw = m.group(0)
        line_no = text.count("\n", 0, m.start()) + 1
        results.append(AutoFieldValidation(field_type="phone", raw_value=raw, valid=True, error=None, line_number=line_no))
    # 4) Money
    for m in re.finditer(r"\$?\d[\d,]*\.\d{2}", text):
        raw = m.group(0);
        line_no = text.count("\n", 0, m.start()) + 1
        val = raw.replace("$","").replace(",","")
        try:
            float(val)
            results.append(AutoFieldValidation(field_type="money", raw_value=raw, valid=True, error=None, line_number=line_no))
        except:
            results.append(AutoFieldValidation(field_type="money", raw_value=raw, valid=False, error="Invalid number", line_number=line_no))
    # 5) spaCy NER fallback
    seen = {r.raw_value for r in results}
    doc = nlp(text)
    for ent in doc.ents:
        if ent.label_ == "DATE" and ent.text not in seen:
            raw = ent.text
            line_no = text.count("\n", 0, text.find(raw)) + 1
            try:
                parser.parse(raw)
                results.append(AutoFieldValidation(field_type="date", raw_value=raw, valid=True, error=None, line_number=line_no))
            except:
                results.append(AutoFieldValidation(field_type="date", raw_value=raw, valid=False, error="Invalid date", line_number=line_no))
    # 6) Grammar & Spelling
    matches = tool.check(text)
    for m in matches:
        if m.ruleIssueType in ("misspelling","grammar"):
            snippet = text[m.offset:m.offset+m.errorLength]
            line_no = text.count("\n", 0, m.offset) + 1
            results.append(AutoFieldValidation(field_type="grammar", raw_value=snippet, valid=False, error=f"{m.message}; suggestions: {', '.join(m.replacements[:3])}", line_number=line_no))
    logging.debug(f"Auto-validate found: {[r.dict() for r in results]}")
    return AutoValidationResponse(results=results)

# ─── Run ───────────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("cv_scoring:app", host="0.0.0.0", port=8001, reload=True)
