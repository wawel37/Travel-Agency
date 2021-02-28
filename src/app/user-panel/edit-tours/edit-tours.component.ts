import { CartItemServiceService } from 'src/app/cart-item-service.service';
import { ITour } from './../../ITours';
import { TourdatahandlerService } from './../../tourdatahandler.service';
import { UserDataHandlerService } from './../../user-data-handler.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { User } from 'src/app/IUser';

@Component({
  selector: 'app-edit-tours',
  templateUrl: './edit-tours.component.html',
  styleUrls: ['./edit-tours.component.css']
})
export class EditToursComponent{

  toursList?: ITour[] | null;
  userData: User;


  constructor(private tourService: TourdatahandlerService,
    private userServcie: UserDataHandlerService,
    private cartItemsService: CartItemServiceService) {

    this.tourService.getData().snapshotChanges().pipe(
      map(changes => changes.map(c => ({key : c.payload.key, ...c.payload.val()})))
    ).subscribe(tours =>{
      this.toursList = tours;
    });

    this.userData = JSON.parse(localStorage.getItem('loggedUser')!);

  }

  deleteTour(tour: ITour): void{
    if(!this.userData.roles.admin){
      alert('You don\'t have permission to do that');
      return;
    }
    this.tourService.deleteTour(tour.name);
    this.cartItemsService.deleteItemFromAllUsersCarts(tour.name);
  }

}
