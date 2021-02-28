import { ITour } from './../ITours';
import { TourdatahandlerService } from './../tourdatahandler.service';
import { Component, Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tours } from '../tours';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  todayDate = new Date();
  @Output() newTour = new EventEmitter<any>();
  tours!: ITour[];
  fields: string[];
  modelForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private tourService: TourdatahandlerService) {

    this.fields = Object.keys(tours[0]);
    const index = this.fields.indexOf('rate', 0);
    if(index > -1){
      this.fields.splice(index, 1);
    }
    this.modelForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      country: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('^[1-9][0-9]*')]],
      capacity: ['', [Validators.required, Validators.pattern('^[1-9][0-9]*')]],
      description: ['', Validators.required],
      img_link: ['', Validators.required]
    });


    this.tourService.getData().snapshotChanges().pipe(
      map(changes => changes.map(c => ({key : c.payload.key, ...c.payload.val()})))
    ).subscribe(tours =>{
      this.tours = tours;
    });
  }


  submitForm(modelForm: FormGroup): void{
    /* VALIDATION */
    let isAlreadyInBase = false;

    for (let field of this.fields){
      console.log(field);
      if (!modelForm.controls[field].valid){
        alert('Wrong ' + field + ', please insert correct data');
        return;
      }
    }

    if (!(new Date(modelForm.value['start_date']) <= new Date(modelForm.value['end_date']))){
      alert('Start date is greater than End Date, insert correct data');
      return;
    }

    this.tours.forEach(tour => {
      if (tour.name === modelForm.value['name']){
        isAlreadyInBase = true;
      }
    });

    if (isAlreadyInBase){
      alert('Tour with this name already exists in base!');
      return;
    }


    const startDate = new Date(modelForm.value.start_date);
    const endDate = new Date(modelForm.value.end_date);
    const toSendStartDate: string = startDate.getFullYear() + '-' + (startDate.getMonth()+1) + '-' + startDate.getDate();
    const toSendEndDate: string = endDate.getFullYear() + '-' + (endDate.getMonth()+1) + '-' + endDate.getDate();


    const toSend: any = {
      name: modelForm.value['name'],
      country: modelForm.value['country'],
      start_date: toSendStartDate,
      end_date: toSendEndDate,
      price: modelForm.value['price'],
      capacity: modelForm.value['capacity'],
      description: modelForm.value['description'],
      rate: 0,
      img_link: modelForm.value['img_link'],
      reserved: 0,
      userRated: 0
    }
    console.log('moja data to: ' + toSend.start_date);
    this.tourService.addTour(toSend);
    alert('Successfully added tour' + toSend.name);
  }

  nameValidation(modelForm: FormGroup): boolean{
    return modelForm.controls['name'].touched && !modelForm.controls['name'].valid;
  }

  countryValidation(modelForm: FormGroup): boolean{
    return modelForm.controls['country'].touched && !modelForm.controls['country'].valid;
  }

  startDateValidation(modelForm: FormGroup): boolean{
    return modelForm.controls['start_date'].touched && !modelForm.controls['start_date'].valid;
  }

  endDateValidation(modelForm: FormGroup): boolean{
    return modelForm.controls['end_date'].touched && !modelForm.controls['end_date'].valid;
  }

  priceValidation(modelForm: FormGroup): boolean{
    return modelForm.controls['price'].touched && !modelForm.controls['price'].valid;
  }

  capacityValidation(modelForm: FormGroup): boolean{
    return modelForm.controls['capacity'].touched && !modelForm.controls['capacity'].valid;
  }

  descriptionValidation(modelForm: FormGroup): boolean{
    return modelForm.controls['description'].touched && !modelForm.controls['description'].valid;
  }

  imgLinkValidation(modelForm: FormGroup): boolean{
    return modelForm.controls['img_link'].touched && !modelForm.controls['img_link'].valid;
  }
}
