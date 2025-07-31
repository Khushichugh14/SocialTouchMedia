import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-deactivation-logout',
  templateUrl: './deactivation-logout.component.html',
  styleUrls: ['./deactivation-logout.component.css']
})
export class DeactivationLogoutComponent implements OnInit{
  constructor(private router:Router, private userService : UserService,private cookieService:CookieService){}
  user_id!:number;
  ngOnInit(): void {
    this.user_id = parseInt(this.cookieService.get('user_id'));
      console.log(this.user_id)
  }
  // this.user_id = parseInt(this.cookieService.get('user_id'));
  logout() {
    this.userService.logout(this.user_id).subscribe({
      next: (response) => {
        console.log('Logout successful', response);
        this.cookieService.delete('user_id');
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Logout failed', error);
      }
    });
  }

  deactivateAccount(): void {
    this.userService.deactivateUser(this.user_id).subscribe({
      next: (response) => {
        console.log('Account deactivated successfully', response);
        alert('Your account has been deactivated.');
        this.cookieService.delete('user_id');
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Account deactivation failed', error);
        alert('Account deactivation failed. Please try again.');
      }
    });
  }
}

