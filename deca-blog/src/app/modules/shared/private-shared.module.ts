import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AccountSideNavComponent } from '../../components/shared/private/account-side-nav/account-side-nav.component';

@NgModule({
  declarations: [
      AccountSideNavComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    AccountSideNavComponent
  ]
})
export class PrivateSharedModule { }
