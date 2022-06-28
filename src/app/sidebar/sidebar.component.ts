import {Component, EventEmitter, Inject, Input, Output} from "@angular/core";
import {faDashboard, faFlaskVial, faHome, faKey} from "@fortawesome/free-solid-svg-icons";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: "my-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent {
  @Input() isExpanded: boolean = false;
  @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();

  private urlLogin = 'https://accounts.google.com/o/oauth2/auth?approval_prompt=force&scope=email&client_id=92132449986-f85cvq6rmtl8u7g24on48g562p98db8p.apps.googleusercontent.com&redirect_uri=https://csctracker.com&response_type=code&access_type=offline';

  public login: boolean = false;
  faHome = faHome;
  faDashboard = faDashboard;
  faTest = faFlaskVial;
  faLogin = faKey
  handleSidebarToggle = () => this.toggleSidebar.emit(!this.isExpanded);
  constructor(@Inject(DOCUMENT) private document: Document,) {
    let token = localStorage.getItem('token');

    this.login = (token === undefined || token === null);
  }

  public doLogin() {
    this.login = false;
    this.document.location.href = this.urlLogin;
  }
}
