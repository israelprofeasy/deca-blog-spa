import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { data } from 'jquery';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { AddressModel } from '../../../_models/addressModel';
import { ApiResponse } from '../../../_models/apiResponseModels/apiResponse';
import { UserModel } from '../../../_models/userModel';
import { UserService } from '../../../_services/_user_service/user.service';



declare let alertify: any;
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{
  showIcon: boolean = false;
  icon: boolean = false;
  shortLink: string = "";
  uploadingPhoto: boolean = false;
  change: boolean = false;
  imageURL: any;
  file: File = null;
  genders = ["Female", "Male"];
  errors = {};
  user: UserModel;
  userPhoto: string;
  isEditMode: boolean = false;
  address: AddressModel;
  updateForm: FormGroup;
  formSubmitted: boolean;
  formControls: any;
  loadingInfo: boolean;
  loadingError: boolean;
 
  constructor(private userService: UserService, fb: FormBuilder){
    this.updateForm = fb.group(
      {
        firstname: ['', [Validators.required, Validators.minLength(3)]],
        lastname: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        stack: [''],
        squad: [''],
        phoneNumber: [''],
        gender: ['', [Validators.required]]
      }
    );
    this.updateForm.disable();
    this.formControls = this.updateForm.controls;
  }
 
  ngOnInit(): void {
     this.getUserInfo(this.userService.User.Id);
  }

  

 toggleIcon(): void{
  this.showIcon = !this.showIcon;
}

  removeImage(event){
    alertify.confirm("Click OK to remove photo.",
      ()=>{
        this.userService.removePhoto(this.userService.User.Id).subscribe(
          (data) => {
            alertify.success(data.Message)
          },
          (error) =>{
            alertify.error(error.error.Message);
          }
        );
      },
      function(){
      });
    
   }

  onChange(event){
    this.uploadingPhoto = !this.uploadingPhoto;
    this.userService.upload(this.userService.User.Id, event.target.files[0]).subscribe(
      (data) => {
        alertify.success(data.Message)
      },
      (error) =>{
        alertify.error(error.error.Message);
      }
    );
  }

  acivateClick(el: HTMLInputElement){
    el.click();
  }

  getUserInfo(userId: string){
    this.loadingError = false;
    this.loadingInfo = true;
    this.userService.getUser(userId).subscribe(
      (data: ApiResponse<UserModel>) => {
        this.address = data.Data.Address
        this.userPhoto = data.Data.PhotoUrl;
        this.updateForm.patchValue({
          email: data.Data.Email,
          firstname: data.Data.FirstName,
          lastname: data.Data.LastName,
          phoneNumber: data.Data.PhoneNumber,
          photo: data.Data.PhotoUrl,
          stack: data.Data.Stack,
          squad: data.Data.Squad,
          gender: data.Data.Gender
        });
        this.loadingInfo = false;
      },
      error => {
        this.loadingInfo = false;
        this.loadingError = true;
      }
    )
  }

  toggleEditMode(): void{
    this.isEditMode = !this.isEditMode;
    if(this.isEditMode){
      this.formControls['firstname'].enable();
      this.formControls['lastname'].enable();
      this.formControls['phoneNumber'].enable();
      this.formControls['gender'].enable();
    }else{
      this.updateForm.disable();
    }
  }

  updateUserInformation(){
    this.formSubmitted = true;
    if(!this.updateForm.valid){
      return;
    }
    this.userService.updateUser(this.updateForm.value, this.userService.User.Id).subscribe(
      (data) => {
          alertify.success('Profile successsfully updated.'); 
          this.updateForm.disable();
          this.isEditMode = false;
        },
        error => {
          alertify.error('Profile update failed'); 
        }
    )
  }
    reloadCurrentPage(){
      this.getUserInfo(this.userService.User.Id);
      alertify.success('Reloading, please wait.'); 
    }

  }

