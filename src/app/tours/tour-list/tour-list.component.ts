import { ICart } from './../../cart/ICart';
import { AuthenticationServiceService } from './../../authentication-service.service';
import { UserDataHandlerService } from './../../user-data-handler.service';
import { TourdatahandlerService } from './../../tourdatahandler.service';
import { ITour } from './../../ITours';
import { Component, OnInit } from '@angular/core';
import { tours } from '../../tours';
import { isEmpty, map, mergeMap } from 'rxjs/operators';
import { CartItemServiceService } from 'src/app/cart-item-service.service';
import { Observable, of, TimeoutError } from 'rxjs';
import { SnapshotAction } from '@angular/fire/database';
import { AngularFireList } from '@angular/fire/database';
import { User } from 'src/app/IUser';
import { BooleanInput } from '@angular/cdk/coercion';

@Component({
  selector: 'app-tour-list',
  templateUrl: './tour-list.component.html',
  styleUrls: ['./tour-list.component.css']
})
export class TourListComponent implements OnInit {

  recievedTours!: ITour[];
  minPrice = 0;
  maxPrice = 0;
  participantSum = 0;

  //Default values for filters
  filterDestinations: string[] = [];
  filterMaxPrice = -1;
  filterMinPrice = -1;
  filterRate: number[] = [];
  filterBeginDate = new Date();
  filterEndDate = new Date();
  defaultDate = new Date();
  userData?: User | null;

  constructor(private tourService: TourdatahandlerService,
    private cartItemService: CartItemServiceService,
    private userService: UserDataHandlerService,
    private authService: AuthenticationServiceService) {
      // need to check if my loggedUser isnt empty
  }

  async ngOnInit(): Promise<any>{
    await this.readUser();
    await this.readTours();
  }


  async readUser(): Promise<any>{
    this.authService.getLogged().subscribe(auth =>{
      if (auth){
        this.userService.getUser(auth.email).subscribe(user => {
          this.userData = user;
        });
        this.cartItemService.getUsersCart(auth.email).subscribe(cartItems =>{
          this.participantSum = 0;
          const cartItemsData = Object.values(cartItems);
          console.log(cartItemsData);
          cartItemsData.forEach((tour: any) => {
            this.participantSum += tour.count;
          });
        });
      }else{
        this.userData = null;
      }
    });
  }

  deleteTour(tour: ITour): void{
    if (this.userData != null){
      if (!this.userData.roles.admin){
        alert('You don\'t have permission to delete tours!');
        return;
      }
    }else return;
    this.tourService.deleteTour(tour.name);
    this.cartItemService.deleteItemFromAllUsersCarts(tour.name);
  }

  async readTours(): Promise<any>{
    await this.tourService.getData().snapshotChanges().pipe(
      map(changes => changes.map(c => ({key : c.payload.key, ...c.payload.val()})))
    ).subscribe(tours =>{
      this.recievedTours = tours;
      this.constructorAfterRecievingTours();
    });
  }

  constructorAfterRecievingTours(): void{
    this.recievedTours.forEach(tour =>{
      tour.start_date = new Date(tour.start_date);
      tour.end_date = new Date(tour.end_date);
    });
    this.setMinAndMaxPrice();
  }

  participantsEdited(event: any): void{
    this.participantSum += event;
  }


  printTours(): void{
    console.log(this.recievedTours);
  }

  setMinAndMaxPrice(): void{
    const copy = [...this.recievedTours];
    if (copy.length != 0){
      this.minPrice = copy.sort((a, b) => a.price - b.price)[0].price;
      this.maxPrice = copy.sort((a, b) => a.price - b.price)[copy.length - 1].price;
    }
    else{
      this.minPrice = 0;
      this.maxPrice = 0;
    }
  }

  recievedDestinations(event: any): void{
    this.filterDestinations = event;
  }

  recievedRate(event: any): void{
    this.filterRate = event;
  }

  recievedMaxPrice(event: any): void{
    this.filterMaxPrice = event;
  }

  recievedMinPrice(event: any): void{
    this.filterMinPrice = event;
  }

  recievedBeginDate(event: any): void{
    this.filterBeginDate = new Date(event);
  }

  recievedEndDate(event: any): void{
    this.filterEndDate = new Date(event);
  }

  filterValidation(tour: ITour, index: number): boolean{
    if (this.filterDestinations.length !== 0 && !this.filterDestinations.includes(tour.country)){
      return false;
    }
    if (this.filterMaxPrice !== -1 && tour.price > this.filterMaxPrice){
      return false;
    }
    if (this.filterMinPrice !== -1 && tour.price < this.filterMinPrice){
      return false;
    }
    if (this.filterRate.length !== 0 && !this.filterRate.includes(tour.rate)){
      return false;
    }
    if (this.filterBeginDate.getTime() !== this.defaultDate.getTime() && this.filterBeginDate.getTime() > tour.start_date.getTime()){
      return false;
    }
    if (this.filterEndDate.getTime() !== this.defaultDate.getTime() && this.filterEndDate.getTime() < tour.end_date.getTime()){
      return false;
    }
    if (this.userData != null){
      if (this.userData.roles.admin || this.userData.roles.editor) return true;
      else if (this.userData.roles.vip){
        if (tour.start_date.getTime() < new Date().getTime()) return false;
        else return true;
      }else if (this.userData.roles.user){
        if (tour.start_date.getTime() < new Date().getTime() || tour.reserved >= tour.capacity) return false;
        else return true;
      }else return false;
    }
    return false;
  }

  toursStyle(tour: any, index: number): any{
    var result = new Array();
    if (tour.price === this.minPrice){
      result.push('minTour');
    }
    if (tour.price === this.maxPrice){
      result.push('maxTour');
    }
    return result.length === 0 ? null : result;
  }

}
