import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserModel } from 'src/app/_models/userModel';
import { AuthService } from 'src/app/_services/_auth_service/auth.service';
import { UserService } from 'src/app/_services/_user_service/user.service';

@Component({
  selector: 'app-profile-information',
  templateUrl: './profile-information.component.html',
  styleUrls: ['./profile-information.component.css']
})
export class ProfileInformationComponent implements OnInit {

  userId: string;
  result: UserModel;
  loggedIn: boolean = false;

  constructor(private userService: UserService, private authService: AuthService, private route: ActivatedRoute,) { }

  ngOnInit(): void {

    if(this.authService.isLoggedIn) this.loggedIn = !this.loggedIn;

    this.route.params.subscribe(param =>{    
      if(param.id == null && this.loggedIn == true){
        this.userId = this.userService.User.Id;
      }
      else{
        this.userId = param.id
      }
    })

    this.getUser();
  }

  getUser(){
    this.userService.getUser(this.userId).subscribe((res:any) =>{      
      this.result = res.Data;
    })
  }

}
