import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';
import { PaginationData } from 'src/app/_models/pagination-data';
import { UserService } from 'src/app/_services/_user_service/user.service';

declare let alertify: any;

@Component({
  selector: 'app-invitee-search-bar',
  templateUrl: './invitee-search-bar.component.html',
  styleUrls: ['./invitee-search-bar.component.css']
})
export class InviteeSearchBarComponent implements OnInit {
  @Output() searchResult: EventEmitter<any>;
  @Output() loading: EventEmitter<boolean>;
  @Input() pageData: PaginationData;
  searchParam: string = "";
  currentPage = 1;
  perPage = 1;
  constructor(private userservice: UserService, private el: ElementRef) {
    this.loading = new EventEmitter<boolean>();
    this.searchResult = new EventEmitter<any>();
  }

  ngOnInit(): void {
    this.userservice.pageParameters.subscribe(
      (data: PaginationData) => {
        this.currentPage = data.PageNumber;
        this.perPage = data.PerPage;
        this.searchInvitees(this.searchParam, data.PageNumber, data.PerPage)
      }
    );

    fromEvent(this.el.nativeElement, 'keyup').pipe(
      debounceTime(500),
      map((e: any) => e.target.value),
      tap((data) => { this.searchParam = data })
    ).subscribe(
      (data) => {
        this.searchInvitees(data, this.pageData.PageNumber, this.pageData.PerPage);
      }

    )
  }

  searchInvitees(name?: string, pageNumber?: number, pageSize?: number): void{
    this.loading.emit(true);
    this.userservice.searchInvitees(name, pageNumber, pageSize).subscribe(
      (data: any) => {
        this.searchResult.emit(data.Data);
        this.loading.emit(false);
      },
      (error) => {
        this.loading.emit(false);
        alertify.error("An error occured please try again");
      }
    );
  }
}
