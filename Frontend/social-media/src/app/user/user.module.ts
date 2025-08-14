import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterUserComponent } from './register-user/register-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { LoginUserComponent } from './login-user/login-user.component';
import { HomeComponent } from './home/home.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AppRoutingModule } from '../app-routing.module';
import { PostComponent } from './post/post.component';
import { SocialMediaModule } from '../social-media/social-media.module';
import { RouterLink } from '@angular/router';




@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    SocialMediaModule,
    AppRoutingModule,
    RegisterUserComponent,
    LoginUserComponent,
    HomeComponent,
    ForgotPasswordComponent,
    PostComponent
  ],
  exports: [
    RegisterUserComponent,
    LoginUserComponent,
    HomeComponent,
    ForgotPasswordComponent,
    PostComponent
  ]
})
export class UserModule { }
