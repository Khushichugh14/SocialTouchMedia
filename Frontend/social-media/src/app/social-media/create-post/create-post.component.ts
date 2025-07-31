import { Component, ElementRef, ViewChild } from '@angular/core';
import { SocialMediaService } from '../social-media.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  constructor(private socialMediaService: SocialMediaService, private cookieService: CookieService) { }

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  imageUrl!: string;
  id: number = parseInt(this.cookieService.get('id'));
  formSubmitted: boolean = false;

  createPostForm = new FormGroup({
    id: new FormControl(parseInt(this.cookieService.get('user_id'))),
    caption: new FormControl('', Validators.required),
    image_url: new FormControl('', Validators.required),
    tags: new FormControl('', Validators.required),
  });

  openFileSelector() {
    this.fileInput.nativeElement.click();
  }

  read(event: any) {
    this.checkFile(event);
    this.imageUrl = event.target.files[0];
    this.createPostForm.patchValue({
      image_url: event.target.files[0].name
    });
  }
  private checkFile(event: any) {
    const FileSize = event.target.files[0].size / 1024 / 1024; // in MB
    if (FileSize > 100) {
      alert('File size exceeds 100 MB');
      this.fileInput.nativeElement.value = '';
    }
    const fileType = event.target.files[0].type;
    const validImageTypes = ['image/jpeg', 'image/png','video/mp4','video/ogg','video/webm','video/mkv'];
    if (!validImageTypes.includes(fileType)) {
      alert('Only JPEG and PNG file types are allowed');
      this.fileInput.nativeElement.value = '';
    }
    // return true;
  }

  createPost() {
    this.formSubmitted = true; // Set formSubmitted to true on form submission
    this.createPostForm.markAllAsTouched(); // Mark all controls as touched to trigger validation errors
    
    if (this.createPostForm.valid) {
      console.log(this.createPostForm.value);
      this.socialMediaService.uploadFile(this.imageUrl).subscribe(() => {
        this.socialMediaService.createPost(this.createPostForm.value).subscribe((response) => {
          alert('Post created successfully');
          console.log(response);
          if (response.includes('Posted Successfully')) {
            console.log(response);
            this.createPostForm.reset(); // Reset the form after successful submission
            this.imageUrl = '';
            this.formSubmitted = false; 
            
            // Reset formSubmitted after successful submission
          }
        });
      });
    }
  }
  
}
