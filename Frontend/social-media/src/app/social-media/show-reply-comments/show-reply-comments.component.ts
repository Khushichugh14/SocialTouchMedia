import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { SocialMediaService } from '../social-media.service';
import { ReplyComment } from 'src/app/shared/interfaces/replyComment.interface';

@Component({
  selector: 'app-show-reply-comments',
  templateUrl: './show-reply-comments.component.html',
  styleUrls: ['./show-reply-comments.component.css']
})
export class ShowReplyCommentsComponent {
  @Input() comment_id!: number;
  @Output() count: EventEmitter<number> = new EventEmitter<number>();
  user_id: number = parseInt(this.cookieService.get('user_id'));
  comments!: ReplyComment[];
  displayedComments: any[] = [];
  commentForm!: FormGroup;
  isCommentBoxVisible!: ReplyComment;

  constructor(private socialMediaService: SocialMediaService, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.commentForm = new FormGroup({
      comment: new FormControl('', Validators.required)
    });
    this.fetchComments();
  }

  fetchComments() {
    this.socialMediaService.fetchReplyComments(this.comment_id).subscribe((data: ReplyComment[]) => {
      data.sort((a: { reply_comment_time: string }, b: { reply_comment_time: string }) => {
        const dateA = new Date(a.reply_comment_time);
        const dateB = new Date(b.reply_comment_time);

        return dateB.getTime() - dateA.getTime();
      });

      this.comments = data;

      this.comments = data.map(comment => ({ ...comment, is_deleted: false }));
      this.comments = data.map(comment => ({ ...comment, is_reply: false }));
      this.convertTime();
      this.displayedComments = this.comments.slice(0, 10);
      if(this.comments.length == 0){
        this.count.emit(this.comment_id);
        
      } else {
        this.count.emit(-1);
      }
      // console.log(this.comments);
      console.log(this.comments);
    });
  }
  replyCommentForm = new FormGroup({
    comment: new FormControl('', Validators.required),
    user_id: new FormControl(),
    comment_id: new FormControl(),
  });
  private convertTime(): void {
    this.comments.forEach(comment => {
      const commentDate = new Date(comment.reply_comment_time);
      const currentDate = new Date();
      const diff = currentDate.getTime() - commentDate.getTime();
      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      if (days > 0) {
        comment.reply_comment_time = commentDate.toDateString();
      } else if (hours > 0) {
        comment.reply_comment_time = hours + " hours ago";
      } else if (minutes > 0) {
        comment.reply_comment_time = minutes + " minutes ago";
      } else {
        comment.reply_comment_time = seconds + " seconds ago";
      }
    });
  }

  loadMoreComments() {
    const startIndex = this.displayedComments.length;
    const endIndex = startIndex + 10;
    this.displayedComments.push(...this.comments.slice(startIndex, endIndex));
  }
  deleteComment(comment_id: number) {
    this.socialMediaService.deleteComment(comment_id).subscribe((data) => {
      this.fetchComments()
    })
  }
  isDeleted: boolean = false;

  deleteItem(comment: ReplyComment) {
    // Add your delete logic here
    // For example, make an API call to delete the item
    // After the item is successfully deleted, set isDeleted to true
    comment.is_deleted = true;
    this.socialMediaService.deleteReplyComment(comment.reply_id,comment.reply_user_id,this.comment_id).subscribe(() => {
      this.fetchComments();
    }
    );
  }
}
