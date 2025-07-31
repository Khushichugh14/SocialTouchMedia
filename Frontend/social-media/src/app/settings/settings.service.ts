import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private apiUrl = 'http://localhost:8080/api/uploadProfilePicture'; // Adjust the URL as needed

  constructor(private http: HttpClient) { }

  uploadProfilePicture(file: File, userId: number): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('profilePicture', file, file.name);
    formData.append('user_id', userId.toString()); // Add user_id to the form data
  
    return this.http.post<any>(this.apiUrl, formData);
  }
  

}
