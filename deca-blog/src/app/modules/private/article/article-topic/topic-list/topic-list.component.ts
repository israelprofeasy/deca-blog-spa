import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionDropdownData } from '../../../../../_models/action-dropdown-data';
import { ArticleTopics } from '../../../../../_models/articleTopics';

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.css']
})
export class TopicListComponent implements OnInit {
  @Input() topics: ArticleTopics[];
  @Input() loading;
  public defaultImg:string = "../../../../../../assets/images/topic1.png";

  actionAdata: ActionDropdownData[];
  constructor(private router: Router) {
    this.actionAdata = [
      {
        name: 'Edit Article',
        action: this.editArticle
      },
      {
        name: "Delete Article",
        action: this.deleteArticle,
      },
      {
        name: "Add Contribution",
        action: (id)=>{router.navigate(["/article/add-contribution", id])}
      }
    ]
   }

  ngOnInit(): void {
  }

  editArticle(articleId: string){
    console.log("View clicked")
  }
  deleteArticle(articleId: string){
    console.log("Delete clicked")
  }
}
