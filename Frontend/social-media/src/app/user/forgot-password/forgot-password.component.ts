import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  emailForm !:FormGroup
  constructor(private router: Router, private userService: UserService){}

  ngOnInit():void{
    this.creatForm();
  }

  creatForm():void{
    this.emailForm = new FormGroup ({
      email:new FormControl()
   });
  }
  submitForm():void{
    console.log(this.emailForm.value)
  }
}
