import {Component, ViewChild} from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromAppStore from "../../store/app.reducer";
import {ActivatedRoute, Router} from "@angular/router";
import {TabsetComponent} from "ngx-bootstrap/tabs";

export interface MessageBrief {
  id: string;
  subject: string;
  senderName: string;
  senderId: string;
  recipientName: string;
  recipientId: string;
  read: boolean;
  time: Date;
}

export interface Message {
  id: string;
  subject: string;
  body: string;
  senderId: string;
  senderName: string;
  dateTime: Date;
}

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {

  listVisible = true;
  selectedMessageId: string = '';
  @ViewChild('staticTabs', { static: false }) staticTabs?: TabsetComponent;

  constructor(private store: Store<fromAppStore.AppState>, private router: Router, private route: ActivatedRoute) {
  }


  selectTab(tabId: number) {
    if (this.staticTabs?.tabs[tabId]) {
      this.staticTabs.tabs[tabId].active = true;
    }
  }

  messageSelected(messageId: string){
    this.selectedMessageId = messageId;
    this.listVisible = false;
  }

  onIndexSelect(){
    this.listVisible = true;
  }

  onWriteSelect(){

  }

  onSentSelect(){
    this.listVisible = true;
  }

}
