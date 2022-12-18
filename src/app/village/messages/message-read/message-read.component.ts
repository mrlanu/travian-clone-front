import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromAppStore from "../../../store/app.reducer";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {Message} from "../messages.component";
import {messageSelector} from "../store/messages.selectors";
import {fetchMessage} from "../store/messages.actions";

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

  constructor(private store: Store<fromAppStore.AppState>, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.componentSubs.push(this.store.select(messageSelector).subscribe(message => {
      this.message = message;
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
