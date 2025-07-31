import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent {
  loginForm!:FormGroup
  constructor(private userService : UserService , private router: Router , private cookieService: CookieService){}

  ngOnInit():void{
    this.LoginForm()
  }
  LoginForm():void{
    this.loginForm = new FormGroup({
      user_name: new FormControl(),
      password: new FormControl(),
    })
  }
  submit(): void {
    console.log(this.loginForm.value);
    this.userService.login(this.loginForm.value).subscribe((value) => {
      console.log("Logined!!");
      console.log(value);
      if (value.validYN == 1) {
        this.cookieService.set("token", value.token);
        this.cookieService.set("user_name", value.user_name);
        this.cookieService.set("user_id", value.user_id);

        if (value.was_deactivated) {
          alert('Account reactivated successfully!');
        }

        this.router.navigate(['/feed']);
      } else {
        this.router.navigate(['/register']);
      }
    });
  }
}
