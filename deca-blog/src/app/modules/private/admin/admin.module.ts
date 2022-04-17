import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';
import { PrivateSharedModule } from '../../shared/private-shared.module';
import { UsersListComponent } from 'src/app/components/private/users-list/users-list.component';
import { PublicSharedModule } from '../../shared/public-shared.module';
import { UserSearchBarComponent } from 'src/app/components/private/search-bar/user-search-bar.component';
import { InviteeListComponent } from 'src/app/components/private/invitee-list/invitee-list.component';
import { InviteeSearchBarComponent } from 'src/app/components/private/invitee-search-bar/invitee-search-bar.component';
import { UserProfileViewComponent } from 'src/app/components/private/user-profile-view/user-profile-view.component';
import { InviteeInfoComponent } from 'src/app/components/private/invitee/invitee-info.component';
import { UsersContributionComponent } from 'src/app/components/private/users-contribution/users-contribution.component';
import { OverviewComponent } from 'src/app/components/private/overview/overview.component';

const routes: Routes = [
  { path: '', component: AdminComponent,
  children:[
    {path: 'users', component: UsersListComponent},
    {path: 'overview', component: OverviewComponent},
    { path: 'invitees', component: InviteeListComponent},
    { path: 'user-profile/:id', component: UserProfileViewComponent},
    { path: 'invitees/:id', component: InviteeInfoComponent}
  ]}
];

@NgModule({
  declarations: [
    AdminComponent,
    UsersListComponent,
    UserSearchBarComponent,
    InviteeListComponent,
    InviteeSearchBarComponent,
    UserProfileViewComponent,
    InviteeInfoComponent,
    OverviewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PrivateSharedModule,
    ReactiveFormsModule,
    PublicSharedModule,
    PublicSharedModule
  ],
})
export class AdminModule { }
