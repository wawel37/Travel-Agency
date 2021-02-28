import { map } from 'rxjs/operators';
import { AuthenticationServiceService } from './../authentication-service.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthenticationServiceService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.getLogged().pipe(map(auth => {
        if (auth){
          return true;
        }else{
          this.router.navigate(['login']);
          alert('You need to log in to get access to that area!');
          return false;
        }
      }));
    }
}
