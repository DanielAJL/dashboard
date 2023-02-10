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

  async login(user: CredentialsUserDTO): Promise<CredentialsUserDTO> {
    const response = await this.apiService.post('login', user);
    this.router.navigate(['onboarding'])
    return response.data as CredentialsUserDTO;
  }

  async logout(user: UserDTO): Promise<UserDTO> {
    const response = await this.apiService.post('logout', user);
    if (response.data) {
      this.router.navigate(['login']);
    }
    return response.data as UserDTO;
  }

  async getCurrentSession(): Promise<boolean> {
    const response = await this.apiService.get('session');
    if (response.data) {
      // console.log(response.data);
    } else {
    }
    return response.data as boolean;
  }
}
