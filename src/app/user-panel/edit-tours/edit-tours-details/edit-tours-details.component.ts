import { CartItemServiceService } from './../../../cart-item-service.service';
import { ITour } from './../../../ITours';
import { TourdatahandlerService } from './../../../tourdatahandler.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-tours-details',
  templateUrl: './edit-tours-details.component.html',
  styleUrls: ['./edit-tours-details.component.css']
})
export class EditToursDetailsComponent implements OnInit {

  tourKey!: string;
  tourData?: ITour | null;
  tourKeys?: string[] | null;
  modelForm: FormGroup;
  constructor(private route: ActivatedRoute,
    private tourService: TourdatahandlerService,
    private FormBuilder: FormBuilder,
    private cartItemsService: CartItemServiceService) {
    this.modelForm = this.FormBuilder.group({
      capacity: ['', [Validators.required, Validators.pattern('^[1-9][0-9]*')]],
      country: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      description: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      end_date: ['', [Validators.required]],
      img_link: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.pattern('^[0-9][0-9]*')]],
      rate: ['', [Validators.required, Validators.pattern('^[0-5]*')]],
      reserved: ['', [Validators.required, Validators.pattern('^[0-9][0-9]*')]],
      start_date: ['', [Validators.required]],
      userRated: ['', [Validators.required, Validators.pattern('^[0-9][0-9]*')]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.tourKey = param.id;
      this.tourService.getTour(this.tourKey).subscribe(tour => {
        this.tourData = tour;
        this.tourKeys = Object.keys(tour);
        console.log(this.tourKeys);
        this.updateFormValues(tour);
      });
    });
  }

  updateFormValues(tour: ITour): void{
    console.log(tour.name);
    this.modelForm.patchValue({
      capacity: tour.capacity,
      country: tour.country,
      description: tour.description,
      end_date: tour.end_date,
      img_link: tour.img_link,
      price: tour.price,
      rate: tour.rate,
      reserved: tour.reserved,
      start_date: tour.start_date,
      userRated: tour.userRated
    });
  }

  submitForm(modelForm: FormGroup, key: string): void{
    if(modelForm.controls[key].valid && this.tourData != null){
      const toSend: {[k: string]: any} = {};
      toSend[key] = modelForm.value[key];
      console.log(toSend);
      this.tourService.updateTour(this.tourData.name, toSend);
      if (key === 'price'){
        this.cartItemsService.updateCartItemsForAllUsers(this.tourData.name, toSend);
      }
    }
  }

}
