import { EditRolesComponent } from './user-panel/edit-roles/edit-roles.component';
import { EditToursDetailsComponent } from './user-panel/edit-tours/edit-tours-details/edit-tours-details.component';
import { EditToursComponent } from './user-panel/edit-tours/edit-tours.component';
import { EditorGuard } from './guard/editor.guard';
import { AdminAuthGuard } from './guard/admin-auth.guard';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { AuthGuard } from './guard/auth.guard';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TourListComponent } from './tours/tour-list/tour-list.component';
import { FormComponent } from './form/form.component';
import { CartComponent } from './cart/cart.component';
import { CartResolverService } from './cart-resolver.service';
import { TourDetailsComponent } from './tours/tour-details/tour-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'tours', pathMatch: 'full'},
  { path: 'tours', component: TourListComponent},
  { path: 'form', component: FormComponent, canActivate: [AuthGuard, EditorGuard]},
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard]},
  { path: 'tourdetails/:id', component: TourDetailsComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignUpComponent},
  { path: 'userPanel', component: UserPanelComponent, canActivate: [AuthGuard]},
  { path: 'editTours', component: EditToursComponent, canActivate: [AuthGuard, EditorGuard]},
  { path: 'editTours/editToursDetails/:id', component: EditToursDetailsComponent, canActivate: [AuthGuard, EditorGuard]},
  { path: 'editRoles', component: EditRolesComponent, canActivate: [AuthGuard, AdminAuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
