import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { Event, Router, NavigationStart ,NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  confirmUser = false;
  didFail = false;
  isLoading = false;
  isAuthenticated =false ;
  isConfirmed=false ;
  name: string;
  @ViewChild('usrForm',{static: false}) form: NgForm;

  constructor(private authService: AuthService,private router: Router) {
  }

  ngOnInit() {
    this.isAuthenticated=false ;
    this.isConfirmed=false;
  }

  onSubmit() {
    const usrName = this.form.value.username;
    const email = this.form.value.email;
    const password = this.form.value.password;
    this.authService.signUp(usrName, email, password);
    this.name=usrName;

    alert("An email with confirmation code was sent to "+ email);
    this.onDoConfirm();
  }

  onDoConfirm() {
    this.confirmUser = true;
  }

  onConfirm(formValue: { usrName: string, validationCode: string }) {
    this.authService.confirmUser(this.name, formValue.validationCode);
    this.isConfirmed=true;
    this.isAuthenticated=true;
    this.confirmUser=false ; 
    


    

  }
}
