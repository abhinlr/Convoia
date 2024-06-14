import {
  AfterViewInit,
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Input,
  Renderer2,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import {NgOptimizedImage, CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.scss'
})
export class ChatWindowComponent implements OnInit, AfterViewInit,OnChanges {
  @ViewChild('chatContainer') private chatContainer!: ElementRef;
  @ViewChild('messageInput') messageInput!: ElementRef;
  constructor(private renderer: Renderer2) {}
  message:string = '';
  @Input() userId!:string;
  messages:{self:boolean,chat:string}[] = [];

  ngOnInit() {

  }


  ngAfterViewInit() {
    this.scrollToBottom();
    if(this.messageInput){this.renderer.selectRootElement(this.messageInput.nativeElement).focus()}
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['userId']) {
      this.messages = [];
      this.messages.push({self:false,chat:'Hi'});
      this.ngOnInit();
      this.ngAfterViewInit();
    }
  }

  private scrollToBottom(): void {
    try {
      if(this.chatContainer){
        this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
      }
    } catch (err) {
      console.error('Error while scrolling to bottom:', err);
    }
  }

  sendMessage() {
    this.messages.push({ self: true, chat: this.message });
    this.message = '';
    this.scrollToBottom();
    const dummyMessage = this.createDummyChat();
    this.messages.push({ self: false, chat: dummyMessage });
    this.scrollToBottom();
  }

  createDummyChat() {
    const messages: string[] = [
      "Hey, how's it going?",
      "Did you hear about that new restaurant?",
      "What do you think about the latest episode?",
      "I'm so tired today...",
      "Guess what happened to me yesterday!",
      "Have you seen the weather forecast?",
      "Thinking of going for a hike this weekend."
    ];

    const randomIndex = Math.floor(Math.random() * messages.length);

    return messages[randomIndex];
  }

}
