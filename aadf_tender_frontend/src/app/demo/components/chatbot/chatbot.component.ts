import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import {MessageService} from 'primeng/api';
import {Message} from "../../../layout/service/chat.service";
import {ChatService} from "../../../layout/service/chat.service";

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit, AfterViewChecked {
  @ViewChild('chatContainer') private chatContainer: ElementRef;

  visible: boolean = false;
  messages: Message[] = [];
  newMessage: string = '';
  loading: boolean = false;
  error: string = null;

  constructor(
      private chatService: ChatService,
      private messageService: MessageService
  ) { }

  ngOnInit(): void {
    // Add welcome message when component initializes
    this.messages.push({
      text: 'Hello! I\'m your AI assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date()
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  toggleChatbot(): void {
    this.visible = !this.visible;
  }

  sendMessage(): void {
    if (!this.newMessage.trim()) return;

    // Add user message to chat
    this.messages.push({
      text: this.newMessage,
      sender: 'user',
      timestamp: new Date()
    });

    const userQuestion = this.newMessage;
    this.newMessage = '';
    this.loading = true;
    this.error = null;

    // Get AI response
    this.chatService.getResponse(userQuestion).subscribe(
        (response) => {
          this.messages.push({
            text: response,
            sender: 'bot',
            timestamp: new Date()
          });
          this.loading = false;
        },
        (error) => {
          console.error('Error getting response:', error);
          this.error = 'Failed to get response';
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to connect to AI service. Please check your API key and network connection.'
          });

          this.messages.push({
            text: 'Sorry, I encountered an error. Please check your API key and connection.',
            sender: 'bot',
            timestamp: new Date()
          });
          this.loading = false;
        }
    );
  }

  scrollToBottom(): void {
    try {
      if (this.chatContainer) {
        this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
      }
    } catch (err) {
      console.error('Error scrolling to bottom:', err);
    }
  }

  // Handle Enter key press
  handleKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }
}
