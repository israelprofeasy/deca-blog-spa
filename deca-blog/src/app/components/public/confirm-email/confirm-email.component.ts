import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../_services/_user_service/user.service';
import { ModalService } from '../../../_services/modal.service'

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {
  emailConfirmed:boolean =false;
  loading: boolean = false;
  response: boolean = false;
  responseMessage :string
  urlParams:any={}

  constructor(
    private route:ActivatedRoute,
    private userService: UserService,
    public modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.urlParams.token = this.route.snapshot.queryParamMap.get("token");
    this.urlParams.email=this.route.snapshot.queryParamMap.get("email");
    this.confirmEmail();
  }

  confirmEmail(){
    this.loading = true;
    this.response = false;
    this.emailConfirmed = false;
    this.userService.confirmEmail(this.urlParams).subscribe((data: any)=>{
      console.log(data);
      this.responseMessage = data.Message
      this.emailConfirmed = true;
      this.response = true;
      this.loading = false;
    },
    (error)=>{
      console.log(error)
      this.responseMessage = error.error.Message
      this.emailConfirmed=false;
      this.response = true;
      this.loading = false;
    });
  }
}

