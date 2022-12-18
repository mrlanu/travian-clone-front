import {Component, OnDestroy, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import * as fromAppStore from "../../../store/app.reducer";
import {sendMessage} from "../store/messages.actions";

export interface MessageSendRequest {
  senderId: string;
  senderName: string;
  recipientName: string;
  subject: string;
  body: string;
}

@Component({
  selector: 'app-message-write',
  templateUrl: './message-write.component.html',
  styleUrls: ['./message-write.component.css']
})
export class MessageWriteComponent implements OnInit, OnDestroy{

  ngOnInit(): void {
    this.messageForm.controls.recipientName.enable();
    this.messageForm.controls.subject.enable();
    this.messageForm.controls.body.enable();
  }

  messageForm!: UntypedFormGroup;

  constructor(private store: Store<fromAppStore.AppState>) {
    this.messageForm = new UntypedFormGroup({
      recipientName: new UntypedFormControl({value: '', disabled: true}, Validators.required),
      subject: new UntypedFormControl({value: '', disabled: true}, Validators.required),
      body: new UntypedFormControl({value: '', disabled: true}, Validators.required),
    });
  }

  onSubmit(){
    let message: MessageSendRequest = {
      senderId: '',
      senderName: '',
      recipientName: this.messageForm.value.recipientName,
      subject: this.messageForm.value.subject,
      body: this.messageForm.value.body,
    }
    this.store.dispatch(sendMessage({message}));
  }

  ngOnDestroy(): void {
  }

}
