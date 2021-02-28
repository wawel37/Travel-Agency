import { User } from './IUser';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICart } from './cart/ICart';

@Injectable({
  providedIn: 'root'
})
export class CartItemServiceService {

  private cartItemsCollectionName = 'cartItems';
  private client: AngularFireList<ICart>;

  constructor(private db: AngularFireDatabase) {
    this.client = db.list(this.cartItemsCollectionName);
  }

  getData(): AngularFireList<any>{
    return this.client;
  }

  deleteCartItem(key: string, user: User): void{
    const userName = this.adjustEmailToKey(user.email);
    this.client.remove(userName + '/' + key);
  }

  deleteItemFromAllUsersCarts(tourName: string): void{
    let query = this.client.query.ref.orderByKey();
    query.once('value')
    .then(snapshot => {
      snapshot.forEach(childSnapShot => {
        this.client.remove(childSnapShot.key + '/' + tourName);
      })
    })
  }

  addCartItem(cartItem: ICart, user: User): void{
    const userName = this.adjustEmailToKey(user.email);
    this.client.set(userName + '/' + cartItem.name, {...cartItem});
  //   this.client.set(userName, {cartItem.name, {...cartItem}});
  // }
  }

  updateCartItem(key: string, value: any, user: User): void{
    const userName = this.adjustEmailToKey(user.email);
    this.client.update(userName + '/' + key, value);
  }

  updateCartItemsForAllUsers(key: string, value: any): void{
    let query = this.client.query.ref.orderByKey();
    query.once('value')
    .then(snapshot => {
      snapshot.forEach(childSnapShot => {
        if(childSnapShot.hasChild(key)){
          this.client.update(childSnapShot.key + '/' + key, value);
        }
      })
    });
  }

  getUsersCart(key: string): Observable<any>{
    const email = this.adjustEmailToKey(key);
    let tempClient: AngularFireObject<any> = this.db.object(this.cartItemsCollectionName + '/'+ email);
    return tempClient.snapshotChanges().pipe(map(changes => ({ ...changes.payload.val() })));
  }

  adjustEmailToKey(email: string): string{
    return email.replace('@', '').replace('#', '').replace('$', '').replace('[', '').replace(']', '').replace('.', '');
  }
}
