import { AuthenticationServiceService } from './../../authentication-service.service';
import { UserDataHandlerService } from './../../user-data-handler.service';
import { TourdatahandlerService } from './../../tourdatahandler.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITour } from 'src/app/ITours';
import { CartItemServiceService } from 'src/app/cart-item-service.service';
import { ICart } from 'src/app/cart/ICart';
import { map } from 'rxjs/operators';
import { AngularFireList } from '@angular/fire/database';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from 'src/app/IUser';

@Component({
  selector: 'app-tour-details',
  templateUrl: './tour-details.component.html',
  styleUrls: ['./tour-details.component.css']
})
export class TourDetailsComponent implements OnInit {


  tour!: ITour;
  participantCounter!: number;
  userCounter!: number;
  tourKey!: string;
  userData: User;
  doesCartExist = true;

  constructor(private route: ActivatedRoute,
    private tourService: TourdatahandlerService,
    private cartItemService: CartItemServiceService,
    private userService: UserDataHandlerService,
    private authService: AuthenticationServiceService,
    private router: Router) {
      this.userData = JSON.parse(localStorage.getItem('loggedUser')!);
  }

  ngOnInit(): void{
    this.route.params.subscribe(param => {
      console.log(param);
      this.tourKey = param.id;
      console.log("moj klucz to: " + this.tourKey);
    });

    this.tourService.getTour(this.tourKey).subscribe(tour => {
      this.tour = tour;
      console.log(this.tour);
      this.participantCounter = tour.reserved;
      this.cartItemService.getUsersCart(this.userData.email).subscribe(cartItems => {
        const tourName = this.tour.name;
        if (cartItems[tourName] !== undefined){
          this.userCounter = cartItems[tourName].count;
          this.doesCartExist = true;
        }else{
          this.userCounter = 0;
          this.doesCartExist = false;
        }

      });
    });



  }

  deleteTour(): void{
    if (this.userData == null || !this.userData.roles.admin){
      alert('You don\'t have permission to delete tours!');
      return;
    }
    this.tourService.deleteTour(this.tour.name);
    this.cartItemService.deleteItemFromAllUsersCarts(this.tour.name);
    this.router.navigate(['']);
  }

  addParticipant(): void{
    this.userCounter++;
    console.log(this.participantCounter);
    if (this.userCounter === 1 && !this.doesCartExist){
      this.cartItemService.addCartItem({name: this.tour.name, price: this.tour.price, count: this.userCounter, userRated: false}, this.userData);
    }else{
      this.cartItemService.updateCartItem(this.tour.name, {count: this.userCounter}, this.userData);
    }
    this.tourService.updateTour(this.tour.name, {reserved: this.tour.reserved + 1});

  }

  removeParticipant(): void{
    this.userCounter--;
    this.cartItemService.updateCartItem(this.tour.name, {count: this.userCounter}, this.userData);
    this.tourService.updateTour(this.tour.name, {reserved: this.tour.reserved - 1});
  }
}
