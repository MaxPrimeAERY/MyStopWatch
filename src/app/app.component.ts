import {Component, OnInit} from '@angular/core';
import {timer} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  time = 0;
  HMSTime: string;
  measuredTime: Date = new Date(null);
  running: boolean = false;
  buttonStartStop = 'Start';
  subscription;

  touchtime = 0;

  ngOnInit() {
    this.measuredTime.setSeconds(this.time);
    this.HMSTime = this.measuredTime.toISOString().substr(11, 8);
  }

  startTimer() {
    this.running = true;
    this.buttonStartStop = 'Stop';
    this.time = -1; //fix for start from 1
    this.subscription = timer(0, 1000).subscribe(ec => {
      this.time++;
      this.measuredTime = new Date(null);
      this.measuredTime.setSeconds(this.time); // specify value of SECONDS
      this.HMSTime = this.measuredTime.toISOString().substr(11, 8);
    });
  }

  stopTimer() {
    this.subscription.unsubscribe();
    this.running = false;
    this.buttonStartStop = 'Start';
    this.time = 0;
    this.measuredTime.setSeconds(this.time); // specify value of SECONDS
    this.HMSTime = this.measuredTime.toISOString().substr(11, 8);

  }

  waitTimer() {
    this.running = false;
    this.buttonStartStop = 'Start';
    this.subscription.unsubscribe();
    this.measuredTime.setSeconds(this.time); // specify value of SECONDS
    this.HMSTime = this.measuredTime.toISOString().substr(11, 8);
  }

  resetTimer() {
    //console.log("Before = "+this.time);
    this.stopTimer();
    //console.log("After 1 = "+this.time);
    this.startTimer();
    //console.log("After 2 = "+this.time);
  }

  singleWaitClick(){
    if (this.touchtime === 0) {
      this.touchtime = new Date().getTime();
    } else {
      if (new Date().getTime() - this.touchtime < 300) { //time between two clicks to be considered as double click
        this.waitTimer();
        this.touchtime = 0;
      } else {
        this.touchtime = new Date().getTime();
      }
    }
  }

}
