import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'https://api.openai.com/v1/chat/completions';
  private conversationHistory: { role: string; content: string }[] = [
    { role: 'system', content: 'You are a helpful and friendly AI assistant. Provide concise and accurate responses.' }
  ];

  constructor(private http: HttpClient) { }

  getResponse(message: string): Observable<string> {
    // Add user message to conversation history
    this.conversationHistory.push({ role: 'user', content: message });

    // Prepare headers with API key
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    // Prepare request body
    const body = {
      model: 'gpt-4o', // You can change this to any supported OpenAI model
      messages: this.conversationHistory,
      max_tokens: 500,
      temperature: 0.7
    };

    return this.http.post<OpenAIResponse>(this.apiUrl, body, { headers }).pipe(
        map(response => {
          const botMessage = response.choices[0].message.content.trim();

          // Add bot response to conversation history
          this.conversationHistory.push({ role: 'assistant', content: botMessage });

          // Keep conversation history at a reasonable length to manage token usage
          if (this.conversationHistory.length > 10) {
            // Keep the system message and the last 9 exchanges
            this.conversationHistory = [
              this.conversationHistory[0],
              ...this.conversationHistory.slice(-9)
            ];
          }

          return botMessage;
        }),
        catchError(error => {
          console.error('API Error:', error);
          if (error.status === 401) {
            return of('API authentication failed. Please check your API key.');
          }
          return of('Sorry, I encountered an error while processing your request. Please try again later.');
        })
    );
  }
}

export interface Message {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface OpenAIResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}
