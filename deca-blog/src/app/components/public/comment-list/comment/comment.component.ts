import { IComment } from '../../../../_models/apiResponseModels/Comment';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @ViewChild('replyBtn') replyBtn: ElementRef;
  @Input() comment: IComment;
  reply: boolean = false;
  commentId: string;
  isOpenReply = false;
  constructor() { }

  ngOnInit(): void {
  }

  handleOpenReply() {
    this.isOpenReply = !this.isOpenReply;
  }

  handleCloseReply(event){
    this.isOpenReply = event;
  }
}