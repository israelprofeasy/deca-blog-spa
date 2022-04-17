import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegisterInviteeComponent } from '../../../components/public/register-invitee/register-invitee.component';
import { InviteeComponent } from './invitee.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InviteeRoutingModule } from './invitee-routing.module';



@NgModule({
  declarations: [
    RegisterInviteeComponent,
    InviteeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InviteeRoutingModule
  ]
})
export class InviteeModule { }
