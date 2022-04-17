import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/_auth_service/auth.service';
import { UserService } from 'src/app/_services/_user_service/user.service';

@Component({
  selector: 'app-account-side-nav',
  templateUrl: './account-side-nav.component.html',
  styleUrls: ['./account-side-nav.component.css']
})
export class AccountSideNavComponent implements OnInit {

  constructor(private userService: UserService, public authService: AuthService) { }

  ngOnInit(): void {
  }

  get user(): User {
    return this.userService.User;
  }

}
