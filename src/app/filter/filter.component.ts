import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import { ITour } from '../ITours';
import { TourdatahandlerService } from '../tourdatahandler.service';



@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})





export class FilterComponent implements OnInit, OnChanges{
  @Input() minPrice = 0;
  @Input() maxPrice = 0;
  @Input() myTours: ITour[] = [];
  rates = ['★', '★★', '★★★', '★★★★', '★★★★★'];
  destinations = new Array();
  markedDestinations: string[] = [];
  markedRates: number[] = [];
  markedMaxPrice = 0;
  markedMinPrice = 0;
  markedRate = 1;
  markedBeginDate = new Date();
  markedEndDate = new Date(2100, 12, 1);
  todayDate = new Date();
  @Output() newRate = new EventEmitter<number[]>();
  @Output() newDestinations = new EventEmitter<string[]>();
  @Output() newMaxPrice = new EventEmitter<number>();
  @Output() newMinPrice = new EventEmitter<number>();
  @Output() newBeginDate = new EventEmitter<Date>();
  @Output() newEndDate = new EventEmitter<Date>();


  constructor(private tourService: TourdatahandlerService) {
    
  }

  ngOnInit(): void {
    // check if our tours are loaded already
    if (this.myTours === undefined) return;
    for (let tour of this.myTours){
      if (!this.destinations.includes(tour.country)){
        this.destinations.push(tour.country);
      }
    }
    
  }

  ngOnChanges(changes: SimpleChanges): void{
    //Checking if some tour was deleted or not
    if(this.markedMaxPrice > this.maxPrice || this.markedMaxPrice == 0){
      this.markedMaxPrice = this.maxPrice;
    }
    if(this.markedMinPrice < this.minPrice){
      this.markedMinPrice = this.minPrice;
    }
    //Checking if our tours are loaded already
    if (this.myTours === undefined) return;
    this.destinations = [];
    for (let tour of this.myTours){
      if (!this.destinations.includes(tour.country)){
        this.destinations.push(tour.country);
      }
    }
    this.newDestinations.emit(this.destinations);
  }


  changedDestinations(event: any): void{
    if (event.target.checked){
      this.markedDestinations.push(event.target.name);
    }else{
      this.removeDestination(event.target.name);
    }
    this.newDestinations.emit(this.markedDestinations);
  }

  valueForMaxPriceSlider(): number{
    if (this.markedMaxPrice != 0 && this.markedMaxPrice != this.maxPrice){
      return this.markedMaxPrice;
    }else return this.maxPrice;
  }

  changedMinPrice(event: any): void{
    this.markedMinPrice = parseInt(event.value, 10);
    this.newMinPrice.emit(this.markedMinPrice);
  }

  changedMaxPrice(event: any): void{
    this.markedMaxPrice = parseInt(event.value, 10);
    this.newMaxPrice.emit(this.markedMaxPrice);
  }

  changedRate(event: any): void{
    if (event.target.checked){
      this.markedRates.push(parseInt(event.target.name));
    }else{
      this.removeRate(parseInt(event.target.name));
    }
    this.newRate.emit(this.markedRates);
  }

  changedBeginDate(event: any): void{
    console.log(event.target.value);
    this.markedBeginDate = event.target.value;
    this.newBeginDate.emit(this.markedBeginDate);
  }

  changedEndDate(event: any): void{
    this.markedEndDate = event.target.value;
    this.newEndDate.emit(this.markedEndDate);
  }


  removeDestination(destination: string): void{
    for (let i = 0; i < this.markedDestinations.length; i++){
      if (this.markedDestinations[i] === destination){
        this.markedDestinations.splice(i, 1);
      }
    }
  }

  removeRate(rate: number): void{
    for (let i = 0; i < this.markedRates.length; i++){
      if (this.markedRates[i] === rate){
        this.markedRates.splice(i, 1);
      }
    }
  }
}
