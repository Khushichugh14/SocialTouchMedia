import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces/user.interface';
import { APP_CONSTANTS } from 'src/app/shared/constants/app.constants';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  API_URL = APP_CONSTANTS;
  userId!: number;
  // currentUserId!: number;
  UserDetails!: User;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = +params['user_id'];
      // this.currentUserId = parseInt(this.cookieService.get('user_id'));
      console.log(this.userId);
      this.getUser(this.userId);
    });
  }

  getUser(user_id: number) {
    this.userService.getUser(user_id).subscribe({
      next: (data: User) => {
        this.UserDetails = data;
        if (this.UserDetails.image_url === null) {
          this.UserDetails.image_url = 'dummy.png';
        }
        console.log(this.UserDetails);
        console.log(data);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  isImage(mediaUrl: string): boolean {
    return mediaUrl.toLowerCase().endsWith('.jpg') || mediaUrl.toLowerCase().endsWith('.jpeg') || mediaUrl.toLowerCase().endsWith('.png') || mediaUrl.toLowerCase().endsWith('.gif');
  }

  seePost(post_id: number) {
    this.router.navigate(['/view-post', post_id]);
  }

  isPrivateAccount(): boolean {
    return this.UserDetails && this.UserDetails.account_status === 0; // Assuming 0 indicates a private account
  }

  
}
