import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { UserDTO } from '../DTOs/UserDTO';
import { SharedDataService } from '../services/shared-data.service';
// import { AuthService } from 'src/app/services/auth.service';
// import { Router, ParamMap } from '@angular/router';

@Component({
  selector: 'onboarding',
  templateUrl: './onboarding.component.html',
})
export class OnboardingComponent implements OnInit {
  user!: UserDTO;
  expertiseAreas: string[] = ['Frontend', 'Backend', 'Fullstack'];

  firstFormGroup = this.formBuilder.group({
    firstName: ['', Validators.required],
  });
  secondFormGroup = this.formBuilder.group({
    areaExpertise: ['', Validators.required], // FrontEnd, BackEnd, Full Stack
    // githubProfile: [''],
  });

  constructor(private sharedDataService: SharedDataService, private formBuilder: FormBuilder) {
    this.sharedDataService.getUserObs().subscribe((user: UserDTO) => {
      if (user) {
        this.user = user;
      }
    });
  }

  ngOnInit(): void {
    console.log(this.user);
  }

  formHasValidationErrors(formGroup: FormGroup): boolean {
    let errorCount: number = 0;
    Object.keys(formGroup.controls).forEach((key) => {
      const controlErrors: ValidationErrors | null | undefined =
        formGroup.get(key)?.errors;
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
