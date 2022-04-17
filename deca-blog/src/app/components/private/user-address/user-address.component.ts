import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressModel } from '../../../_models/addressModel';
import { UserService } from '../../../_services/_user_service/user.service';


declare let alertify: any;

@Component({
  selector: 'app-update-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.css']
})
export class UserAddressComponent implements OnInit {
  @Input() address: AddressModel
  editAddress: boolean = false;
  addressUpdateForm: FormGroup;
  formSubmitted: boolean;
  formControls: any;

  constructor(private userService: UserService, fb: FormBuilder){
    this.addressUpdateForm = fb.group(
      {
        street: [{value: '', disabled: true}, [Validators.required]],
        state: ['', [Validators.required]],
        country: ['', [Validators.required]]
      }
    );
    this.formControls = this.addressUpdateForm.controls;
  }

  ngOnInit(): void {
  }

  toggleButton(): void{
    this.editAddress = !this.editAddress;
    if(this.editAddress){
      if(!this.address){
        this.address = {Street: '', State: '', Country: ''}
      }
      this.addressUpdateForm.patchValue({
        street: this.address.Street,
        state: this.address.State,
        country: this.address.Country
      });
      this.formControls['street'].enable();
      this.formControls['state'].enable();
      this.formControls['country'].enable();
      return;
    }

    if(this.address.State === '' && this.address.Street === '' && this.address.Country === ''){
      this.address = undefined;
    }
  }

  updateUserInformation(){
    this.addressUpdateForm.value
    this.formSubmitted = true;
    if(!this.addressUpdateForm.valid){
      return;
    }

    this.userService.updateUserAddress(this.addressUpdateForm.value, this.userService.User.Id).subscribe(
      (data: any) => {
        this.address = data.Data
        this.toggleButton();
        alertify.success('Address successsfully updated.'); 
      },
      error => {
        alertify.warning('Address update failed'); 
      }
    )
}
}


