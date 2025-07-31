import { Component, OnInit } from '@angular/core';
import { SocialMediaService } from '../social-media.service';
import { followers } from 'src/app/shared/interfaces/followers-following.interface';
import { CookieService } from 'ngx-cookie-service';
import { APP_CONSTANTS } from 'src/app/shared/constants/app.constants';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit{

  following!:followers[]
  API_URL = APP_CONSTANTS

  constructor(private socialMediaService:SocialMediaService,private cookieService : CookieService) { }
  ngOnInit(): void {
    this.showFollowing();
  }


  showFollowing() {
    this.socialMediaService.fetchFollowing(+this.cookieService.get('user_id')).subscribe({
      next: (data:followers[]) =>{
        this.following = data
        this.following = data.map(follower => ({
          ...follower,
          image_url: follower.image_url || "dummy.png"
        }));
        // console.log("data",data)
        // console.log("followers",this.following)
      },
      error: (error:any)=>{
        console.log(error)
      }
    })
  }

  remove(following_id:number){
    this.socialMediaService.removeFollowing(following_id).subscribe((data:followers[])=>{
      console.log("remove following")
      console.log(following_id)
    })
  }

}
