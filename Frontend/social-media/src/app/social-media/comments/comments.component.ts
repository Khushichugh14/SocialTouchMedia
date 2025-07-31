import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/shared/interfaces/comment.interface';
import { SocialMediaService } from '../social-media.service';
import { CookieService } from 'ngx-cookie-service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() post_id!: number;
  user_id: number = parseInt(this.cookieService.get('user_id'));
  comments!: Comment[];
  displayedComments: any[] = [];
  commentForm!: FormGroup;
  isCommentReplyVisible!: Comment;
  isCommentBoxVisible!: Comment;

  constructor(private socialMediaService: SocialMediaService, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.commentForm = new FormGroup({
      comment: new FormControl('', Validators.required)
    });
    this.fetchComments();
  }

  fetchComments() {
    this.socialMediaService.fetchComments(this.post_id).subscribe((data: Comment[]) => {
      data.sort((a: { comment_time: string }, b: { comment_time: string }) => {
        const dateA = new Date(a.comment_time);
        const dateB = new Date(b.comment_time);

        return dateB.getTime() - dateA.getTime();
      });

      this.comments = data;

      this.comments = data.map(comment => ({ ...comment, is_deleted: false }));
      this.comments = data.map(comment => ({ ...comment, is_reply: false }));
      this.convertTime();
      this.displayedComments = this.comments.slice(0, 10);
      console.log(this.comments);
    });
  }
  onReply(comment: Comment): void {
    // Toggle the is_reply property
    if (comment.is_reply) {
      comment.is_reply = false;
    } else {
      if (this.isCommentBoxVisible) {
        this.isCommentBoxVisible.is_reply = false;
      }
      comment.is_reply = true;
      this.isCommentBoxVisible = comment;
    }
  }
  replyCommentForm = new FormGroup({
    comment: new FormControl('', Validators.required),
    user_id: new FormControl(),
    comment_id: new FormControl(),
  });
  commentReply(comment: Comment) {
    if (this.replyCommentForm.valid) {
      this.replyCommentForm.patchValue({
        comment_id: comment.id,
        user_id: this.user_id
      });
      this.socialMediaService.addReplyComment(this.replyCommentForm.value).subscribe((data) => {
        comment.is_reply = false;
        this.fetchComments();
        this.replyCommentForm.reset();
      });
    }
  }
  isReplyCmtVisible(comment: Comment): void {
    if (comment.repliesBox) {
      comment.repliesBox = false;
    } else {
      if (this.isCommentBoxVisible) {
        this.isCommentBoxVisible.repliesBox = false;
      }
      comment.repliesBox = true;
      this.isCommentBoxVisible = comment;
    }
  }

  private convertTime(): void {
    this.comments.forEach(comment => {
      const commentDate = new Date(comment.comment_time);
      const currentDate = new Date();
      const diff = currentDate.getTime() - commentDate.getTime();
      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      if (days > 0) {
        comment.comment_time = commentDate.toDateString();
      } else if (hours > 0) {
        comment.comment_time = hours + " hours ago";
      } else if (minutes > 0) {
        comment.comment_time = minutes + " minutes ago";
      } else {
        comment.comment_time = seconds + " seconds ago";
      }
    });
  }

  loadMoreComments() {
    const startIndex = this.displayedComments.length;
    const endIndex = startIndex + 10;
    this.displayedComments.push(...this.comments.slice(startIndex, endIndex));
  }
  addComment() {
    if (this.commentForm.valid) {
      const comment = this.commentForm.value.comment;
      let commentObj = {
        post_id: this.post_id,
        user_id: this.user_id,
        comment: comment
      };
      this.socialMediaService.addComment(commentObj).subscribe((data) => {
        this.fetchComments();
        this.commentForm.reset();
      });
    }
  }
  deleteComment(comment_id: number) {
    this.socialMediaService.deleteComment(comment_id).subscribe((data) => {
      this.fetchComments()
    })
  }
  isDeleted: boolean = false;

  deleteItem(comment: Comment) {
    // Add your delete logic here
    // For example, make an API call to delete the item
    // After the item is successfully deleted, set isDeleted to true
    comment.is_deleted = true;
    const commentedSection = document.querySelector('.commented-section');
    if (commentedSection) {
      commentedSection.classList.add('deleted');
    }
    this.socialMediaService.deleteCommentByUser(comment.id, this.user_id, this.post_id).subscribe(() => {
      this.fetchComments();
    }
    );
  }
  handleCommentCount(commentId: number) {
    if (commentId == -1) { // Hide the "View More Replies" button for the specific comment if there are no comments
    }
    else {const commentToUpdate = this.comments.find(comment => comment.id === commentId);
      if (commentToUpdate) {
        commentToUpdate.ReplyCount = 0;
      }
    }
  }
}
