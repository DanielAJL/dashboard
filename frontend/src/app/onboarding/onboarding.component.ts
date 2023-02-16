import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { UserDTO } from '../DTOs/UserDTO';
import { UserProfileInformationDTO } from '../DTOs/UserProfileInformationDTO';
import { SharedDataService } from '../services/shared-data.service';
import { UsersService } from '../services/users.service';
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
  });

  constructor(private sharedDataService: SharedDataService, private formBuilder: FormBuilder, private usersService: UsersService) {
    this.sharedDataService.getUserObs().subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
  }

  ngOnInit(): void {
    // console.log(this.user);
  }

  public async submitOnboarding(): Promise<void> {
    if (this.formHasValidationErrors(this.firstFormGroup) || this.formHasValidationErrors(this.secondFormGroup)) return;
    let profile = new UserProfileInformationDTO();
    const firstNameControl = this.firstFormGroup.get('firstName');
    const expertiseAreaControl = this.secondFormGroup.get('expertiseAreas');
    if (firstNameControl) {
      const firstName = firstNameControl.value;
      profile.name = firstName;
    }
    if (expertiseAreaControl) {
      const expertiseArea = expertiseAreaControl.value;
      profile.expertiseArea = expertiseArea;
    }

    this.user.profile = profile;
    this.user.onboarded = true;

    this.usersService.updateUser(this.user._id!, this.user);
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
