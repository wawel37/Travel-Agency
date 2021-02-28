import { User } from './../IUser';
import { UserDataHandlerService } from './../user-data-handler.service';
import { AuthenticationServiceService } from './../authentication-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Roles } from '../IRoles';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent{

  usersData?: User[] | null;
  modelForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
      private authService: AuthenticationServiceService,
      private router: Router,
      private userDataHandler: UserDataHandlerService) {
    this.modelForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.pattern('[0-9a-zA-Z]{6,}')]],
      firstname: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      lastname: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      city: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]]
    });

    this.userDataHandler.getData().snapshotChanges().pipe(
      map(changes => changes.map(c => ({key : c.payload.key, ...c.payload.val()})))
    ).subscribe(users =>{
      this.usersData = users;
      console.log(this.usersData);
    });
  }

  submitForm(modelForm: FormGroup): void{
    if(this.validation(modelForm)){
      this.authService.signUp(modelForm.value.email, this.modelForm.value.password)
      .then(res => {
        let roles: Roles = {
          user: true,
          vip: false,
          editor: false,
          admin: false
        }
        let user: User = {
          email: modelForm.value.email,
          firstname: modelForm.value.firstname,
          lastname: modelForm.value.lastname,
          city: modelForm.value.city,
          roles: roles
        }
        this.userDataHandler.addUser(user);
        this.router.navigate(['']);
        alert('Sign up successfully!');
      })
      .catch(error =>{
        alert(error.message);
      });
    }else{
      console.log("Unsuccessful sign up");
    }
  }

  validation(modelForm: FormGroup): boolean{
    let result = true;
    Object.keys(modelForm.controls).forEach(key => {
      if(!modelForm.controls[key].valid){
        result = false;
        alert(key.toUpperCase() + " isn't valid");
      }
    });
    if (this.usersData != null){
      this.usersData?.forEach(user => {
        if(user.email === this.userDataHandler.adjustEmailToKey(modelForm.value['email'])){
          result = false;
          alert('User with this email already exists');
        }
      });
    }else{
      result = false;
    }

    return result;
  }


}
