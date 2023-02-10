import { Component, OnInit } from '@angular/core';
// import { CreateUserDTO } from './DTOs/CreateUserDTO';
import { UserDTO } from './DTOs/UserDTO';
import { AuthService } from './services/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { SharedDataService } from './services/shared-data.service';
const { version: appVersion } = require('../../package.json')
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  appVersion: string;
  title = 'frontend';
  user!: UserDTO;
  isLoggedIn!: boolean;

  constructor(private authService: AuthService, private router: Router, private sharedDataService: SharedDataService) {
    this.appVersion = appVersion;
  }

  async ngOnInit() {
    this.sharedDataService.getUserObs().subscribe(user => {
      this.user = user;
      console.log(user);

      if (this.user)
        this.isLoggedIn = true;
    });
    // this.logout();
  }

  async logout() {
    await this.authService.logout(this.user).then(user => {
      if (user) {
        // logout success
        this.isLoggedIn = false;
      }
    });
  }

}
