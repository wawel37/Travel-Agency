import { UserDataHandlerService } from './user-data-handler.service';
import { AuthenticationServiceService } from './authentication-service.service';
import { TourdatahandlerService } from './tourdatahandler.service';
import { ITour } from './ITours';
import { Component } from '@angular/core';
import { tours } from './tours';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { User } from './IUser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  isLogged = false;
  email = '';
  userData?: User | null;

  constructor(private angularFireAuth: AuthenticationServiceService,
    private router: Router,
    private userService: UserDataHandlerService){
    this.angularFireAuth.getLogged().subscribe(auth => {
      if (auth){
        this.isLogged = true;
        this.email = auth.email;
        this.userService.getUser(this.email).subscribe(user => {
          this.userData = user;
          localStorage.setItem('loggedUser', JSON.stringify(user));
        });
      }else{
        this.isLogged = false;
        this.email = '';
        this.userData = null;
        localStorage.setItem('loggedUser', '');
        console.log('moj storage to: ' + JSON.stringify(localStorage.getItem('loggedUser')));
      }
    });
  }

  logOut(): void{
    this.router.navigate(['']);
    this.isLogged = false;
    this.angularFireAuth.logout();
    alert('Successfully logged out!');
    localStorage.setItem('loggedUser', '');
  }

}
