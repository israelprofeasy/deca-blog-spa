import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AddressModel } from '../../../_models/addressModel';
import { ApiResponse } from '../../../_models/apiResponseModels/apiResponse';
import { UserModel } from '../../../_models/userModel';
import { UserService } from '../../../_services/_user_service/user.service';



declare let alertify: any;
@Component({
  selector: 'app-user-profile-view',
  templateUrl: './user-profile-view.component.html',
  styleUrls: ['./user-profile-view.component.css']
})
export class UserProfileViewComponent implements OnInit{
  genders = ["Female", "Male"];
  errors = {};
  user: UserModel;
  userPhoto: string;
  isEditMode: boolean = false;
  address: AddressModel;
  updateForm: FormGroup;
  formSubmitted: boolean;
  isActive: boolean;
  firstName: string;
  loadingInfo: boolean;
  loadingError: boolean;
  userId: string;
  constructor(private userService: UserService, fb: FormBuilder, private route: ActivatedRoute){
    this.updateForm = fb.group(
      {
        firstname: ['', [Validators.required, Validators.minLength(3)]],
        lastname: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        stack: [''],
        squad: [''],
        phoneNumber: [''],
        gender: ['', [Validators.required]],
        street: [''],
        state: [''],
        country: [''],
        active: ['']
      }
    );
    this.updateForm.disable();
  }
 
  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id']
     this.getUserInfo(this.userId);
  }

  getUserInfo(userId: string){
    this.loadingError = false;
    this.loadingInfo = true;
    this.userService.getUser(userId).subscribe(
      (data: ApiResponse<UserModel>) => {
        this.address = data.Data.Address
        this.userPhoto = data.Data.PhotoUrl;
        this.isActive = data.Data.IsActive;
        this.firstName = data.Data.FirstName;
        this.updateForm.patchValue({
          email: data.Data.Email,
          firstname: data.Data.FirstName,
          lastname: data.Data.LastName,
          phoneNumber: data.Data.PhoneNumber,
          photo: data.Data.PhotoUrl,
          stack: data.Data.Stack,
          squad: data.Data.Squad,
          gender: data.Data.Gender,
          street: data.Data.Address.Street,
          state: data.Data.Address.State,
          country: data.Data.Address.Country
        });
        this.loadingInfo = false;
      },
      error => {
        this.loadingInfo = false;
        this.loadingError = true;
      }
    )
  }

    reloadCurrentPage(){
      this.getUserInfo(this.userId);
      alertify.success('Reloading, please wait.'); 
    }

    deactivateUser(){
      this.loadingError = false;
      this.loadingInfo = true;
      this.userService.deactivateUser(this.userId).subscribe(
        (data) => {
          alertify.success("User successfully deactivated.");
          this.loadingInfo = false;
          this.isActive = !this.isActive
        },
        error => {
          alertify.warning("User deactivation failed.");
          this.loadingError = true;
        }
      );
      this.loadingInfo = false;
    }

    activateUser(){
      this.loadingError = false;
      this.loadingInfo = true;
      this.userService.activateUser(this.userId).subscribe(
        (data) => {
          alertify.success('User successsfully activated.'); 
          this.loadingInfo = false;
          this.isActive = !this.isActive
        },
        error => {
          alertify.warning('User activation failed');
          this.loadingError = true;
        }
      );
    }

  }

