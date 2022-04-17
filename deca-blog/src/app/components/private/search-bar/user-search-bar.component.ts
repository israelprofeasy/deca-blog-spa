import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, map, tap } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { UserService } from 'src/app/_services/_user_service/user.service';
import { PaginationData } from 'src/app/_models/pagination-data';

@Component({
  selector: 'app-user-search-bar',
  templateUrl: './user-search-bar.component.html',
  styleUrls: ['./user-search-bar.component.css']
})

export class UserSearchBarComponent implements OnInit {
  
  @Output() searchResult: EventEmitter<any>;
  @Output() loading: EventEmitter<boolean>;
  @Input() pageData: PaginationData = {PageNumber: 1, PerPage: 2};
  searchParam: string = "";
  currentPage = 1;
  perPage = 10;

  constructor(private userService: UserService, private el: ElementRef) { 
    this.loading = new EventEmitter<boolean>();
    this.searchResult = new EventEmitter<any>();
  }

  ngOnInit(): void {
    this.userService.pageParameters.subscribe(
      (data: PaginationData) => {
          this.currentPage = data.PageNumber;
          this.perPage = data.PerPage;
          this.searchUsers(this.searchParam, data.PageNumber, data.PerPage)
      });

    fromEvent(this.el.nativeElement, 'keyup').pipe(
      debounceTime(500),
      map((e: any) => e.target.value),
      tap((data) => { this.searchParam = data })
    ).subscribe(
      (data) => {
        this.searchUsers(data, this.pageData.PageNumber, this.pageData.PerPage);
      }
    )
  }

  searchUsers(name?: string, pageNumber?: number, pageSize?: number): void{
    this.loading.emit(true);
    this.userService.searchUsers(name, pageNumber, pageSize).subscribe(
      (data: any) => {
        this.searchResult.emit(data.Data);
        this.loading.emit(false);
      },
      (error) => {
        this.loading.emit(false);
      }
    );
  }

}
