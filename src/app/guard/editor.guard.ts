import { AuthenticationServiceService } from './../authentication-service.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../IUser';

@Injectable({
  providedIn: 'root'
})
export class EditorGuard implements CanActivate {

  constructor(private authService: AuthenticationServiceService){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.getLogged().pipe(map(auth => {
        if (auth){
          const recivedData = localStorage.getItem('loggedUser')!;
          const userData: User = JSON.parse(recivedData);
          if (userData.roles.editor || userData.roles.admin){
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
