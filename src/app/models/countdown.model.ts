export class CountdownModel {
  private timeLimit: number;
  private timePassed: number;
  private timeLeft: number;
  private timerIntervalId: number | undefined;

  private _timeLeftStr: string = '';


  constructor(timeLimit: number) {
    this.timeLimit = timeLimit;
    this.timePassed = 0;
    this.timeLeft = timeLimit;
  }

  private formatTime(): string {
    // The largest round integer less than or equal to the result of time divided being by 60.
    const minutes = Math.floor(this.timeLeft / 60);

    // Seconds are the remainder of the time divided by 60 (modulus operator)
    let seconds = this.timeLeft % 60;
    let secondsStr = seconds.toString();
    // If the value of seconds is less than 10, then display seconds with a leading zero
    if (seconds < 10) {
      secondsStr = `0${seconds}`;
    }

    // The output in MM:SS format
    return `${minutes}:${secondsStr}`;
  }

  startTimer() {
    this.timerIntervalId = setInterval(() => {
      // The amount of time passed increments by one
      this.timePassed++;
      this.timeLeft--;
      // The time left label is updated
      this._timeLeftStr = this.formatTime();
      if (this.timeLeft === 0) {
        clearInterval(this.timerIntervalId);
      }
    }, 1000);
  }

  stopTimer() {
    if (this.timerIntervalId){
      clearInterval(this.timerIntervalId);
    }
  }

  get timeLeftStr(): string {
    return this._timeLeftStr;
  }
}
