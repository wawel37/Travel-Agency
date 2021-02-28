import { User } from './../IUser';
import { UserDataHandlerService } from './../user-data-handler.service';
import { AuthenticationServiceService } from 'src/app/authentication-service.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JsonPipe } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private authService: AuthenticationServiceService,
    private userService: UserDataHandlerService,
    private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.getLogged().pipe(map(auth => {
        if (auth){
          const recivedData = localStorage.getItem('loggedUser')!;
          const userData: User = JSON.parse(recivedData);
          if (userData.roles.admin){
            return true;
          }
          else
          {
            alert('You don\'t have permission to that area!');
            return false;
          }
        }else{
          return false;
        }
      }));
  }

}
