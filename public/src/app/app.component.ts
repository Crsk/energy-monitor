import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { DataService } from './services/data.service';
import { Data } from './models/data';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'energy-monitor';
  socket;
  chart = [];
  data: Data[] = [];
  values: number[] = [];
  dates: string[] = [];
  lastValue: number = 0;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {

    this.socket = io();
    this.socket.on('data', data => {
      this.data.push(data);
    });
    this.socket.on('data:value', value => {
      this.values.push(value);
      this.lastValue = value;
    });
    this.socket.on('data:date', date => {
      let jsdate = new Date(date);
      this.dates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric' }));
    });

    this.dataService.getData().subscribe(() => {
      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: this.dates,
          datasets: [
            {
              data: this.values,
              borderColor: '#3cba9f',
              fill: false
            }
          ]
        },
        options: {
          legends: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [
              {
                display: true
              }
            ]
          }
        }
      });
    });
  }

  getData() {
    this.dataService.getData().subscribe(data => {
      this.data = data;
    });
  }
}
