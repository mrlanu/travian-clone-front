import { Component } from '@angular/core';

export interface MessageBrief {
  id: string;
  subject: string;
  senderName: string;
  senderId: string;
  read: boolean;
  time: Date;
}

export interface Message {
  id: string;
}

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {

}
