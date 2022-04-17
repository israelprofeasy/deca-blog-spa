import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from 'src/app/_helpers/customValidators';
import { IResponse } from 'src/app/_models/apiResponseModels/Response';
import { AuthService } from 'src/app/_services/_auth_service/auth.service';
declare let  alertify : any

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  passwordForm: FormGroup;
  oldhide:boolean = true;
  newhide:boolean = true;
  confirmhide:boolean = true;
  loading:boolean = false;
  isFormSubmitted: boolean;
  cursor:boolean = true;
  errorMessage:string;
  constructor(fb:FormBuilder, private authService:AuthService, private router: Router) { 
    this.passwordForm = fb.group({
      currentPassword:['',Validators.required],
      newPassword:['',[Validators.required, Validators.pattern('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!@#$%^&*_+-.*\s).{8,15}$')]],
      confirmPassword:['',Validators.required]},
      {
        validators: [CustomValidators.mustMatch('newPassword', 'confirmPassword'), CustomValidators.mustNotMatch('currentPassword','newPassword')]
      });
  }

  ngOnInit(): void {
  }
  changePassword(){
    this.isFormSubmitted = true;
    if(this.passwordForm.invalid)
      return;

    this.loading = true;
    this.authService.changePassword(this.passwordForm.value).subscribe(
      (data:IResponse<string>)=> {
        alertify.success(data.Data)
        this.isFormSubmitted= false;
        this.loading = false;
        this.router.navigate(['/account','profile']);
      },
      (errors)=>{
      alertify.error(errors.error.Message);
      this.loading = false;
    })
  }
}
