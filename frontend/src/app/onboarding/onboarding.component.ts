import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { UserDTO } from '../DTOs/UserDTO';
import { UserProfileInformationDTO } from '../DTOs/UserProfileInformationDTO';
import { SharedDataService } from '../services/shared-data.service';
import { UsersService } from '../services/users.service';
import { PROGRAMMING_LANGUAGES } from '../../constants/programmingLanguages';

@Component({
  selector: 'onboarding',
  templateUrl: './onboarding.component.html',
})
export class OnboardingComponent implements OnInit {
  user!: UserDTO;
  expertiseAreas: string[] = ['Frontend', 'Backend', 'Fullstack'];
  programmingLanguages: Array<{ name: string, checked: boolean }> = [];
  yearOptions: Array<string> = ['0 - 6 months', '6 months - 12 months', '1 year - 2 years', '2 years - 4 years', '4 years - 6 years', '6 years - 10 years', '10+ years']

  firstFormGroup = this.formBuilder.group({
    firstName: ['', Validators.required],
    githubUsername: [''],
  });
  secondFormGroup = this.formBuilder.group({
    areaExpertise: ['', Validators.required], // FrontEnd, BackEnd, Full Stack
    experienceYears: ['', Validators.required], // FrontEnd, BackEnd, Full Stack

  });

  constructor(private sharedDataService: SharedDataService, private formBuilder: FormBuilder, private usersService: UsersService, private router: Router) {
    this.sharedDataService.getUserObs().subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
    for (let i = 0; i < PROGRAMMING_LANGUAGES.length; i++) {
      const language = { name: PROGRAMMING_LANGUAGES[i], checked: false };
      this.programmingLanguages.push(language);
    }
  }

  ngOnInit(): void {
  }

  public async submitOnboarding(): Promise<void> {
    if (this.formHasValidationErrors(this.firstFormGroup) || this.formHasValidationErrors(this.secondFormGroup)) return;

    let profile = new UserProfileInformationDTO();

    // Assign controls from forms to check for values.
    const firstNameControl = this.firstFormGroup.get('firstName');
    const githubUsernameControl = this.firstFormGroup.get('githubUsername');
    const expertiseAreaControl = this.secondFormGroup.get('areaExpertise');
    const experienceYearsControl = this.secondFormGroup.get('experienceYears');

    if (firstNameControl) {
      const firstName = firstNameControl.value;
      profile.name = firstName;
    }
    if (expertiseAreaControl) {
      const expertiseArea = expertiseAreaControl.value;
      profile.expertiseArea = expertiseArea;
    }

    if (githubUsernameControl) {
      const githubUsername = githubUsernameControl.value;
      profile.githubUsername = githubUsername;
    }

    if (experienceYearsControl) {
      const experienceYears = experienceYearsControl.value;
      profile.experienceYears = experienceYears;
    }

    const languages: string[] = [];
    this.programmingLanguages.filter(language => {
      if (language.checked === true) {
        languages.push(language.name);
      }
      return language.checked;
    });

    profile.languages = languages;
    this.user.profile = profile;
    this.user.onboarded = true;

    this.usersService.updateUser(this.user._id!, this.user).then(user => {
      if (user) {
        this.user = user;
        this.router.navigate(['/dashboard']);
      }
    });
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
