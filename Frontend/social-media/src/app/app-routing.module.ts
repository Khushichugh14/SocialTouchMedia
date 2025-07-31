import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterUserComponent } from './user/register-user/register-user.component';
import { LoginUserComponent } from './user/login-user/login-user.component';
import { HomeComponent } from './user/home/home.component';
import { FeedPageComponent } from './social-media/feed-page/feed-page.component';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';
import { FollowersFollowingComponent } from './social-media/followers-following/followers-following.component';
import { FollowingComponent } from './social-media/following/following.component';
import { AddFriendComponent } from './social-media/add-friend/add-friend.component';
import { PostComponent } from './user/post/post.component';
import { ProfileComponentComponent } from './settings/profile-component/profile-component.component';
import { BlockedComponent } from './settings/blocked/blocked.component';
import { ContentComponent } from './settings/content/content.component';
import { NotificationComponent } from './settings/notification/notification.component';
import { PrivacyComponent } from './settings/privacy/privacy.component';
import { DeactivationLogoutComponent } from './settings/deactivation-logout/deactivation-logout.component';
import { SettingsComponent } from './settings/settings/settings.component';

const routes: Routes = [
  {
    path:'register',
    component: RegisterUserComponent
  },
  {
    path:'',
    component:LoginUserComponent
  },
  {
    path:'feed',
    component:FeedPageComponent
  },
  {
    path:"forgot-password",
    component:ForgotPasswordComponent
  },
  {
    path:"followers",
    component:FollowersFollowingComponent
  },
  {
    path:"following",
    component: FollowingComponent
  },
  {
    path:"friends",
    component: AddFriendComponent
  },
  {
    path: "view-profile/:user_id",
    component:HomeComponent
  },
  {
    path: 'view-post/:post_id',
    component:PostComponent
  },
  {
    path: 'settings',
    component: SettingsComponent,
    children: [
      { path: 'profile', component:ProfileComponentComponent },
      { path: 'blocked-accounts', component: BlockedComponent },
      { path: 'content-settings', component: ContentComponent},
      { path: 'notifications-settings', component: NotificationComponent },
      { path: 'privacy-settings', component:PrivacyComponent },
      { path: 'deactivation-logout', component: DeactivationLogoutComponent },
      { path: '', redirectTo: 'profile', pathMatch: 'full' } // Default route
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
