import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { APP_CONSTANTS } from 'src/app/shared/constants/app.constants';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css']
})
export class PrivacyComponent implements OnInit{
  ngOnInit(): void {
    this.user_id=parseInt(this.cookieService.get("user_id"));
  }
  privacy: string = 'Public'; // Default value
  user_id!: number // Replace with actual user ID

  constructor(private http: HttpClient,private cookieService:CookieService) {}

  savePrivacySettings() {
    this.http.post<any>(`${APP_CONSTANTS.BACKEND_URL}updateaccountstatus/${this.user_id}`, { privacy: this.privacy })
      .subscribe(response => {
        console.log(response); // Handle response
      });
  }
}
