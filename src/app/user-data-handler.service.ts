import { AuthenticationServiceService } from './authentication-service.service';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './IUser';

@Injectable({
  providedIn: 'root'
})
export class UserDataHandlerService {

  private userColletionName = 'users';
  private client: AngularFireList<User>;

  constructor(private db: AngularFireDatabase, private authService: AuthenticationServiceService) {
    this.client = db.list(this.userColletionName);
  }

  getData(): AngularFireList<any>{
    return this.client;
  }

  deleteUser(key: string): void{
    this.client.remove(key);
  }

  addUser(user: User): void{
    const key = this.adjustEmailToKey(user.email);
    this.client.set(key, {...user});
  }

  updateUser(key: string, value: any): void{
    key = this.adjustEmailToKey(key);
    this.client.update(key,value);
  }

  getUser(email: string): Observable<any>{
    const key = this.adjustEmailToKey(email);
    let tempClient: AngularFireObject<User> = this.db.object(this.userColletionName + '/'+ key);
    return tempClient.snapshotChanges().pipe(map(changes => ({ key: changes.payload.key, ...changes.payload.val() })));
  }

  adjustEmailToKey(email: string): string{
    return email.replace('@', '').replace('#', '').replace('$', '').replace('[', '').replace(']', '').replace('.', '');
  }

  checkIfLoggedUserIsAdmin(): any{
    this.authService.getLogged().pipe(map(auth => {
      if (auth){
        console.log('zalogowany');
        return this.getUser(auth.email).pipe(map(user => {
          return user.roles.admin;
        }))
      }else{
        console.log('niezalogowany');
        return false;
      }
    }))
  }

  getAllUsersAsList(): Observable<any[]>{
    return this.client.snapshotChanges().pipe(
      map(changes => changes.map(c => ({key : c.payload.key, ...c.payload.val()})))
    );
  }

}
