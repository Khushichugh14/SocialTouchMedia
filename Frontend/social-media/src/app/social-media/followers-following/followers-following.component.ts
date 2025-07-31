import { Component, OnInit } from '@angular/core';
import { SocialMediaService } from '../social-media.service';
import { followers } from 'src/app/shared/interfaces/followers-following.interface';
import { CookieService } from 'ngx-cookie-service';
import { APP_CONSTANTS } from 'src/app/shared/constants/app.constants';

@Component({
  selector: 'app-followers-following',
  templateUrl: './followers-following.component.html',
  styleUrls: ['./followers-following.component.css'],
})
export class FollowersFollowingComponent implements OnInit {
  followers!: any[];
  API_URL = APP_CONSTANTS
  constructor(private socialMediaService: SocialMediaService,private cookieService : CookieService) {}
  ngOnInit(): void {
    this.showFollowers();
  }

  showFollowers() {
    this.socialMediaService.fetchFollowers(+this.cookieService.get('user_id')).subscribe({
      next: (data: followers[]) => {
        this.followers = data;
        this.followers = data.map(follower => ({
          ...follower,
          image_url: follower.image_url || "dummy.png"
        }));
        // console.log('data', data);
        // console.log('followers', this.followers);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  remove(follower_id: any) {
    console.log(follower_id);
    this.socialMediaService.removeFollower(follower_id.follower_id).subscribe({
      next: (data: followers[]) => {
        console.log('remove follower');
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
}
