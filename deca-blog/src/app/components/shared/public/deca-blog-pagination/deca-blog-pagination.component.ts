import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { PaginationMetaData } from '../../../../_models/paginationMetaData';

@Component({
  selector: 'decablog-pagination',
  templateUrl: './deca-blog-pagination.component.html',
  styleUrls: ['./deca-blog-pagination.component.css']
})
export class DecaBlogPaginationComponent implements OnInit {
  @Input() data: PaginationMetaData;
  @Output() onPageChanged: EventEmitter<{PageNumber: number, PerPage: number}> 
  @Output() onPerPageChanged: EventEmitter<number>;
  pageNumbers: number[];
  maxSize = 5;

  constructor() { 
    this.onPageChanged = new EventEmitter<{PageNumber: number, PerPage: number}>();
    this.onPerPageChanged = new EventEmitter<number>();
  }
  ngOnInit(): void {
  }

  pageChanged(event){
    this.onPageChanged.emit({PageNumber: event.page+1, PerPage: event.rows})
  }
}
