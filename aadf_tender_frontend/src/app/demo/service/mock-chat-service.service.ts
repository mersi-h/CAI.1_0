import {delay, Observable, of} from "rxjs";
import {ChatResponse} from "./ai.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class MockChatServiceService {

  private readonly responses: Record<string, string[]> = {
    'default': [
      "I'm here to help! What would you like to know?",
      "That's an interesting question. Let me think about that.",
      "I'd be happy to assist with that.",
      "Is there anything specific you'd like to know about this topic?",
      "Great question! Here's what I can tell you...",
    ],
    'greeting': [
      "Hello there! How can I assist you today?",
      "Hi! I'm your AI assistant. What can I help you with?",
      "Greetings! How may I be of service?",
      "Good day! What brings you here today?",
    ],
    'thanks': [
      "You're welcome! Is there anything else I can help with?",
      "My pleasure! Feel free to ask if you have other questions.",
      "Happy to help! Let me know if you need anything else.",
      "Anytime! What else would you like to know?",
    ],
    'features': [
      "This platform helps manage tenders, offers, documentation, clarifications, and evaluations efficiently.",
      "You can track deadlines, upload bid documents, and receive updates on evaluation results.",
      "We also support automated checks for missing documents and flag common errors in submissions.",
    ],
    'help': [
      "You can ask about how to apply to tenders, prepare offers, or meet document requirements.",
      "I can assist with understanding award criteria, evaluation methods, or submission formats.",
      "Need help with joint bids, digital signatures, or appeal procedures? Just ask.",
    ],
    'tenders': [
      "Tenders are published in the procurement portal. Make sure to check the eligibility and scope.",
      "Each tender comes with a dossier that includes instructions, criteria, deadlines, and templates.",
      "Don’t forget to monitor clarifications and addenda issued after the tender is published.",
    ],
    'offers': [
      "Your offer should include technical, financial, and administrative sections as per the instructions.",
      "Ensure all documents are signed and formatted according to the tender requirements.",
      "Double-check your pricing and compliance before submitting — incomplete offers are often disqualified.",
    ],
    'documentation': [
      "Missing or unsigned documents are one of the top reasons for disqualification. Use a checklist.",
      "Make sure all forms are up-to-date, signed, and stamped (if applicable).",
      "If you're submitting scanned documents, ensure the resolution is clear and the file size complies.",
    ],
    'evaluation': [
      "Tenders are usually evaluated in multiple phases: administrative check, technical scoring, and financial scoring.",
      "Make sure your technical proposal clearly meets all award criteria. Vague answers may lose points.",
      "Only offers that pass the administrative phase are evaluated for price and quality.",
    ],
    'award': [
      "Award criteria are detailed in the tender documents. Common ones include price, experience, and methodology.",
      "Sometimes the award is based on the Most Economically Advantageous Tender (MEAT), not just the lowest price.",
      "Transparency in scoring is required. You may request a debrief if your offer was not selected.",
    ],
    'appeals': [
      "If you believe there was an error in evaluation or procedure, you may file an appeal within the legal timeframe.",
      "Appeals are usually filed with the procurement authority or national review body. Check the tender rules.",
      "Include detailed evidence and refer to the specific part of the process you're contesting.",
    ],
    'consortium': [
      "Joint ventures or consortiums are allowed if the tender permits. You must clearly define roles and responsibilities.",
      "Include a signed consortium agreement and supporting documents for each member.",
      "All members must meet the eligibility criteria, or your bid may be disqualified.",
    ],
    'portal': [
      "To submit your offer, log in to the procurement portal, upload documents, and confirm submission before the deadline.",
      "Use the submission portal's checklist to ensure all required files are included.",
      "After submission, you should receive an electronic receipt. Save it for your records.",
    ],
    'goodbye': [
      "Goodbye! Feel free to return if you have more questions.",
      "Have a great day! Chat with you next time.",
      "Until next time! Close this chat window when you're done.",
      "Take care! I'll be here if you need any more assistance.",
    ],
    'subcontracting': [
      "Subcontractors must be declared in the offer if required by the tender. Make sure to submit their credentials.",
      "Some tenders allow subcontracting, but you must respect the maximum subcontracting percentage.",
      "The contracting authority may ask for more documents related to subcontractors after award."
    ],
    'digitalSignature': [
      "Make sure to use a valid electronic signature (QES) when submitting signed documents.",
      "If the signature is not recognized by the portal, check if your certificate is still valid and compatible.",
      "Avoid scanning signed documents — use native signed PDFs or approved formats."
    ],
    'clarifications': [
      "You can request clarifications through the platform within the clarification period.",
      "All clarification responses are usually shared publicly to ensure transparency.",
      "If something in the dossier is unclear, don’t guess — ask via the official channel before the deadline."
    ],
    'submissionErrors': [
      "If your file upload failed, try compressing the documents or checking your internet connection.",
      "Always verify the submission receipt — it proves your bid was submitted before the deadline.",
      "If you discover an error after submission, check if resubmission is allowed before the deadline passes."
    ],
    'templates': [
      "Use the templates provided in the tender documents. Modifying the structure may lead to disqualification.",
      "Always fill out all mandatory fields in the forms. Missing fields often result in rejection.",
      "The forms should be signed and dated where required. Electronic signatures are usually acceptable."
    ],
    'contractExecution': [
      "Once awarded, the contractor must sign the contract within the stated period, usually 10–30 days.",
      "Delays in contract signing or mobilization can lead to cancellation and forfeiture of guarantees.",
      "Start preparing your implementation plan early to meet the timelines after award."
    ],
    'blacklist': [
      "Economic operators on exclusion lists or with serious misconduct cannot participate in tenders.",
      "Check if your company or consortium members meet all legal and ethical eligibility standards.",
      "Exclusion grounds include past fraud, tax evasion, or breach of contract in previous procurements."
    ],
    'legal': [
      "The applicable procurement law is often specified in the tender dossier — e.g., EU Directive 2014/24/EU or national law.",
      "For disputes or doubts, consult the national procurement authority or legal advisors.",
      "You can cite legal references in your appeal or clarification request if needed."
    ],
    'deadlines': [
      "Always check the exact time zone of the deadline. Late submissions, even by seconds, are disqualified.",
      "Be aware of both the submission deadline and clarification period deadlines.",
      "Upload your documents early to avoid last-minute issues with the platform."
    ]
  };

  constructor() {}

  private categorizeMessage(message: string): string {
    const lowerMessage = message.toLowerCase();

    if (/^(hi|hello|hey|greetings|good (morning|afternoon|evening))/.test(lowerMessage)) return 'greeting';
    if (/thank|thanks|appreciate|grateful/.test(lowerMessage)) return 'thanks';
    if (/feature|what can|capabilities|functionality/.test(lowerMessage)) return 'features';
    if (/help|assist|support|guide|how (to|do)/.test(lowerMessage)) return 'help';
    if (/bye|goodbye|see you|talk later|end|close/.test(lowerMessage)) return 'goodbye';

    if (/tender|procurement|rfp|request for proposal|call for tender/.test(lowerMessage)) return 'tenders';
    if (/offer|bid|quotation|submission|technical offer|financial offer/.test(lowerMessage)) return 'offers';
    if (/document|form|file|annex|attachment|missing|upload|signature/.test(lowerMessage)) return 'documentation';
    if (/evaluation|score|points|criteria|scoring|review/.test(lowerMessage)) return 'evaluation';
    if (/award|contract|winner|selected|result/.test(lowerMessage)) return 'award';
    if (/appeal|contest|dispute|challenge|review body/.test(lowerMessage)) return 'appeals';
    if (/joint venture|consortium|partnership|teaming/.test(lowerMessage)) return 'consortium';
    if (/portal|submit|upload|platform|e-procurement/.test(lowerMessage)) return 'portal';
    if (/subcontract|partner company|external partner/.test(lowerMessage)) return 'subcontracting';
    if (/digital signature|e-sign|sign electronically|certificate/.test(lowerMessage)) return this.getResponse('digitalSignature');
    if (/clarify|clarification|unclear|question deadline/.test(lowerMessage)) return 'clarifications';
    if (/upload error|submission failed|resubmit|file error|submission issue/.test(lowerMessage)) return 'submissionErrors';
    if (/template|form|annex|structure|format/.test(lowerMessage)) return 'templates';
    if (/execute contract|start project|post-award|mobilization/.test(lowerMessage)) return 'contractExecution';
    if (/blacklist|excluded|barred|sanctioned|ground for exclusion/.test(lowerMessage)) return 'blacklist';
    if (/law|regulation|directive|legal basis|legal reference/.test(lowerMessage)) return 'legal';
    if (/deadline|cutoff|closing time|submission time/.test(lowerMessage)) return 'deadlines';
    return 'default';
  }

  private getResponse(category: string): string {
    const responses = this.responses[category] || this.responses['default'];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  private generateContextualResponse(message: string): string | null {
    const lowerMessage = message.toLowerCase();

    if (/deadline|late submission|timeline|cut-off/.test(lowerMessage)) {
      return "Be sure to submit all required documents before the deadline. Late bids are usually rejected automatically.";
    }

    if (/clarification|unclear|request question|q&a/.test(lowerMessage)) {
      return "Clarifications can be submitted during the official period via the platform. Answers are published to all participants.";
    }

    if (/eligibility|requirements|qualification|who can apply/.test(lowerMessage)) {
      return "Eligibility requirements vary by tender. Check the administrative and technical requirements in the tender dossier.";
    }

    if (/correction|resubmit|error in document|mistake/.test(lowerMessage)) {
      return "If the submission deadline hasn't passed, you may resubmit. Always check the portal for allowed corrections.";
    }

    if (/award notice|results published|how to see result/.test(lowerMessage)) {
      return "Award notices are published on the procurement portal. You’ll also be notified directly if your offer is selected.";
    }

    if (/subcontract|partner company|external partner/.test(lowerMessage))
      return "Make sure subcontractors are properly declared and meet all eligibility criteria.";

    if (/digital signature|e-sign|sign electronically|certificate/.test(lowerMessage))
      return "Use a valid qualified electronic signature (QES) when signing tender documents.";

    if (/clarify|clarification|unclear|question deadline/.test(lowerMessage))
      return "Clarification requests must be submitted before the official deadline set in the tender.";

    if (/upload error|submission failed|resubmit|file error|submission issue/.test(lowerMessage))
      return "Ensure all files are in the correct format and within size limits before uploading.";

    if (/template|form|annex|structure|format/.test(lowerMessage))
      return "Always use the official templates provided in the tender documentation to avoid disqualification.";

    if (/execute contract|start project|post-award|mobilization/.test(lowerMessage))
      return "Contract execution starts after the award and any standstill period, based on the tender terms.";

    if (/blacklist|excluded|barred|sanctioned|ground for exclusion/.test(lowerMessage))
      return "Entities on exclusion lists must provide evidence of corrective measures to remain eligible.";

    if (/law|regulation|directive|legal basis|legal reference/.test(lowerMessage))
      return "Check the legal framework cited in the tender to ensure compliance with national and EU laws.";

    if (/deadline|cutoff|closing time|submission time/.test(lowerMessage))
      return "Late submissions are not accepted—ensure you submit well before the specified deadline.";



    return null;
  }

  sendMessage(message: string): Observable<ChatResponse> {
    const contextualResponse = this.generateContextualResponse(message);
    const category = this.categorizeMessage(message);
    const response = contextualResponse || this.getResponse(category);
    const randomDelay = Math.floor(Math.random() * 1500) + 500;

    return of({ message: response }).pipe(delay(randomDelay));
  }
}
