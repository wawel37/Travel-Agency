import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormComponent } from './form/form.component';
import { FilterComponent } from './filter/filter.component';
import { CartComponent } from './cart/cart.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from'../environments/environment';
import { TourListComponent } from './tours/tour-list/tour-list.component';
import { TourDetailsComponent } from './tours/tour-details/tour-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RatingComponent } from './rating/rating.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlider, MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { CartResolverService } from './cart-resolver.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { PersistenceComponent } from './user-panel/persistence/persistence.component';
import { EditToursComponent } from './user-panel/edit-tours/edit-tours.component';
import { EditToursDetailsComponent } from './user-panel/edit-tours/edit-tours-details/edit-tours-details.component';
import { EditRolesComponent } from './user-panel/edit-roles/edit-roles.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    FilterComponent,
    CartComponent,
    TourListComponent,
    TourDetailsComponent,
    RatingComponent,
    LoginComponent,
    SignUpComponent,
    UserPanelComponent,
    PersistenceComponent,
    EditToursComponent,
    EditToursDetailsComponent,
    EditRolesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSliderModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
