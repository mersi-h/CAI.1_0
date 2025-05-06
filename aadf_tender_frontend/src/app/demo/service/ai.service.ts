import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../../environments/environment";

export interface Message {
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export interface ChatResponse {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AiService {
  private apiUrl = environment.aiApiUrl;
  private apiKey = environment.aiApiKey;

  constructor(private http: HttpClient) { }

  sendMessage(message: string): Observable<ChatResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    });

    const body = {
      messages: [{ role: 'user', content: message }],
      max_tokens: 1000
    };

    return this.http.post<ChatResponse>(`${this.apiUrl}/chat/completions`, body, { headers });
  }
}
