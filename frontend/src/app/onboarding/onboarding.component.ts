import { Component, OnInit } from '@angular/core';
// import {
//   FormBuilder,
//   FormGroup,
//   ValidationErrors,
//   Validators,
// } from '@angular/forms';
import { UserDTO } from '../DTOs/UserDTO';
import { SharedDataService } from '../services/shared-data.service';
// import { AuthService } from 'src/app/services/auth.service';
// import { Router, ParamMap } from '@angular/router';

@Component({
  selector: 'onboarding',
  templateUrl: './onboarding.component.html',
  // styleUrls: ['./onboarding.component.scss']
})
export class OnboardingComponent implements OnInit {
  user!: UserDTO;

  constructor(private sharedDataService: SharedDataService) {
    this.sharedDataService.getUserObs().subscribe((user: UserDTO) => {
      console.log('test');

      if (user) {
        this.user = user;
      }
    });
  }

  ngOnInit(): void {
    console.log(this.user);
  }

  // formHasValidationErrors(): boolean {
  //   let errorCount: number = 0;
  //   Object.keys(this.loginForm.controls).forEach((key) => {
  //     const controlErrors: ValidationErrors | null | undefined =
  //       this.loginForm.get(key)?.errors;
  //     if (controlErrors != null) {
  //       // Form group has errors
  //       Object.keys(controlErrors).forEach((keyError) => {
  //         errorCount += 1;
  //         // console.log(
  //         //   'Key control: ' + key + ', keyError: ' + keyError + ', err value: ',
  //         //   controlErrors[keyError]
  //         // );
  //         return true;
  //       });
  //     }
  //   });
  //   // Form is valid
  //   return false;
  // }

}
