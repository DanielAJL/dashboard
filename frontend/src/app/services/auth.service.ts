import { Injectable } from '@angular/core';
import { UserDTO } from '../DTOs/UserDTO';
import { ApiService } from './api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute) { }

  async login(user: UserDTO): Promise<UserDTO> {
    const response = await this.apiService.post('login', user);
    this.router.navigate(['dashboard'])
    return response.data as UserDTO;
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

      // this.router.navigate(['dashboard']);
    } else {
      // this.router.navigate(['login']);
    }
    return response.data as boolean;
  }

  // async createUser() {
  //   const response = await this.apiService.post(`${this.API_PATH}`, user);
  //   return response.data as UserDTO;
  // }

  // async deleteUser(userId: string) {
  //   const response = await this.apiService.delete(`${this.API_PATH}/${userId}`);
  //   return response.data as UserDTO;
  // }

  // async updateUser(userId: string, user: UserDTO) {
  //   const response = await this.apiService.patch(`${this.API_PATH}/${userId}`, user);
  //   return response.data as UserDTO;
  // }

}
