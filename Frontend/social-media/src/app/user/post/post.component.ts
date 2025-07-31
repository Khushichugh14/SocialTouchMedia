import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { POST } from 'src/app/shared/interfaces/post.interface';
import { APP_CONSTANTS } from 'src/app/shared/constants/app.constants';
import { SocialMediaService } from 'src/app/social-media/social-media.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit{
  postId!: number;
  user_id = +this.cookieService.get('user_id');
  post!: POST;
  isCommentBoxVisible!: POST;
  API_URL = APP_CONSTANTS
  constructor(private userService : UserService, private route : ActivatedRoute,private cookieService: CookieService,private router : Router,private socialMediaService : SocialMediaService){}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // Extract user_id from URL parameters
      this.postId = +params['post_id'];
      this.getPost(this.postId);
    });
  }
  getPost(post_id: number){
    this.userService.getPost(this.user_id,post_id).subscribe({
      next: (data : any) => {
        console.log(data)
        this.post = data
        if(this.post.image_url === null){
          this.post.image_url = "dummy.png"
        }
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

  // Method to toggle like for a post
  toggleLike(post: POST): void {
    post.is_liked = !post.is_liked;
    if (post.is_liked) {
      this.socialMediaService.likePost(post.post_id, this.user_id).subscribe(response => { });
    } else {
      this.socialMediaService.UnLikePost(post.post_id, this.user_id).subscribe(response => { });
    }
  }

  // Method to toggle comment visibility for a post
  iscmtVisible(post: POST): void {
    if (post.isCommentVisible) {
      post.isCommentVisible = false;
    } else {
      if (this.isCommentBoxVisible) {
        this.isCommentBoxVisible.isCommentVisible = false;
      }
      post.isCommentVisible = true;
      this.isCommentBoxVisible = post;
    }
  }

  navigateProfile(): void {
    // Navigate to the profile route with the user ID parameter
    this.router.navigate(['/view-profile', this.user_id]);
  }

  showUser(id: number) {
    this.router.navigate(['/view-profile', id]);
  }

  savePost(post: POST): void {
    post.isSaved = !post.isSaved;
    // const userid =this.cookieService.get('user_id');
      if(post.isSaved){
        this.socialMediaService.savePost(this.user_id, post.post_id).subscribe(response => {
          // post.isSaved = true;
          console.log('Post saved successfully!', response);
        }, error => {
          console.error('Error saving post', error);
        });
      }
      else{
        this.socialMediaService.unsavePost(this.user_id, post.post_id).subscribe(response => {
          // post.isSaved = true;
          console.log('Post UNsaved successfully!', response);
        }, error => {
          console.error('Error UNsaving post', error);
        });
      }
      }
  }

