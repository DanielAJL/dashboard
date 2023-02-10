import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { UserDTO } from '../../DTOs/UserDTO';
import { SharedDataService } from '../../services/shared-data.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ParamMap } from '@angular/router';
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  // styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  user!: UserDTO;
  dummyUser?: UserDTO;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private sharedDataService: SharedDataService
  ) {
    this.loginForm = this.formBuilder.group({
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(40),
        ],
      ],
      email: [
        null,
        [
          Validators.required,
          Validators.email
        ],
      ],
    });

    this.sharedDataService.getUserObs().subscribe((user: UserDTO) => {
      console.log('test');

      if (user) {
        this.user = user;
      }
    });
  }

  ngOnInit(): void {
    console.log(this.user);

    // this.checkUserActiveSession();
    this.dummyUser = {
      email: "tester123@test.com",
      password: "tester123"
    }
  }

  generateWorkingDummyUserFormData() {
    this.loginForm.controls['email'].setValue(this.dummyUser?.email);
    this.loginForm.controls['password'].setValue(this.dummyUser?.password);
  }

  generateInvalidDummyUserFormData() {
    this.loginForm.controls['email'].setValue(this.dummyUser?.email + '1');
    this.loginForm.controls['password'].setValue(this.dummyUser?.password + '1');
  }

  async login() {
    if (this.formHasValidationErrors()) return;
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    const user: UserDTO = {
      password: password,
      email: email,
    };

    this.user = await this.authService.login(user);
  }

  async logout() {
    await this.authService.logout(this.user);
  }

  logger() {
    console.log(this.user);

  }

  // async checkUserActiveSession(): Promise<UserDTO> {
  //   const user = await this.authService.getCurrentSession();
  //   return this.user = user;
  // }

  formHasValidationErrors(): boolean {
    let errorCount: number = 0;
    Object.keys(this.loginForm.controls).forEach((key) => {
      const controlErrors: ValidationErrors | null | undefined =
        this.loginForm.get(key)?.errors;
      if (controlErrors != null) {
        // Form group has errors
        Object.keys(controlErrors).forEach((keyError) => {
          errorCount += 1;
          // console.log(
          //   'Key control: ' + key + ', keyError: ' + keyError + ', err value: ',
          //   controlErrors[keyError]
          // );
          return true;
        });
      }
    });
    // Form is valid
    return false;
  }

}
