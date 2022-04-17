import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { TagModel } from 'ngx-chips/core/tag-model';
import { Observable, of } from 'rxjs';
import { ArticleToAddModel } from '../../../../_models/articleToAddModule';
import { ArticleService } from '../../../../_services/_article_service/article.service';
import { CategoryService } from '../../../../_services/_article_service/category.service';

declare let alertify:any
@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css']
})
export class NewArticleComponent implements OnInit {
 //Forgroup
 createArticleForm : FormGroup;
 model:ArticleToAddModel={photo:null, topic:'', abstract:'', category:'', keywords:'', subtopic:'', articleText:''};
 articlePhoto:File=null;
 imageURL:any;
 categories:any []= [];
 convKeywords: string = '';
 itemsAsObjects:any[] = [];
 loading:boolean = false;
 
 constructor(private articleService: ArticleService,
    private categoryService: CategoryService,) { 

      //Mapping the form to FormGroup
    this.createArticleForm  = new FormGroup({
      topic: new FormControl(),
      abstract: new FormControl(),
      category: new FormControl(),
      subtopic: new FormControl(),  
      articleText: new FormControl(),
      keywords: new FormControl(),
      photo: new FormControl(),
    });

    }

 ngOnInit(): void {
   //Mapping the form to FormGroup
  
   //Get Category on load
   this.categoryService.GetCategory().subscribe((result)=>
       {this.categories = result.Data;} , () =>{
       alertify.error("could not load category");
     })
 } 
 onAdding(tag: TagModel): Observable<TagModel> {
       this.itemsAsObjects.push(tag)
      // console.log(this.itemsAsObjects);
   return of(tag).pipe();
 }
 onRemoving(tag: any): Observable<TagModel> {
    this.itemsAsObjects=this.itemsAsObjects.filter(x=>x.name!=tag.name)
   return of(tag).pipe();
 }
 getKeywords(){
   this.itemsAsObjects.forEach( (data) => {
     this.convKeywords+=data.value +',';
   });
 }
  //Check image
  checkImage(){
   return (!this.imageURL || this.imageURL === null)
  }  

  removeImage(event){
   this.imageURL=null;
  }

 // Image Preview
   showPreview(event:any) {
     if(event.target.files){
       var reader= new FileReader()
       reader.readAsDataURL(event.target.files[0])
       reader.onload=(event) => {
         this.imageURL=event.target.result
       }
     }
    }
 //What to do when images change
 onFileChange(event:any) {       
   if (event.target.files.length > 0) {
     const file = event.target.files[0];
     let acceptedFilesFormat:string[]=['image/jpg','image/png','image/jpeg'];
     if(!acceptedFilesFormat.includes(file.type)){
       alertify.error("The uploaded image format is not supported");
       return;
     }
     if(file.size>=3000000){
       alertify.error("The uploaded image size is too large");
       return;
     }
     this.showPreview(event) 
     this.articlePhoto=file;
   }
 }
 //Validating the Form
 validateForm(fieldToValidate: string[]){ 
   this.loading=true;
   var validationResult="";
   fieldToValidate.forEach(element => {
     if(this.createArticleForm.get(element).value === null){
       validationResult += element + ', ';
    }
   });

   if(this.articlePhoto===null){    
    console.log(this.loading)
    alertify.error("Please select an image for the article");
    this.loading=false;     
    console.log(this.loading)
  }

  else if(validationResult===""){
     this.model = Object.assign({}, this.createArticleForm.value);
     this.itemsAsObjects.forEach(element => {
       this.convKeywords+=element.value+','
     });
     this.model.keywords=this.convKeywords;
     this.model.photo=this.articlePhoto;
     console.log(this.loading)
     this.submit(this.model);
    return;
   }
   else{
     alertify.error("The following fields are required: " + validationResult)
    this.loading=false;
    console.log(this.loading)
   }
 }
 //Submit Button
 submit(model:ArticleToAddModel){ 
   this.articleService.PostArticle(this.model).subscribe(res=>{
     alertify.success("Article Created Successfully");
     this.loading=false;
     this.removeImage(event);
   this.createArticleForm.reset(); 
   }, 
   err=>{
    this.loading=false;
     alertify.error(err.error.Message)
    });
 }
}