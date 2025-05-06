import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked, HostListener } from '@angular/core';
import {MockChatServiceService} from "../../service/mock-chat-service.service";

interface ChatMessage {
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollContainer') private scrollContainer: ElementRef;

  messages: ChatMessage[] = [];
  currentMessage: string = '';
  loading: boolean = false;
  isExpanded: boolean = false;

  // Store chat state in local storage
  private readonly STORAGE_KEY = 'chat_expanded_state';
  private readonly MESSAGES_KEY = 'chat_messages';

  constructor(private chatService: MockChatServiceService) { }

  ngOnInit(): void {
    // Load saved expansion state
    this.loadState();

    // Load saved messages or add welcome message if none exist
    if (this.messages.length === 0) {
      this.addBotMessage('Hello! How can I help you today?');
    }

    // Listen for escape key to minimize chat
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && this.isExpanded) {
        this.toggleChat();
      }
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  sendMessage(): void {
    const message = this.currentMessage.trim();

    if (!message || this.loading) {
      return;
    }

    // Add user message to the chat
    this.addUserMessage(message);

    // Clear input field
    this.currentMessage = '';

    // Set loading state
    this.loading = true;

    // Call the mock service
    this.chatService.sendMessage(message).subscribe({
      next: (response) => {
        // Add AI response to the chat
        this.addBotMessage(response.message);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error sending message:', error);
        this.addBotMessage('Sorry, I encountered an error. Please try again.');
        this.loading = false;
      }
    });
  }

  private addUserMessage(text: string): void {
    this.messages.push({
      text,
      sender: 'user',
      timestamp: new Date()
    });
  }

  private addBotMessage(text: string): void {
    this.messages.push({
      text,
      sender: 'ai',
      timestamp: new Date()
    });
  }

  private scrollToBottom(): void {
    try {
      if (this.scrollContainer && this.scrollContainer.nativeElement) {
        this.scrollContainer.nativeElement.scrollTop =
            this.scrollContainer.nativeElement.scrollHeight;
      }
    } catch (err) {
      console.error('Error scrolling to bottom:', err);
    }
  }

  /**
   * Toggles the chat between expanded and minimized states
   */
  toggleChat(): void {
    this.isExpanded = !this.isExpanded;
    this.saveState();

    // If expanding, focus the input field after a brief delay
    if (this.isExpanded) {
      setTimeout(() => {
        const inputElement = document.querySelector('.input-group input') as HTMLInputElement;
        if (inputElement) {
          inputElement.focus();
        }
      }, 100);
    }
  }

  /**
   * Saves the current chat state to localStorage
   */
  private saveState(): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.isExpanded));
      localStorage.setItem(this.MESSAGES_KEY, JSON.stringify(this.messages));
    } catch (err) {
      console.error('Error saving chat state:', err);
    }
  }

  /**
   * Loads the chat state from localStorage
   */
  private loadState(): void {
    try {
      // Load expanded state
      const savedState = localStorage.getItem(this.STORAGE_KEY);
      if (savedState !== null) {
        this.isExpanded = JSON.parse(savedState);
      }

      // Load saved messages
      const savedMessages = localStorage.getItem(this.MESSAGES_KEY);
      if (savedMessages !== null) {
        const parsedMessages = JSON.parse(savedMessages);

        // Convert string dates back to Date objects
        this.messages = parsedMessages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
      }
    } catch (err) {
      console.error('Error loading chat state:', err);
    }
  }

  /**
   * Update localStorage whenever messages change
   */
  private updateStoredMessages(): void {
    try {
      localStorage.setItem(this.MESSAGES_KEY, JSON.stringify(this.messages));
    } catch (err) {
      console.error('Error saving messages:', err);
    }
  }

}