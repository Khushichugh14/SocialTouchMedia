import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { SideComponent } from './side/side.component';
import { AppRoutingModule } from '../app-routing.module';
import { Router, RouterLink, RouterModule } from '@angular/router';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule,
    AppRoutingModule,
    NavComponent,
    SideComponent
  ],
  exports:[
    NavComponent,
    SideComponent
  ]
})
export class SharedModule { }
