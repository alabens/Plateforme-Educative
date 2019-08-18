import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgProgressModule,NgProgressInterceptor  } from 'ngx-progressbar';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './user/auth.service';
import { FormsModule }   from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { OurCoursesComponent } from './our-courses/our-courses.component';
import { ServicesComponent } from './services/services.component';
import { SigninComponent } from './user/signin/signin.component';
import { SignupComponent } from './user/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    AllUsersComponent,
    
    OurCoursesComponent,
    ServicesComponent,
    SigninComponent,
    SignupComponent,
    
  ],
  imports: [
    HttpClientModule, 
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgProgressModule

  ],
  providers: [AuthService ,
    { provide: HTTP_INTERCEPTORS, useClass: NgProgressInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
