import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { ActionDropdownData } from 'src/app/_models/action-dropdown-data';
import { PaginationMetaData } from 'src/app/_models/paginationMetaData';
import { UserService } from 'src/app/_services/_user_service/user.service';
declare let alertify: any;

@Component({
  selector: 'app-invitee-list',
  templateUrl: './invitee-list.component.html',
  styleUrls: ['./invitee-list.component.css']
})
export class InviteeListComponent implements OnInit, AfterViewInit {
  searchResults: any;
  loading: boolean = false;
  currentPage = 1;
  maxSize = 5;
  perPage = 10;
  errorResponse: boolean
  pageData = {PageNumber: this.currentPage, PerPage: this.perPage};
  paginationMetaData: PaginationMetaData;
  dropdownActions: ActionDropdownData[]

  constructor(private userService: UserService, public router: Router) {
    this.dropdownActions = [
      {
        name: "View Details",
        action: (inviteeId: string) => {router.navigate(['/admin', 'invitees', inviteeId])}
      },
      {
        name: "Approve",
        action: (inviteeId: string) => {
          userService.approveInvitee(inviteeId).subscribe(
            (data) => {
              alertify.success("Invitee has been approved")
              userService.pageParameters.next({PageNumber: this.currentPage, PerPage: this.perPage});
            },
            (error) => {alertify.error("Failed please try again")}
          )
        }
      }
    ]
   }

  ngAfterViewInit(): void {
    this.userService.pageParameters.next({PageNumber: this.currentPage, PerPage: this.perPage});
  }
  ngOnInit(): void {
  }

  pageChanged(event: PageChangedEvent){
    this.userService.pageParameters.next({PageNumber: event.page, PerPage: event.itemsPerPage});
  }
  
  initializeSearchResults(data: any){
    this.searchResults = data;
    this.paginationMetaData = new PaginationMetaData();
    this.paginationMetaData.Page = data.MetaData.Page;
    this.paginationMetaData.PerPage = data.MetaData.PerPage;
    this.paginationMetaData.Total = data.MetaData.Total;
    this.paginationMetaData.TotalPages = data.MetaData.TotalPages
  }

  handleNewPageNumber(event){
    this.pageData = event;
    this.userService.pageParameters.next(this.pageData);
  }

}
