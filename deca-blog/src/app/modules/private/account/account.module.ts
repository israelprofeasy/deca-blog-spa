import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent} from './account.component';
import { InviteUserComponent } from '../../../components/private/invite-user/invite-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserProfileComponent } from '../../../components/private/user-profile/user-profile.component';
import { UserAddressComponent } from '../../../components/private/user-address/user-address.component';
import { PrivateSharedModule } from '../../shared/private-shared.module';
import { PublicSharedModule } from '../../shared/public-shared.module';
import { ChangePasswordComponent } from '../../../components/private/change-password/change-password.component';

const routes: Routes = [
  { path: '', component: AccountComponent,
  children:[
    { path: '', redirectTo: 'profile', pathMatch: 'full'},
    { path: 'profile', component: UserProfileComponent},
    {path: 'invite-user', component: InviteUserComponent},
    {path: 'profile/change-password', component: ChangePasswordComponent}

  ]}  
];

@NgModule({
  declarations: [
    AccountComponent,
    InviteUserComponent,
    UserProfileComponent,
    UserAddressComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PrivateSharedModule,
    ReactiveFormsModule,
    PublicSharedModule
  ],
}) 
export class AccountModule { }
