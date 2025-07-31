import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { addFriend } from 'src/app/shared/interfaces/addFriend.interface';
import { SocialMediaService } from '../social-media.service';
import { APP_CONSTANTS } from 'src/app/shared/constants/app.constants';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.css']
})
export class AddFriendComponent implements OnInit {
  friends!: addFriend[];
  API_URL = APP_CONSTANTS
  constructor(private router: Router, private cookieService: CookieService, private socialMediaService: SocialMediaService) { }
  ngOnInit(): void {
    this.getFriendProfiles();
    console.log(this.friends)
  }
  // showUser(id: number) {
  //   this.router.navigate(['/view-profile', id]);
  // }
  getFriendProfiles() {
    this.socialMediaService.fetchUserDetails(+this.cookieService.get('user_id')).subscribe((data) => {
      this.friends = data;
      console.log(data)
      this.friends = data.map(friend => ({
        ...friend,
        image_url: friend.image_url || "dummy.png"
      }));
    })
  }
  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  addFriend(friend: any) {
    this.socialMediaService.addFollower(friend.user_id, +this.cookieService.get('user_id')).subscribe((data) => {
      if(data == 0) {
        alert('Error');
      }
      else {
        alert('Friend Added');
        this.router.navigate(['/friends']);
      }
    })
  }
}
