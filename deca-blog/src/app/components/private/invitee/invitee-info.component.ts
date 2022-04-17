import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/_services/_user_service/user.service';
declare let alertify: any;

@Component({
  selector: 'app-invitee-info',
  templateUrl: './invitee-info.component.html',
  styleUrls: ['./invitee-info.component.css']
})
export class InviteeInfoComponent implements OnInit {
  inviteeId: string;
  loadingInfo: boolean=true;
  invitee: any;
  errorLoading: boolean;
  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.inviteeId = this.route.snapshot.params['id'];
    this.getInviteeInfo();
  }

  getInviteeInfo(){
    this.loadingInfo = true;
    this.errorLoading = false
    this.userService.getInviteeById(this.inviteeId).subscribe(
      (data: any) => {
        this.invitee = data.Data;
        this.loadingInfo = false;
      },
      (error) =>{
        this.loadingInfo = false;
        this.errorLoading = true;
      }
    )
  }

  approveInvitee() {
    this.userService.approveInvitee(this.inviteeId).subscribe(
      (data: any) => {
        alertify.success("Invitee has been approved")
        this.router.navigate(['/admin', 'invitees']);
      },
      (error) => {
        alertify.error("Failed please try again")
      }
    )
  }

  goBack(){
    this.router.navigate(['/admin','invitees']);
  }

  reloadCurrentPage(){
    this.getInviteeInfo()
  }

}
