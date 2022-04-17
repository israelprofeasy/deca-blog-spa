import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/_services/modal.service';
import { AuthService } from 'src/app/_services/_auth_service/auth.service';
import { UserService } from 'src/app/_services/_user_service/user.service';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.css']
})
export class HeroSectionComponent implements OnInit {

  constructor(public authService: AuthService,
    private userService: UserService, public modalService: ModalService) { }

  ngOnInit(): void {

  }

  isUserLoggedIn(){
    return this.authService.isLoggedIn;
  }
}
