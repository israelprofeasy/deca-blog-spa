import { IPostComment } from './../../../../_models/IPostComment';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommentService } from './../../../../_services/_comment_service/comment.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../../../_services/_auth_service/auth.service';
import { ModalService } from 'src/app/_services/modal.service';
declare let alertify: any

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {
  commentForm: FormGroup;
  user:any = {};
  articleId: string;
  userIsLoggedIn : boolean = false;
  commentErrors:boolean =false;
  commentData: IPostComment = {UserId: null, CommentTextId: "Hello World!"};
  @Output() onCommentAdded: EventEmitter<boolean>;
  commenting: boolean;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder, 
    private commentService: CommentService,
    private authService: AuthService,
    public modalService: ModalService
    ) {
      this.onCommentAdded = new EventEmitter<boolean>();
    this.commentForm = this.fb.group({
      CommentText: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    if(this.authService.isLoggedIn){
      this.user = this.authService.GetUserInfo();
      this.userIsLoggedIn = true;
    }
    this.articleId = this.route.snapshot.params['id'];
  }

  validateForm(field:string){
    const fieldToValidate = this.commentForm.get(field).value
    if(fieldToValidate == '' || fieldToValidate == null){
      alertify.error('comment is required')
    }else{
    this.submitComment();
    }
  }

  submitComment(){
    this.commenting = true;
    let currentUrl = this.router.url;
    this.commentData =  Object.assign({}, this.commentForm.value);
    this.commentData.UserId = this.user.Id
    this.commentService.postComment(this.articleId, this.commentData).subscribe(
      (res) => {
     
          this.router.navigate([currentUrl]);
        alertify.success(res["Message"]);
        this.clearForm();  
        this.onCommentAdded.emit(true);
        this.commenting = false;
      },
      (error) =>{
        this.commenting = false;
      }

    )
  }

  clearForm(){
    this.commentForm.reset();
  }
}