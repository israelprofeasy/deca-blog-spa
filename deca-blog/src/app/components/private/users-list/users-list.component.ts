import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { ActionDropdownData } from 'src/app/_models/action-dropdown-data';
import { PaginationMetaData } from 'src/app/_models/paginationMetaData';
import { UserService } from '../../../_services/_user_service/user.service';

declare let alertify: any;
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit, AfterViewInit {
  searchResults: any;
  loading: boolean = false;
  loadingInfo: boolean;
  loadingError: boolean;
  hasData: boolean = false;
  currentPage = 1;
  maxSize = 5;
  perPage = 10;
  pageData = {PageNumber: this.currentPage, PerPage: this.perPage};
  pageMetaData: PaginationMetaData;
  dropDownActions: ActionDropdownData[]
  constructor(private userservice: UserService, private router: Router) {
    this.dropDownActions = [
      {
        name: "View Profile",
        action: (actionData) => {router.navigate([`/admin/user-profile/${actionData}`])},
      },
    ]
   }
  ngAfterViewInit(): void {
    this.userservice.pageParameters.next({PageNumber: this.currentPage, PerPage: this.perPage});
    console.log(this.hasData);
  }

  ngOnInit(): void {
  }

  pageChanged(event: PageChangedEvent){
    this.userservice.pageParameters.next({PageNumber: event.page, PerPage: event.itemsPerPage});
  }

  handleLoadingEvent(event){
    this.loadingInfo = true;
  }

  initializeSearchResults(data: any){
    this.pageMetaData= new PaginationMetaData();
    this.pageMetaData.Page = data.MetaData.Page;
    this.pageMetaData.PerPage = data.MetaData.PerPage;
    this.pageMetaData.Total = data.MetaData.Total;
    this.pageMetaData.TotalPages = data.MetaData.TotalPages
    this.searchResults = data;
    if( data.Data.Data.length > 0) 
      this.hasData = true;
  }

  handlePerPageChanged(event){
    this.pageData = event;
    this.userservice.pageParameters.next(this.pageData)
  }

  handleNewPageNumber(event){
    this.currentPage = event;
    this.userservice.pageParameters.next({PageNumber: this.currentPage, PerPage: this.perPage})
  }

  reloadCurrentPage(){
    this.userservice.pageParameters.next({PageNumber: this.currentPage, PerPage: this.perPage});
  }

}
