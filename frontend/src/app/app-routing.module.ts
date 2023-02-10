import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { RedirectGuard } from './guards/redirect.guard';
import { RegisterComponent } from './register-and-login/register/register.component';
import { LoginComponent } from './register-and-login/login/login.component';
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, RedirectGuard],
})
export class AppRoutingModule { }
