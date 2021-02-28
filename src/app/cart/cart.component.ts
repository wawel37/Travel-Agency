import { tours } from './../tours';
import { TourdatahandlerService } from './../tourdatahandler.service';
import { User } from './../IUser';
import { AuthenticationServiceService } from './../authentication-service.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { CartItemServiceService } from '../cart-item-service.service';
import { ICart } from './ICart';
import { ITour } from '../ITours';
import { VirtualTimeScheduler } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  recievedTours!: ITour[];
  cartItems: ICart[] = [];
  userData: User;

  constructor(private cartItemService: CartItemServiceService,
    private authSerivce: AuthenticationServiceService,
    private toursService: TourdatahandlerService) {
      this.userData = JSON.parse(localStorage.getItem('loggedUser')!);
  }

  ngOnInit(): void{
    this.readCartItems();
    this.readTours();
  }

  readTours(): void{
    this.toursService.getData().snapshotChanges().pipe(
      map(changes => changes.map(c => ({key : c.payload.key, ...c.payload.val()})))
    ).subscribe(tours =>{
      this.recievedTours = tours;
      console.log(tours);
    });
  }

  async readCartItems(): Promise<any>{
    this.cartItemService.getUsersCart(this.userData.email).subscribe(cart => {
      this.cartItems = Object.values(cart);
    });
  }

  getSum(): number{
    let res = 0;
    this.cartItems.forEach(item =>{
      res += item.price * item.count;
    });
    return res;
  }

  canAdd(cartItem: ICart): boolean{
    const tour = this.getTourByName(cartItem.name);
    if(tour.capacity > tour.reserved){
      return true;
    }else return false;
  }

  canDelete(cartItem: ICart): boolean{
    const tour = this.getTourByName(cartItem.name);
    if(cartItem.count > 0){
      return true;
    }else return false;
  }

  getTourByName(name: String): ITour{
    return this.recievedTours.filter(tour =>{
      return tour.name === name;
    })[0];
  }

  addTour(cartItem: ICart): void{
    const tour = this.getTourByName(cartItem.name);
    if (cartItem.count === 0){
      this.cartItemService.addCartItem({name: cartItem.name, price: cartItem.price, count: (cartItem.count + 1), userRated: false}, this.userData);
    }else{
      this.cartItemService.updateCartItem(cartItem.name, {count: (cartItem.count + 1)}, this.userData);
    }
    this.toursService.updateTour(cartItem.name, {reserved: tour.reserved + 1});
  }

  deleteTour(cartItem: ICart): void{
    const tour = this.getTourByName(cartItem.name);
    this.cartItemService.updateCartItem(cartItem.name, {count: (cartItem.count - 1)}, this.userData);
    this.toursService.updateTour(cartItem.name, {reserved: tour.reserved - 1});
  }

  purchase(): void{
    //TODO
  }

}
