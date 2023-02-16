import { Injectable } from '@angular/core';
import { UserDTO } from '../DTOs/UserDTO';
import { CredentialsUserDTO } from '../DTOs/credentialsUserDTO';
import { ApiService } from './api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute) { }

  async login(user: CredentialsUserDTO): Promise<UserDTO> {
    const response = await this.apiService.post('login', user);
    if (user.onboarded === true) {
      this.router.navigate(['dashboard']);
    } else {
      this.router.navigate(['onboarding']);
    }
    return response.data as UserDTO;
  }

  async logout(user: UserDTO): Promise<UserDTO> {
    const response = await this.apiService.post('logout', user);
    if (response.data) {
      this.router.navigate(['login']);
    }
    return response.data as UserDTO;
  }

  // Returns the false when no session active or the user returned from api
  async getCurrentSession(): Promise<boolean | UserDTO> {
    const response = await this.apiService.get('session');
    if (response.data) {
      // console.log(response.data);
      return response.data as UserDTO;

    } else {
      return response.data as boolean;
    }
  }
}
