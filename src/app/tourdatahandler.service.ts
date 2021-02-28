import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ITour } from './ITours';

@Injectable({
  providedIn: 'root'
})
export class TourdatahandlerService {

  private tourCollectionName = 'tours';
  private client: AngularFireList<ITour>;

  constructor(private db: AngularFireDatabase) {
    this.client = db.list(this.tourCollectionName);
  }

  getData(): AngularFireList<any>{
    return this.client;
  }

  deleteTour(key: string): void{
    this.client.remove(key);
  }

  addTour(tour: ITour): void{
    this.client.set(tour.name, {...tour});
  }

  updateTour(key: string, value: any): void{
    this.client.update(key,value);
  }

  getTour(key: string): Observable<any>{
    let tempClient: AngularFireObject<ITour> = this.db.object(this.tourCollectionName + '/'+ key);
    return tempClient.snapshotChanges().pipe(map(changes => ({ key: changes.payload.key, ...changes.payload.val() })));
  }

  changeName(from: string, to: string): void{
    let query = this.client.query.ref.orderByKey();
    query.once('value')
    .then(snapshot => {

    });
  }
}
