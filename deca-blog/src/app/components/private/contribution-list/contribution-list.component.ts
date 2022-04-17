import { CompileMetadataResolver } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { ActionDropdownData } from 'src/app/_models/action-dropdown-data';
import { ContributionModel } from 'src/app/_models/contributions';
import { ArticleService } from 'src/app/_services/_article_service/article.service';
declare let alertify: any;
@Component({
  selector: 'app-contribution-list',
  templateUrl: './contribution-list.component.html',
  styleUrls: ['./contribution-list.component.css']
})
export class ContributionListComponent implements OnInit {
  @Input() contributions : ContributionModel[] = [];
  @Input() dropdownData: ActionDropdownData[];

  constructor(private articleService: ArticleService) {
    
  }
  ngOnInit(): void {

  }
}
