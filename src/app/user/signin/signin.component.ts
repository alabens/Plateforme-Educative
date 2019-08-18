import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { Event, Router, NavigationStart ,NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  @ViewChild('usrForm',{static: false}) form: NgForm;
  didFail = false;
  isLoading = false;
  ajout : boolean =false ;
  isAuthenticated = false;
  showLoadingIndicator=true;

  constructor(private authService: AuthService,
              private router: Router) {
      
              this.router.events.subscribe((routerEvent:Event) => {
                if(routerEvent instanceof NavigationStart){
                  this.showLoadingIndicator=true;
                }

                if(routerEvent instanceof NavigationEnd){
                  this.showLoadingIndicator=false;
                }

              });

  }

  ngOnInit() {
    this.authService.authIsLoading.subscribe(
      (isLoading: boolean) => this.isLoading = isLoading
    );
    this.authService.authDidFail.subscribe(
      (didFail: boolean) => this.didFail = didFail
    );
    this.authService.authIsLoading.subscribe(
      (isLoading: boolean) => this.isLoading = isLoading
    );
    this.authService.authDidFail.subscribe(
      (didFail: boolean) => this.didFail = didFail
    );
        this.authService.authStatusChanged.subscribe(
      (authenticated) => {
        this.isAuthenticated = authenticated;
        if (authenticated ) {
          this.isAuthenticated=true;
          this.router.navigate(['home']);
          this.router.getCurrentNavigation();
         
          

   


        } else {
          this.router.navigate(['']);
          this.isAuthenticated=false;

        }
      }
    );
    this.authService.initAuth();

  }


  onSubmit() {
    const usrName = this.form.value.username;
    const password = this.form.value.password;
    this.authService.signIn(usrName, password);
  }

  autouriserAjout(){

    this.ajout=true;
  
  }
  inhiberAjout(){
    this.ajout=false;
  
  }
  
}
