import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/_auth_service/auth.service';
declare let  alertify : any

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

 
  constructor(private authService : AuthService) { }

  ngOnInit(): void {
  }

}
