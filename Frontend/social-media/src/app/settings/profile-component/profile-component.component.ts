import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/user/user.service';
import { SettingsService } from '../settings.service';
import { HttpClient } from '@angular/common/http';
import { APP_CONSTANTS } from 'src/app/shared/constants/app.constants';
import { User } from 'src/app/shared/interfaces/user.interface';

@Component({
  selector: 'app-profile-component',
  templateUrl: './profile-component.component.html',
  styleUrls: ['./profile-component.component.css']
})
export class ProfileComponentComponent implements OnInit{
  API_URL = APP_CONSTANTS
  changePasswordForm!: FormGroup;
  // currentUserId: number=parseInt(this.cookieService.get("user_id"));
  user_id!:number
  profilePictureUrl: string | ArrayBuffer | null = null;
  UserDetails !: User
  // username: string ;
  // bio: string = 'Some bio content here';
  constructor(private userService: UserService, private router: Router, private cookieService: CookieService,private profileService: SettingsService,private http:HttpClient) {}
  ngOnInit(): void {
    this.changePasswordForm = new FormGroup({
      current_password: new FormControl(),
      new_password: new FormControl(),
      confirm_password: new FormControl()
    });
    this.user_id = parseInt(this.cookieService.get('user_id'));
    this.getUser(this.user_id)
  }

  passwordMatchValidator(control: FormControl): { [s: string]: boolean } | null {
    if (this.changePasswordForm && control.value !== this.changePasswordForm.controls['new_password'].value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.changePasswordForm.valid) {
      const userId = parseInt(this.cookieService.get('user_id')); // Convert to number
      const { current_password, new_password } = this.changePasswordForm.value;
      this.userService.changePassword({ user_id: userId, current_password, new_password }).subscribe(response => {
        console.log(response.success)
        console.log(response)
        if (response.status='Successful') {
          alert('Password changed successfully!');
          this.router.navigate(['/feed']);
        } else {
          alert('Current password is incorrect.');
        }
      });
    }
  }

  onFileSelected(event: any, userId: number) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => this.profilePictureUrl = reader.result as string;
      reader.readAsDataURL(file);
  
      this.profileService.uploadProfilePicture(file, userId).subscribe(
        (response) => {
          console.log('Success:', response);
          // Handle success (e.g., update profile picture URL)
        },
        (error) => {
          console.error('Error:', error);
          // Handle error
        }
      );
    }
  }

  editUsername() {
    const newUsername = prompt("Enter new username:");
    if (newUsername !== null && newUsername !== "") {
      console.log(newUsername)
      this.http.post<any>(`${APP_CONSTANTS.BACKEND_URL}updateusername/${this.user_id}`, {newUsername }).subscribe(response => {
        console.log(response); // Handle response
        // this.username = newUsername; // Update locally if needed
        
      });
    }
  }

  editBio() {
    const newBio = prompt("Enter new bio:");
    if (newBio !== null && newBio !== "") {
      this.http.post<any>(`${APP_CONSTANTS.BACKEND_URL}updatebio/${this.user_id}`, { newBio }).subscribe(response => {
        console.log(response); // Handle response
        // this.bio = newBio; // Update locally if needed

      });
    }
  }

  getUser(user_id: number){
    this.userService.getUser(user_id).subscribe({
      next: (data : User) => {
        this.UserDetails = data
        if(this.UserDetails.image_url === null){
          this.UserDetails.image_url = "dummy.png"
        }
        console.log(this.UserDetails)
        console.log(data)
      },
      error: (error) => {
        console.error(error);
      }
    })
  }
  
  }


