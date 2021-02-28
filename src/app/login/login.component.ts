import { AuthenticationServiceService } from './../authentication-service.service';
import { Component, OnInit } from '@angular/core';
import { TourdatahandlerService } from './../tourdatahandler.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{


  modelForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private authService: AuthenticationServiceService, private route: ActivatedRoute, private router: Router) {
    this.modelForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.pattern('[0-9a-zA-Z]{6,}')]]
    });
  }

  submitForm(modelForm: FormGroup): void{
    if(this.validation(modelForm)){
      this.authService.logIn(modelForm.value.email, this.modelForm.value.password)
      .then(res => {
        this.router.navigate(['tours']);
        alert('Logged in!');
      }).catch(error => {
        alert(error.message);
      });

    }else{
      console.log("Unsuccessful log in");
    }
  }

  validation(modelForm: FormGroup): boolean{
    let result = true;
    Object.keys(modelForm.controls).forEach(key => {
      if(!modelForm.controls[key].valid){
        result = result && false;
        alert(key.toUpperCase() + " isn't valid");
      }
    });
    return result;
  }

}
