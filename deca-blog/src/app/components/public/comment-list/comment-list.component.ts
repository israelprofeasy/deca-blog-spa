import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../../../_services/_auth_service/auth.service';
import { IResponse } from './../../../_models/apiResponseModels/Response';
import { CommentService } from './../../../_services/_comment_service/comment.service';
import { IComment } from './../../../_models/apiResponseModels/Comment';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
  comments: IComment[] = [];
   topicId: string = "";
   @Output() onCommentAdded: EventEmitter<number>;
  constructor(private commentService: CommentService, 
                      private route: ActivatedRoute,) {
                        this.onCommentAdded = new EventEmitter<number>();
                      }

  ngOnInit(): void {
    this.topicId =  this.route.snapshot.params['id'];
    this.getComments();
  }

  getComments(){
    this.commentService.getCommentByTopicId(this.topicId).subscribe((value: IResponse<IComment>) => {
      this.comments = value.Data['Data'];
      this.onCommentAdded.emit(this.comments.length);
    })
  }

  processCommentAddedEvent(){
    this.getComments();
  }
}