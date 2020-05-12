import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subasta-detalle',
  templateUrl: './subasta-detalle.component.html',
  styleUrls: ['./subasta-detalle.component.css']
})
export class SubastaDetalleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    //this.startTimer();
  }

  timeLeft: number = 60;
  interval;

  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 60;
      }
    },1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }




}
