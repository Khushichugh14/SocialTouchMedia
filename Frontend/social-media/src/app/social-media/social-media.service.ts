import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { POST } from '../shared/interfaces/post.interface';
import { Data } from '@angular/router';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { addFriend } from '../shared/interfaces/addFriend.interface';

@Injectable({
  providedIn: 'root',
})
export class SocialMediaService {
  constructor(private http: HttpClient) {}

  fetchPosts(user_id: number): Observable<POST[]> {
    return this.http.get<POST[]>(
      `http://localhost:8080/api/fetchpost/` + user_id
    );
  }

  fetchFollowers(user_id: number): Observable<POST[]> {
    return this.http.get<POST[]>(
      `http://localhost:8080/api/followers/` + user_id
    );
  }

  fetchFollowing(user_id: number): Observable<POST[]> {
    return this.http.get<POST[]>(
      `http://localhost:8080/api/following/` + user_id
    );
  }

  createPost(post: any): Observable<any> {
    return this.http.post(`http://localhost:8080/api/create-post`, post, {
      responseType: 'text',
    });
  }
  uploadFile(file: any): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post('http://localhost:8080/api/uploadFile', formData);
  }
  likePost(post_id: number, user_id: number): Observable<any> {
    return this.http.post(`http://localhost:8080/api/like`, {
      post_id,
      user_id,
    });
  }
  UnLikePost(post_id: number, user_id: number): Observable<any> {
    return this.http.post(`http://localhost:8080/api/unlike`, {
      post_id,
      user_id,
    });
  }
  addComment(comment: any): Observable<any> {
    return this.http.post(`http://localhost:8080/api/addComment`, comment);
  }
  savePost(user_id: number, post_id: number): Observable<any> {
    return this.http.post(
      `http://localhost:8080/api/save/${user_id}/${post_id}`,
      { user_id, post_id }
    );
  }

  unsavePost(user_id: number, post_id: number): Observable<any> {
    return this.http.post(
      `http://localhost:8080/api/unsave/${user_id}/${post_id}`,
      { user_id, post_id }
    );
  }

  deleteComment(comment_id: number): Observable<any> {
    return this.http.delete(
      `http://localhost:8080/api/deleteComment/` + comment_id
    );
  }
  fetchComments(post_id: number): Observable<any> {
    return this.http.post(`http://localhost:8080/api/fetchComments`, {
      post_id,
    });
  }
  deleteCommentByUser(
    comment_id: number,
    user_id: number,
    post_id: number
  ): Observable<any> {
    console.log(comment_id, user_id, post_id);
    return this.http.post(`http://localhost:8080/api/deleteComment`, {
      comment_id,
      user_id,
      post_id,
    });
  }
  addReplyComment(reply: any): Observable<any> {
    return this.http.post(`http://localhost:8080/api/addReplyComment`, reply);
  }
  fetchReplyComments(comment_id: number): Observable<any> {
    return this.http.post(`http://localhost:8080/api/fetchReplyComments`, {
      comment_id,
    });
  }
  deleteReplyComment(
    reply_id: number,
    user_id: number,
    comment_id: number
  ): Observable<any> {
    // console.log(reply_id:number,user_id: number,comment_id:number)
    return this.http.post(`http://localhost:8080/api/deleteReplyComment`, {
      comment_id,
      user_id,
      reply_id,
    });
  }
  removeFollower(follower_id: number): Observable<any> {
    console.log(follower_id);
    return this.http.post(`http://localhost:8080/api/removeFollower`, {
      follower_id,
    });
  }
  removeFollowing(following_id: number): Observable<any> {
    return this.http.post(`http://localhost:8080/api/removeFollowing`, {
      following_id,
    });
  }
  fetchUserDetails(user_id: number): Observable<addFriend[]> {
    return this.http.post<addFriend[]>(
      `http://localhost:8080/api/fetchAddFriends`,
      { user_id }
    );
  }
  addFollower(follower_id: number, user_id: number): Observable<any> {
    return this.http.post(`http://localhost:8080/api/addFollower`, {
      follower_id,
      user_id,
    });
  }
  getPost(post_id: number): Observable<POST> {
    return this.http.get<POST>(`http://localhost:8080/api/getPost/` + post_id);
  }
}
