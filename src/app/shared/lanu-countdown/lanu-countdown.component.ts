import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-lanu-countdown',
  templateUrl: './lanu-countdown.component.html',
  styleUrls: ['./lanu-countdown.component.css']
})
export class LanuCountdownComponent implements OnInit, OnDestroy {

  @Input() config: {
    'timeLeft': number;
  } = {'timeLeft': 0};

  @Output() countDone: EventEmitter<any> = new EventEmitter();

  private timePassed: number = 0;
  timeLeftStr: string = '';
  private timerIntervalId: number | undefined;

  constructor() { }

  private static formatTime(timeSeconds: number): string {
    // The largest round integer less than or equal to the result of time divided being by 60.
    const hours = Math.floor(timeSeconds / 3600);
    const minutes = Math.floor(timeSeconds % 3600 / 60);

    // Seconds are the remainder of the time divided by 60 (modulus operator)
    let seconds = timeSeconds % 60;
    let hoursString = hours.toString();
    let minutesStr = minutes.toString();
    let secondsStr = seconds.toString();
    // If the value of seconds is less than 10, then display seconds with a leading zero
    if (hours < 10) {
      hoursString = `0${hours}`
    }
    if (minutes < 10) {
      minutesStr = `0${minutes}`;
    }
    if (seconds < 10) {
      secondsStr = `0${seconds}`;
    }

    // The output in MM:SS format
    return `${hoursString}:${minutesStr}:${secondsStr}`;
  }

  ngOnInit(): void {
    this.startInterval();
  }

  reset(time: number){
    clearInterval(this.timerIntervalId);
    this.timePassed = 0;
    this.config = {
      'timeLeft': time
    }
    this.startInterval();
  }

  startInterval(){
    this.timerIntervalId = setInterval(() => {
      // The amount of time passed increments by one
      this.timePassed++;
      this.config.timeLeft--;
      // The time left label is updated
      if (this.config.timeLeft === 0) {
        clearInterval(this.timerIntervalId);
        setTimeout(() => {
          this.countDone.next(null);
        }, 1000);
      }
      this.timeLeftStr = LanuCountdownComponent.formatTime(this.config.timeLeft);
    }, 1000);
  }

  ngOnDestroy() {
    if (this.timerIntervalId){
      clearInterval(this.timerIntervalId);
    }
  }

}
