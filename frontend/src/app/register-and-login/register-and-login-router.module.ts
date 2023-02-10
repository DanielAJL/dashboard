import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
// import { RegisterComponent } from './register/register.component';
// import { RedirectGuard } from './../guards/redirect.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: '*', component: LoginComponent },
  { path: '**', redirectTo: 'login' },
  {
    path: 'login',
    component: LoginComponent,
  },
  // {
  //   path: 'register',
  //   component: RegisterComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule.forChild(routes)],
  exports: [RouterModule],

})
export class RegisterAndLoginRouter { }
