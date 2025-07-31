import { Component, OnInit } from '@angular/core';
import { SocialMediaService } from '../social-media.service';
import { CookieService } from 'ngx-cookie-service';
import { POST } from 'src/app/shared/interfaces/post.interface';
import { APP_CONSTANTS } from 'src/app/shared/constants/app.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feed-page',
  templateUrl: './feed-page.component.html',
  styleUrls: ['./feed-page.component.css']
})
export class FeedPageComponent implements OnInit {
  // Constants
  API_URL = APP_CONSTANTS;

  // Variables
  user_id: number = parseInt(this.cookieService.get('user_id'));
  isCommentBoxVisible!: POST;
  postData!: POST[];

  constructor(private socialMediaService: SocialMediaService, private cookieService: CookieService, private router: Router) { }

  ngOnInit(): void {
    // Initialize component
    this.getPosts();
  }

  // Method to fetch posts from the server
  getPosts(): void {
    this.socialMediaService.fetchPosts(this.user_id).subscribe({
      next: (data: POST[]) => {
        // Sort posts by creation date
        data.sort((a: { created_at: string }, b: { created_at: string }) => {
          const dateA = new Date(a.created_at);
          const dateB = new Date(b.created_at);
          return dateB.getTime() - dateA.getTime();
        });

        // Map data and set default values
        this.postData = data.map(post => ({ ...post, is_liked: post.is_liked }));
        this.postData = data.map(post => ({ ...post, isSaved: post.isSaved }));
        this.postData = data.map(post => ({ ...post, isCommentVisible: false }));
        this.postData = data.map(post => ({
          ...post,
          image_url: post.image_url || "dummy.png"
        }));

        // Format tags and convert time
        this.formatTags();
        this.convertTime();

        console.log(this.postData)
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  // Method to format post tags
  private formatTags(): void {
    this.postData.forEach(post => {
      if (post.tags !== null && post.tags !== '') {
        const tagsArray = post.tags.split(',').map(tag => tag.trim());
        post.tags = tagsArray.map(tag => "#" + tag).join(' ');
      } else {
        post.tags = '';
      }
    });
  }

  // Method to convert post creation time to relative time
  private convertTime(): void {
    this.postData.forEach(post => {
      const postDate = new Date(post.created_at);
      const currentDate = new Date();
      const diff = currentDate.getTime() - postDate.getTime();
      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      if (days > 0) {
        post.created_at = postDate.toDateString();
      } else if (hours > 0) {
        post.created_at = hours + " hours ago";
      } else if (minutes > 0) {
        post.created_at = minutes + " minutes ago";
      } else {
        post.created_at = seconds + " seconds ago";
      }
    });
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
