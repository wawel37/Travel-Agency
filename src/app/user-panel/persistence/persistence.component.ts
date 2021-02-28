import { Component, OnInit } from '@angular/core';
import { AuthenticationServiceService } from 'src/app/authentication-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-persistence',
  templateUrl: './persistence.component.html',
  styleUrls: ['./persistence.component.css']
})
export class PersistenceComponent {

  modelForm: FormGroup;

  constructor(private authService: AuthenticationServiceService, private formBuilder: FormBuilder) {
    this.modelForm = this.formBuilder.group({
      persistence: ['', [Validators.required]]
    });
  }

  submitForm(modelForm: FormGroup): void{
    if (this.validation(modelForm)){
      console.log(modelForm.value.persistence);
      this.authService.changePersistance(modelForm.value.persistence);
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
