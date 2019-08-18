import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SigninComponent } from './user/signin/signin.component';
import { SignupComponent } from './user/signup/signup.component';
import { ServicesComponent } from './services/services.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { WelcomeComponent } from './welcome/welcome.component'
import { OurCoursesComponent } from './our-courses/our-courses.component';


import { AuthGuard } from './user/auth-guard.service';

const routes: Routes = [
  { path: '', component: SigninComponent },
  
  { path: 'signup', component: SignupComponent },
  { path: 'allUsers', canActivate: [AuthGuard], component: AllUsersComponent },
  { path: 'our-courses', canActivate: [AuthGuard], component: OurCoursesComponent },
  { path: 'home', canActivate: [AuthGuard], component: WelcomeComponent },
  { path: 'services', canActivate: [AuthGuard], component: ServicesComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
