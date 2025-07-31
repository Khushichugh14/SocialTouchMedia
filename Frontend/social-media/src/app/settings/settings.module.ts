import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockedComponent } from './blocked/blocked.component';
import { ContentComponent } from './content/content.component';
import { DeactivationLogoutComponent } from './deactivation-logout/deactivation-logout.component';
import { NotificationComponent } from './notification/notification.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ProfileComponentComponent } from './profile-component/profile-component.component';
import { AppRoutingModule } from '../app-routing.module';
import { SettingsComponent } from './settings/settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    BlockedComponent,
    ContentComponent,
    DeactivationLogoutComponent,
    NotificationComponent,
    PrivacyComponent,
    ProfileComponentComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class SettingsModule { }
