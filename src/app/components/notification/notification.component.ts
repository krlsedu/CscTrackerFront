import {Component, OnDestroy, OnInit} from '@angular/core';
import {Client} from '@stomp/stompjs';
import {NotificationSync} from "../../shared/notificationSync";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})

export class NotificationComponent implements OnInit, OnDestroy {

  token = localStorage.getItem('token');
  notifications: Array<NotificationSync> = [];
  baseurl = 'https://notify.csctracker.com';
  config: any = {
    'favoriteContact': 'Suelen Boff',
    'favoriteApp': 'Calendar',
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    }),
  };

  constructor(private http: HttpClient) {
    console.log(this.token);
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
    });
  }

  isFavoriteContact(messageOutput) {
    let text = this.config.favoriteContact;
    return ((!this.isEmpty(text) && messageOutput.from.includes(text)) || text === '*')
  }

  isFavoriteApp(messageOutput) {
    let text = this.config.favoriteApp;
    return ((!this.isEmpty(text) && messageOutput.app === text) || text === '*')
  }

  isEmpty(str) {
    return (!str || 0 === str.length);
  }

  ngOnDestroy(): void {
  }

  getNotification(id: String): Observable<NotificationSync> {
    return this.http
      .get<NotificationSync>(this.baseurl + '/message/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  errorHandl(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    if (error.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/'
    }

    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }

}
