import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { APP_CONSTANTS } from 'src/app/shared/constants/app.constants';
import { UserService } from 'src/app/user/user.service';
import { User } from '../interfaces/user.interface';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.css']
})
export class SideComponent implements OnInit{
;
  API_URL = APP_CONSTANTS;
  UserDetails !: User
  user_id: number = parseInt(this.cookieService.get('user_id'));
  // currentUserId: number=parseInt(this.cookieService.get("user_id"));
  constructor(private router : Router, private cookieService : CookieService,private userService : UserService) { }
  toggleFriends(){
    this.router.navigate(['/friends'])
  }
  toggleHome(){
    this.router.navigate(['/feed'])
  }
  ngOnInit(): void {
    this.getUser(this.user_id);
  }
  getUser(user_id: number){
    this.userService.getUser(user_id).subscribe({
      next: (data : User) => {
        this.UserDetails = data
        if(this.UserDetails.image_url === null){
          this.UserDetails.image_url = "dummy.png"
        }
        console.log(this.UserDetails)
        console.log(data)
      },
      error: (error) => {
        console.error(error);
      }
    })
  }
  navigateProfile(): void {
    // Navigate to the profile route with the user ID parameter
    this.router.navigate(['view-profile', this.user_id]);
  }
}
