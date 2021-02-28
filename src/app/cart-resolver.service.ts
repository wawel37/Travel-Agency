import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartItemServiceService } from './cart-item-service.service';
import { ICart } from './cart/ICart';

@Injectable({
  providedIn: 'root'
})
export class CartResolverService implements Resolve<ICart[]>{

  constructor(private cartService: CartItemServiceService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICart[]> | Promise<ICart[]> | ICart[]{
    console.log("resolving");
    return this.cartService.getData().snapshotChanges().pipe(
      map(changes => changes.map(c => ({key : c.payload.key, ...c.payload.val()})))
    );
  }
}

