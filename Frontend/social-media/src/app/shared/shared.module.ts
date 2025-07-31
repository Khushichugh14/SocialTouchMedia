import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { SideComponent } from './side/side.component';
import { AppRoutingModule } from '../app-routing.module';
import { Router, RouterLink, RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NavComponent,
    SideComponent

  ],
  imports: [
    CommonModule,
    RouterModule,
    AppRoutingModule
  ],
  exports:[
    NavComponent,
    SideComponent
  ]
})
export class SharedModule { }
