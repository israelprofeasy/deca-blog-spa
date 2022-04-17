import { ERROR_COMPONENT_TYPE } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../_services/_user_service/user.service';
declare let  alertify : any

@Component({
  selector: 'app-invite-user',
  templateUrl: './invite-user.component.html',
  styleUrls: ['./invite-user.component.css']
})
export class InviteUserComponent implements OnInit {
  inviteForm: FormGroup;
  formControls: any;
  formSubmitted: boolean = false;
  loading = false;
  constructor(private fb: FormBuilder, private userService: UserService) {
    this.inviteForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
    this.formControls = this.inviteForm.controls;
  }

  ngOnInit(): void {
  }

  inviteUser(){
    this.formSubmitted = true;
    if(this.inviteForm.invalid){
      return;
    }
    this.loading = true;
    let email = this.formControls['email'].value;
    this.userService.inviteUser(email).subscribe(
      (data: any) =>{
        this.inviteForm.reset();
        this.formSubmitted = false;
        alertify.success(email+ " has been invited!!!");
        this.loading = false;
      },
      (error) =>{
        console.log(error)
        var errMessage = error.error.Message;
        this.loading = false;
        alertify.error(errMessage)
      }
    )
  }
}