import {Component, OnDestroy, OnInit} from '@angular/core';
import {Client} from '@stomp/stompjs';
import {NotificationSync} from "../../shared/notificationSync";
import {Observable} from "rxjs";
import {catchError, retry} from "rxjs/operators";
import {CommonsService} from "../../service/commons.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})

export class NotificationComponent implements OnInit, OnDestroy {

  notifications: Array<NotificationSync> = [];

  constructor(public commonsService: CommonsService) {
    commonsService.init();
  }


  ngOnInit(): void {

    let client = new Client();

    client.configure({
      brokerURL: 'wss://notify.csctracker.com/stock-ticks/websocket',
      onConnect: () => {
        client.subscribe('/topic/krlsedu@gmail.com', message => {
          this.msgRecived(message.body);
        });
      },
      onDisconnect: () => {
        console.log('onDisconnect');
      },
      debug: (str) => {
        // console.log(new Date(), str);
      }
    });
    client.activate();

    if (Notification.permission !== 'granted')
      Notification.requestPermission();
  }

  msgRecived(msg: string) {
    let obj: NotificationSync = JSON.parse(msg);
    this.getNotification(obj.id).subscribe((data) => {
      console.log(data);
      let notification = new NotificationSync();
      notification.text = data.app + " - " + data.from + ": " + data.text + " (" + data.time + ")";
      if (this.isFavoriteContact(data)) {
        notification.type = 'contact';
      } else if (this.isFavoriteApp(data)) {
        notification.type = 'app';
      } else {
        notification.type = 'default';
      }
      this.notifications.unshift(notification);
      if (this.isNotify(data)) {
        let notify = new Notification('Notification incoming from ' + data.app, {
          icon: 'images/csctracker-desktop-plugin.png',
          body: data.from + ": " + data.text + " (" + data.time + ")",
        });
        notify.onclick = function () {
          window.focus();
          this.close();
        };
      }
    });
  }

  isFavoriteContact(messageOutput) {
    let text = this.commonsService.config.favoriteContact;
    return ((!this.isEmpty(text) && messageOutput.from.includes(text)) || text === '*')
  }

  isFavoriteApp(messageOutput) {
    let text = this.commonsService.config.applicationNotify;
    return ((!this.isEmpty(text) && messageOutput.app === text) || text === '*')
  }

  saveConfigs() {
    this.commonsService.saveConfig(this.commonsService.config).subscribe((data) => {
      console.log(data);
    });
  }

  isEmpty(str) {
    return (!str || 0 === str.length);
  }

  ngOnDestroy(): void {
  }

  getNotification(id: String): Observable<NotificationSync> {
    return this.commonsService.http
      .get<NotificationSync>(this.commonsService.baseurl + '/message/' + id, this.commonsService.httpOptions)
      .pipe(retry(1), catchError(this.commonsService.errorHandl));
  }

  isNotify(messageOutput) {
    return this.isFavoriteContact(messageOutput) || this.isFavoriteApp(messageOutput);
  }
}
