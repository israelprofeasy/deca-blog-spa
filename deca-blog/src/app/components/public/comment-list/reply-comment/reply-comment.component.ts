import { ICommentator } from './../../../../_models/apiResponseModels/Comment';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-reply-comment',
  templateUrl: './reply-comment.component.html',
  styleUrls: ['./reply-comment.component.css']
})
export class ReplyCommentComponent implements OnInit {
  @Input() commentator: ICommentator;
  @Output() closeReply: EventEmitter<boolean>;
  constructor() {
    this.closeReply = new EventEmitter<boolean>();
   }

  ngOnInit(): void {
  }

  handleCloseReply(){
    this.closeReply.emit(false);
  }
}