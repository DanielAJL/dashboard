import { Component, OnInit } from '@angular/core';
import { UserDTO } from 'src/app/DTOs/UserDTO';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
  ) {
    this.registerForm = this.formBuilder.group({
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
          Validators.minLength(5),
          Validators.maxLength(50),
        ],
      ],
    });
  }

  ngOnInit(): void {
  }

  register() {
    if (this.formHasValidationErrors()) return;
    const email = this.registerForm.get('email')?.value;
    const password = this.registerForm.get('password')?.value;

    const user: UserDTO = {
      password: password,
      email: email,
    };

    // Send User and Admin Log to API with service
    this.usersService.createUser(user);
  }

  formHasValidationErrors(): boolean {
    let errorCount: number = 0;
    Object.keys(this.registerForm.controls).forEach((key) => {
      const controlErrors: ValidationErrors | null | undefined =
        this.registerForm.get(key)?.errors;
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
