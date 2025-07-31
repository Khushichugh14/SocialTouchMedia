import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent {
  registerForm!: FormGroup
  imageUrl !: string
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.createForm()
  }

  createForm(): void {
    this.registerForm = new FormGroup({
      user_name: new FormControl(),
      email: new FormControl(),
      contact: new FormControl(),
      dob: new FormControl(),
      bio: new FormControl(),
      password: new FormControl(),
      confirmPassword: new FormControl(),
      image_url: new FormControl()
    })
  }
  submit(): void {
    // console.log(this.registerForm.value)
    if(this.imageUrl === undefined){
      this.registerForm.patchValue({
        image_url: "null"
      });
    }
    console.log(this.registerForm.value.password)
    if (this.registerForm.value.password === this.registerForm.value.confirmPassword) {
      this.userService.uploadFile(this.imageUrl).subscribe((data)=>{
        this.userService.register(this.registerForm.value).subscribe((data)=>{
          console.log(data)
          this.router.navigate([''])
        })
      })
    }
    
  }
  read(event: any) {
    this.imageUrl = event.target.files[0];
    console.log(event.target.files);
    this.registerForm.patchValue({
      image_url: event.target.files[0].name
    });
  }
}
