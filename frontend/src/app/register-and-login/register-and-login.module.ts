import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RegisterAndLoginRouter } from './register-and-login-router.module';
import { LoginComponent } from './login/login.component';
// import { RegisterComponent } from './register/register.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [RegisterAndLoginRouter, SharedModule, HttpClientModule],
})
export class RegisterAndLoginModule { }
