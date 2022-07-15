import {Component, Inject} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {LoginService} from "./service/login.service";
import {CommonsService} from "./service/commons.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CscTracker';

  sidebarExpanded = true;

  public login: boolean = false;

  private urlLogin = 'https://accounts.google.com/o/oauth2/auth?approval_prompt=force&scope=email&client_id=92132449986-f85cvq6rmtl8u7g24on48g562p98db8p.apps.googleusercontent.com&redirect_uri=https://csctracker.com&response_type=code&access_type=offline';

  constructor(@Inject(DOCUMENT) private document: Document,
              public activatedRoute: ActivatedRoute,
              public loginService: LoginService,
              public commonsService: CommonsService) {
    commonsService.init();
    this.activatedRoute.queryParams.subscribe(params => {
      let code = params['code'];
      let token = params['token'];
      if (token !== undefined) {
        localStorage.setItem('token', token);
      }
      console.log(code);
      if (code !== undefined) {
        this.loginService.get(code).subscribe(data => {
          console.log(data);
          console.log(data.token);
          localStorage.setItem('token', data.token.accessToken);
          let token = localStorage.getItem('token');
          this.login = (token === undefined || token === null);
          this.document.location.href ='/'
        })
      }
    });
    let token = localStorage.getItem('token');
    this.login = (token === undefined || token === null);
  }

  public doLogin() {
    this.login = false;
    this.document.location.href = this.urlLogin;
  }
}
