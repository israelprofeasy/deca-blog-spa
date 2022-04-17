import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';
import * as bootstrap from "bootstrap";
import { IStack } from '../../../_models/stack';
import { ISquad } from '../../../_models/squad';
import { Router } from '@angular/router';
import { UserService } from '../../../_services/_user_service/user.service';
import { UtilsService } from '../../../_services/_utils_service/utils.service';
import { ModalService } from '../../../_services/modal.service';
import { CustomValidators } from '../../../_helpers/customValidators'
import { IStackAndSquad } from '../../../_models/apiResponseModels/StackAndSquad'
import { ApiResponse } from '../../../_models/apiResponseModels/apiResponse';
declare let  alertify : any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  stacks: IStack[] = [];
  squads: ISquad[] = [];
  genders = ["Male", "Female"];
  confirmEmail!: string;
  signupForm: FormGroup;
  wasValidated: boolean = false;
  errors = {};
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private utilsService: UtilsService,
    private modalService: ModalService,
    private router: Router
    ) {
      this.signupForm = this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(3)]],
        lastName: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required]],
        phoneNumber: [''],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
        gender: ['Male', [Validators.required]],
        stackId: ['', [Validators.required, Validators.minLength(36), Validators.maxLength(36)]],
        squadId: ['', [Validators.required, Validators.minLength(36), Validators.maxLength(36)]],
      },
      {
        validators: [CustomValidators.mustMatch('password', 'confirmPassword'), CustomValidators.decadevCheck('email')]
      });
    }

  ngOnInit(): void {
    this.utilsService.getStacksAndSquads().subscribe(
      (values: ApiResponse<IStackAndSquad>) =>{;
        this.stacks = values.Data.stack;
        this.squads = values.Data.squad;
        this.patchForm();
      },
      (err: any) => {
      }
    );
  }

  get f(){
    return this.signupForm.controls;
  }
  get email(){
    return this.signupForm.get('email');
  }

  patchForm(){
    this.signupForm.patchValue({
      stackId: this.stacks[0].Id,
      squadId: this.squads[0].Id
    });
  }
  numbersOnly(event){
    return (event.charCode !=8 && event.charCode == 0||(event.charCode>=48 && event.charCode<=57));
  }

  onSubmit(){
    if(!this.signupForm.valid){
      this.wasValidated = true;
      return false;
    }    
    this.errors = {};

    this.loading = true;
    const signupObserver = {
      next: (response: ApiResponse<string>) => {
        this.loading = false; 
        this.openCheckEmailModal();
      },
      error: (err: any) => {
        for(let m of err.error.Errors){
          this.errors[m.Key] = m.ErrorMessages;
        }
        alertify.error(err.error.Message);
        this.loading = false; 
      }
    }    
    this.userService.signup(this.signupForm).subscribe(signupObserver);
    return false;
  }

  toggleShowPassword(inputId: string, btnId: string) {
    let input: HTMLInputElement = document.getElementById(inputId) as HTMLInputElement;
    let btn = document.getElementById(btnId);
    let icon = btn.firstChild as HTMLSpanElement;
    if (input.type === "password") {
      input.type = "text";
      icon.attributes['data-icon'].value = 'ant-design:eye-filled'
    } else {
      input.type = "password";
      icon.attributes['data-icon'].value = 'ant-design:eye-invisible-filled'
    }
  };

  openCheckEmailModal(){
    this.confirmEmail = this.signupForm.get('email')?.value;
    jQuery("#registerModal").modal('hide');
    this.signupForm.reset();
    jQuery("#checkEmailModal").modal('show');    
  }
  closeModal(){
    jQuery("#checkEmailModal").modal('hide');
    jQuery("#registerModal").modal('hide');
    jQuery('body').removeClass('modal-open');
    jQuery('.modal-backdrop').remove();
  }

  clearForm(){
    this.signupForm.reset();
    this.signupForm.markAsPristine();
    this.signupForm.markAsUntouched();
  }

  gotoLogin(){
    jQuery("#registerModal").modal('hide');
    this.modalService.open('login');
  }
}
