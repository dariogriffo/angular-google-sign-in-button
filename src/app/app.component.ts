import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { googleSignInResponse } from './models/google.signin.response';
import { googleCredentials } from './models/google.credentials';

declare let google: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-google-sign-in-button';


  ngAfterViewInit(): void {
    const thisClass = this;
    google.accounts.id.initialize({
      client_id: "CHANGE_ME!",
      callback: (response: googleSignInResponse) => { thisClass.handleCredentialResponse(response) }
    });
    google.accounts.id.renderButton(
      document.getElementById("google-sign-in"),
      { theme: "outline", size: "large" }
    );
    google.accounts.id.prompt();
  }

  public handleCredentialResponse(response: googleSignInResponse) {
    console.log(this.decodeJwtResponse(response.credential));
  }


  public decodeJwtResponse(token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload) as googleCredentials;
  };

}
