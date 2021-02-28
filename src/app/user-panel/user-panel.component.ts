import { Router } from '@angular/router';
import { User } from './../IUser';
import { AuthenticationServiceService } from './../authentication-service.service';
import { UserDataHandlerService } from './../user-data-handler.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent{

  userData?: User | null;
  constructor(private userService: UserDataHandlerService,
    private authService: AuthenticationServiceService,
    private router: Router) {
    this.authService.getLogged().subscribe(auth =>{
      if (auth){
        this.userService.getUser(auth.email).subscribe(user => {
          this.userData = user;
        });
      }else this.userData = null;
    });
  }

  navigateToForm(): void{
    this.router.navigate(['form']);
  }

  navigateToEditTours(): void{
    this.router.navigate(['editTours']);
  }

  navigateToEditRoles(): void{
    this.router.navigate(['editRoles']);
  }
}
