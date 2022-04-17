import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { ActionDropdownData } from 'src/app/_models/action-dropdown-data';
import { PaginationMetaData } from 'src/app/_models/paginationMetaData';
import { PendingContributionModel } from 'src/app/_models/pendingContributionsModel';
import { ArticleService } from 'src/app/_services/_article_service/article.service';
import { UserService } from 'src/app/_services/_user_service/user.service';

declare let alertify: any;
@Component({
  selector: 'app-pending-articles-list',
  templateUrl: './pending-articles-list.component.html',
  styleUrls: ['./pending-articles-list.component.css']
})
export class PendingArticlesListComponent implements OnInit , AfterViewInit {
  @Input() contributions : PendingContributionModel[] = [];
  @Input() dropdownData: ActionDropdownData[];
  
  currentPage = 1;
  maxSize = 5;
  perPage = 6;
  pageData = {PageNumber: this.currentPage, PerPage: this.perPage};
  paginationMetaData: PaginationMetaData;


  contribution : any ={subtopic :null, text:null, id:null}

  constructor(private articleService: ArticleService , private userService: UserService) { }

  
  ngAfterViewInit(): void {
    this.userService.pageParameters.next({PageNumber: this.currentPage, PerPage: this.perPage});
  }
  ngOnInit() { }

  updateContribution(subtopic:string, text:string, id:string){
    this.contribution.subtopic = subtopic;
    this.contribution.text = text;
    this.contribution.id = id;
  }


  pageChanged(event: PageChangedEvent){
    this.userService.pageParameters.next({PageNumber: event.page, PerPage: event.itemsPerPage});
  }

  handleNewPageNumber(event){
    this.pageData = event;
    this.userService.pageParameters.next(this.pageData);
  }

}
