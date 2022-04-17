import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestParams } from 'src/app/_models/requestParams';
import { UserModel } from 'src/app/_models/userModel';
import { ModalService } from 'src/app/_services/modal.service';
import { AuthService } from 'src/app/_services/_auth_service/auth.service';
import { UserService } from 'src/app/_services/_user_service/user.service';

@Component({
  selector: 'app-featured-users',
  templateUrl: './featured-users.component.html',
  styleUrls: ['./featured-users.component.css']
})
export class FeaturedUsersComponent implements OnInit {
  featuredUsersArray : any  [] = [];
  requestParams: RequestParams = {PerPage:11, PageNumber:2};
  loading: boolean;
  constructor( 
    private router : Router, 
    private userService: UserService, 
    public modalService: ModalService,
    public authService: AuthService ) { }

    isUserLoggedIn(){
      return this.authService.isLoggedIn;
    }

    ngOnInit(): void {
    this.loading = true;
      this.userService.getUsers(this.requestParams).subscribe(
        (response:any)=>{
        this.featuredUsersArray = response.Data.Data;
        this.loading = false;
     },
     
     (error) => {
       this.loading = false;
     })
  }

}
