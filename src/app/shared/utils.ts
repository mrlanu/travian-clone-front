export class Utils {
  static formatTime(timeSeconds: number): string {
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
}
