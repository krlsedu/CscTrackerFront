import {Component, OnDestroy, OnInit} from '@angular/core';
import {disconnect, init} from '../../../assets';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})

export class NotificationComponent implements OnInit, OnDestroy {

  token = localStorage.getItem('token');
  constructor() {
    console.log(this.token);

  }

  ngOnInit(): void {
    init();
  }

  ngOnDestroy(): void {
    disconnect();
  }


}
