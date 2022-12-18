import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromAppStore from "../../../store/app.reducer";
import {Subscription} from "rxjs";
import {Message} from "../messages.component";
import {messageSelector} from "../store/messages.selectors";
import {countNewMessages, fetchMessage, readMessages} from "../store/messages.actions";
import {skip} from "rxjs/operators";

@Component({
  selector: 'app-message-read',
  templateUrl: './message-read.component.html',
  styleUrls: ['./message-read.component.css']
})
export class MessageReadComponent implements OnInit, OnDestroy{

  @Output() getOut = new EventEmitter<boolean>();
  @Input() messageId: string = '';
  message: Message | undefined;
  componentSubs: Subscription[] = [];

  constructor(private store: Store<fromAppStore.AppState>) {
  }

  ngOnInit(): void {
    this.componentSubs.push(this.store.select(messageSelector).pipe(skip(1)).subscribe(message => {
      this.message = message;
      this.store.dispatch(readMessages({messagesId: [message!.id]}));
      setTimeout(()=>{this.store.dispatch(countNewMessages())}, 300);
    }));
    this.store.dispatch(fetchMessage({messageId: this.messageId}));
  }

  onBack(){
    this.getOut.emit(true);
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
