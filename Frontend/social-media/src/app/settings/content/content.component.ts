import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APP_CONSTANTS } from 'src/app/shared/constants/app.constants';
import { User } from 'src/app/shared/interfaces/user.interface';
import { UserService } from 'src/app/user/user.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {
  API_URL = APP_CONSTANTS
  user_id!:number;
  UserDetails !: User
  constructor(private userService : UserService, private route : ActivatedRoute,private router : Router,private cookieService:CookieService){}
  
  ngOnInit(): void {
    this.user_id = parseInt(this.cookieService.get('user_id'));
      this.getSave(this.user_id);
      console.log(this.user_id)
  }

  getSave(user_id: number){
    this.userService.getSave(user_id).subscribe({
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
  // Method to check if media URL is an image
  isImage(mediaUrl: string): boolean {
    return mediaUrl.toLowerCase().endsWith('.jpg') || mediaUrl.toLowerCase().endsWith('.jpeg') || mediaUrl.toLowerCase().endsWith('.png') || mediaUrl.toLowerCase().endsWith('.gif');
  }
  seePost(post_id: number) {
    this.router.navigate(['/view-post', post_id]);
  }
}
