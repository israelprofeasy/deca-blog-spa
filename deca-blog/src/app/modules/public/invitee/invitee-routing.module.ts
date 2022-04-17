import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InviteeComponent } from './invitee.component';
import { RegisterInviteeComponent } from '../../../components/public/register-invitee/register-invitee.component';

const routes: Routes = [
  { path: '',
    component: InviteeComponent,
    children: [
      { path: '', redirectTo: 'register', pathMatch: 'full'},
      { path: 'register', component: RegisterInviteeComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InviteeRoutingModule {}