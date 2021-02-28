import { fromEventPattern, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {

  userData: Observable<any>;

  constructor(private angularFireAuth: AngularFireAuth) {
    this.userData = angularFireAuth.authState;
    angularFireAuth.authState.subscribe( auth => {
      if(auth) {
        console.log('logged-id');
        console.log(auth.email);
      } else {
        console.log('not logged-id');
      }
    });
  }

  /* Sign up */
  signUp(email: string, password: string): Promise<any>{
    return this.angularFireAuth.createUserWithEmailAndPassword(email, password);
  }

  logIn(email: string, password: string): Promise<any>{
    return this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }

  logout(): void{
    this.angularFireAuth.signOut()
    .then(res => console.log('You logged out', res))
    .catch(error => console.log('Something went wrong'));
  }

  getUser(): Promise<any>{
    return this.angularFireAuth.currentUser;
  }

  getLogged(): Observable<any>{
    return this.userData;
  }

  changePersistance(persistance: string): void{
    this.angularFireAuth.setPersistence(persistance);
  }
}
