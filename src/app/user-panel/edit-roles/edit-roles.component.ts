import { User } from './../../IUser';
import { UserDataHandlerService } from './../../user-data-handler.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-edit-roles',
  templateUrl: './edit-roles.component.html',
  styleUrls: ['./edit-roles.component.css']
})
export class EditRolesComponent{

  userDataList?: any[];
  rolesKeys = ['']

  constructor(private userService: UserDataHandlerService) {
    this.userService.getData().snapshotChanges().pipe(
      map(changes => changes.map(c => ({key : c.payload.key, ...c.payload.val()})))
    ).subscribe(users => {
      this.userDataList = users;
      this.userDataList.forEach(user => {
        user.rolesValues = Object.values(user.roles);
        user.rolesKeys = Object.keys(user.roles);
      })
    })
  }

  checkValueChanged(event: any, user: User, role: string): void{
    console.log(event.checked);
    console.log(user.email);
    const rolesToSend: any = user.roles;
    rolesToSend[role] = event.checked;
    const toSend = {roles: rolesToSend};
    this.userService.updateUser(user.email, toSend);
  }

}
