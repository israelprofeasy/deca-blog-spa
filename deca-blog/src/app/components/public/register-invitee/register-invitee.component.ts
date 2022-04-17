import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomValidators } from '../../../_helpers/customValidators';
import { ApiResponse } from '../../../_models/apiResponseModels/apiResponse';
import { IStackAndSquad } from '../../../_models/apiResponseModels/StackAndSquad';
import { ISquad } from '../../../_models/squad';
import { IStack } from '../../../_models/stack';
import { UserService } from '../../../_services/_user_service/user.service';
import { UtilsService } from '../../../_services/_utils_service/utils.service';
declare let  alertify : any;

@Component({
  selector: 'app-register-invitee',
  templateUrl: './register-invitee.component.html',
  styleUrls: ['./register-invitee.component.css']
})
export class RegisterInviteeComponent implements OnInit {
  stacks: IStack[] = [];
  squads: ISquad[] = [];
  genders = ["Male", "Female"];
  confirmEmail!: string;
  registerForm: FormGroup;
  wasValidated: boolean = false;
  errors = {};
  registered: boolean = false;
  urlParams: any = {};
  loading: boolean = false;
  
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private utilsService: UtilsService,
    private route: ActivatedRoute
    ) {
      this.registerForm = this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(3)]],
        lastName: ['', [Validators.required, Validators.minLength(3)]],
        email: [{value: '', disabled: true}, [Validators.required]],
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
      this.urlParams.inviteToken = this.route.snapshot.queryParamMap.get('inviteToken');
      this.urlParams.email = this.route.snapshot.queryParamMap.get('email');

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
      return this.registerForm.controls;
    }
    get email(){
      return this.registerForm.get('email');
    }
  
    patchForm(){
      this.registerForm.patchValue({
        stackId: this.stacks[0].Id,
        squadId: this.squads[0].Id,
        email: this.urlParams.email        
      });
    }
    numbersOnly(event){
      return (event.charCode !=8 && event.charCode == 0||(event.charCode>=48 && event.charCode<=57));
    }
  
    onSubmit(){
      if(!this.registerForm.valid){
        this.wasValidated = true;
        return false;
      }    
      this.errors = {};
      this.loading = true;
      const signupObserver = {
        next: (response: ApiResponse<string>) => {
          this.registered = true;
          this.loading = false;
          this.clearForm();
        },
        error: (err: any) => {
          console.log(err);
          for(let m of err.error.Errors){
            this.errors[m.Key] = m.ErrorMessages;
          }
          alertify.error(err.error.Message);
          this.loading = false;
        }
      }    
      this.userService.addInvitee(this.registerForm, this.urlParams.inviteToken).subscribe(signupObserver);
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

    clearForm(){
      this.registerForm.reset();
      this.registerForm.markAsPristine();
      this.registerForm.markAsUntouched();
    }  
}
