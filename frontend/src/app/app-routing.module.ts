import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { RedirectGuard } from './guards/redirect.guard';

import { LoginComponent } from './register-and-login/login/login.component';
import { RegisterComponent } from './register-and-login/register/register.component';
import { OnboardingComponent } from './onboarding/onboarding.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: '*',
    component: LoginComponent,
  },
  { path: 'login', component: LoginComponent, canActivate: [RedirectGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [RedirectGuard] },
  { path: 'onboarding', component: OnboardingComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, RedirectGuard],
})
export class AppRoutingModule { }
