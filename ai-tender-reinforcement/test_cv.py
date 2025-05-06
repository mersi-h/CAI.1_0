import json, requests

# 1. Define your requirements
requirements = [
    {
      "name": "Experience",
      "pattern": r"(\\d+) years",
      "type": "numeric",
      "threshold": 10
    }
]

# 2. Prepare the multipart request
files = {
    "files": open("/home/user/CV_JohnDoe.pdf", "rb")
}
data = {
    "requirements": json.dumps(requirements)
}

# 3. Call the service
resp = requests.post("http://localhost:8001/score-cvs", files=files, data=data)
resp.raise_for_status()

# 4. Inspect the result
print(json.dumps(resp.json(), indent=2))