import { CartItemServiceService } from './../cart-item-service.service';
import { WHITE_ON_BLACK_CSS_CLASS } from '@angular/cdk/a11y/high-contrast-mode/high-contrast-mode-detector';
import { Component, Input, OnInit, Output } from '@angular/core';
import { ITour } from '../ITours';
import { TourdatahandlerService } from '../tourdatahandler.service';
import { User } from '../IUser';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  @Input() participants!: number;
  @Input() tour!: ITour;
  userData: User;
  isVoted = true;

  constructor(private tourService: TourdatahandlerService,
    private cartService: CartItemServiceService) {
    this.userData = JSON.parse(localStorage.getItem('loggedUser')!);
    this.cartService.getUsersCart(this.userData.email).subscribe(cartItems => {
      const cartItemsData = Object.values(cartItems);
      this.isVoted = true;
      cartItemsData.forEach((cartItem : any) => {
        if (cartItem.name == this.tour.name){
          console.log('tour name: ' + this.tour.name);
          console.log('cart item: ' + cartItem.userRated);
          this.isVoted = cartItem.userRated;
        }
      });
    });
  }

  ngOnInit(): void {
    this.tour.rate = Math.floor(this.tour.rate/this.tour.userRated);
  }

  rating(rate: number): void{

    if (this.participants > 0 && !this.isVoted){
      console.log('voted: ' + this.isVoted);
      const rateData = Math.floor((this.tour.rate + rate));
      this.tourService.updateTour(this.tour.name, {rate: rateData, userRated: this.tour.userRated + 1});
      this.cartService.updateCartItem(this.tour.name, {userRated: true}, this.userData);
    }
  }

}
