import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { APP_CONSTANTS } from '../shared/constants/app.constants';
import { User } from '../shared/interfaces/user.interface';
import { POST } from '../shared/interfaces/post.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_URL = APP_CONSTANTS.BACKEND_URL;

  constructor(private http: HttpClient) { }

  register(body: any): Observable<any> {
    return this.http.post(APP_CONSTANTS.BACKEND_URL + 'register', body)
  }

  login(body: any): Observable<any> {
    return this.http.post(APP_CONSTANTS.BACKEND_URL + 'login', body)
  }

  getUser(user_id: number): Observable<User> {
    return this.http.get<User>(`${this.API_URL}getUser/${user_id}`).pipe(
      map(user => {
        user.posts = JSON.parse(user.posts as unknown as string);
        return user;
      })
    );
  }

  getSave(user_id: number): Observable<User> {
    return this.http.get<User>(`${APP_CONSTANTS.BACKEND_URL}getSave/${user_id}`).pipe(
      map(user => {
        console.log(user);
        // Check if saved_posts is a string and needs parsing
        if (typeof user.saved_posts === 'string') {
          try {
            user.saved_posts = JSON.parse(user.saved_posts);
          } catch (e) {
            user.saved_posts = [];
          }
        } else if (!Array.isArray(user.saved_posts)) {
          user.saved_posts = [];
        }
        return user;
      })
    );
  }
  
  getPost(user_id:number,post_id:number): Observable<POST> {
    return this.http.post<POST>(APP_CONSTANTS.BACKEND_URL + `getPost`,{post_id,user_id})
  }

  logout(user_id: number): Observable<any> {
    return this.http.post(`${APP_CONSTANTS.BACKEND_URL}logout`, { user_id });
  }

  deactivateUser(user_id: number): Observable<any> {
    return this.http.post(`${APP_CONSTANTS.BACKEND_URL}deactivate`, { user_id });
  }

  changePassword(body: { user_id: number, current_password: string, new_password: string }): Observable<any> {
    return this.http.post(`${APP_CONSTANTS.BACKEND_URL}changePassword`, body);
  }
  uploadFile(file : any) : Observable<any>{
    const formData = new FormData();
    formData.append("file",file);
    console.log(formData);
    return this.http.post("http://localhost:8080/api/uploadFile",formData)
  }
  
}
