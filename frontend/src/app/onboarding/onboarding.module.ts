import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';

import { MatStepperModule } from '@angular/material/stepper';
import { OnboardingComponent } from './onboarding.component';

@NgModule({
  declarations: [OnboardingComponent],
  imports: [SharedModule, HttpClientModule, MatStepperModule],
})
export class OnboardingModule { }
