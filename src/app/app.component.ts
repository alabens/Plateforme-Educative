import { Component, OnInit } from '@angular/core';
import { Event, Router, NavigationStart ,NavigationEnd } from '@angular/router';


import { AuthService } from './user/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', 

  styleUrls: ['./app.component.scss']

})
export class AppComponent implements OnInit {
  isAuthenticated =true;
  showLoadingIndicator=true;

  constructor(private authService: AuthService,
              private router: Router,) {
      
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
    this.authService.authStatusChanged.subscribe(
      (authenticated) => {
        this.isAuthenticated = authenticated;
        if (authenticated ==false) {
          this.router.navigate(['']);
        }
    })
      
  }

  onLogout() {
    this.authService.logout();
  }
}
