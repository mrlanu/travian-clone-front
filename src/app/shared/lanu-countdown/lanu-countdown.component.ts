import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-lanu-countdown',
  templateUrl: './lanu-countdown.component.html',
  styleUrls: ['./lanu-countdown.component.css']
})
export class LanuCountdownComponent implements OnInit {

  @Input() config: {
    'timeLeft': number;
  } = {'timeLeft': 0};

  @Output() countDone: EventEmitter<any> = new EventEmitter();

  private timePassed: number = 0;
  timeLeftStr: string = '';
  private timerIntervalId: number | undefined;

  constructor() { }

  private formatTime(): string {
    // The largest round integer less than or equal to the result of time divided being by 60.
    const minutes = Math.floor(this.config.timeLeft / 60);

    // Seconds are the remainder of the time divided by 60 (modulus operator)
    let seconds = this.config.timeLeft % 60;
    let secondsStr = seconds.toString();
    // If the value of seconds is less than 10, then display seconds with a leading zero
    if (seconds < 10) {
      secondsStr = `0${seconds}`;
    }

    // The output in MM:SS format
    return `${minutes}:${secondsStr}`;
  }

  stopTimer() {
    if (this.timerIntervalId){
      clearInterval(this.timerIntervalId);
    }
  }

  ngOnInit(): void {
    this.timerIntervalId = setInterval(() => {
      // The amount of time passed increments by one
      this.timePassed++;
      this.config.timeLeft--;
      // The time left label is updated
      this.timeLeftStr = this.formatTime();
      if (this.config.timeLeft === -1) {
        clearInterval(this.timerIntervalId);
        this.countDone.next(null);
      }
    }, 1000);
  }

}
