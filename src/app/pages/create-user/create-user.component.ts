import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateUserModel } from '../../models/createUser';
import { MasterServiceService } from '../../services/master-service.service';
import { CreatedUserSuccessResponseModel } from '../../models/createdUserSuccessResponse';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {
  createUserForm: FormGroup = new FormGroup({});
  createUserObj: CreateUserModel = new CreateUserModel();
  masterService = inject(MasterServiceService);
  router = inject(Router);
  constructor(){
this.createForm();
  }
  createForm(){
    this.createUserForm = new FormGroup({
      email: new FormControl(this.createUserObj.email),
      password: new FormControl(this.createUserObj.password),
     
    })
  }
  onSave(){
    
    this.createUserObj = this.createUserForm.value;
    
    try {
      
      // Make the API call and handle success and error scenarios
      this.masterService.createUser(this.createUserObj).subscribe({
        next: (res: CreatedUserSuccessResponseModel) => {
          console.log(res);
          alert("new token generated: "+res.token);
          
        },
        error: (err) => {
          console.log(err);
          alert(err.error.error);
          // You can show an error message to the user here
        }
      });
    } catch (error) {
      console.error('Caught error:', error);
      // Additional error handling for any synchronous issues
    }
  }
}
