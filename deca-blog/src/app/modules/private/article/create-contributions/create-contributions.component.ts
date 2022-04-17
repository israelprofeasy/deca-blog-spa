import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TagModel } from 'ngx-chips/core/tag-model';
import { filter, Observable, of } from 'rxjs';
import { ContributionToAddModel } from 'src/app/_models/contributionToAddModel';
import { ArticleTopicService } from 'src/app/_services/_article_service/article-topic.service';
import { ArticleService } from 'src/app/_services/_article_service/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleTopics } from 'src/app/_models/articleTopics';

declare let alertify:any;
@Component({
  selector: 'app-create-contributions',
  templateUrl: './create-contributions.component.html',
  styleUrls: ['./create-contributions.component.css']
})
export class CreateContributionsComponent implements OnInit {

 //Forgroup
addContributionForm : FormGroup;
searchArticleForm:FormGroup;
 model:ContributionToAddModel={ keywords:'', subtopic:'', artlcleText:''};
 convKeywords: string = '';
 itemsAsObjects:any[] = [];
 articleobject:any;
 location:any;
 article:any;
 topicName:any;
 load:boolean=false;
 articleIdFromRoute:any;
 articleIdFromSearch:string;
 articlesList:any[];
 fileterTerm : string = "";
 keyword = 'Topic';
 newId:any;
 



 constructor(private articleService: ArticleService,  private route: ActivatedRoute, private router: Router) { 

    //Mapping the form to FormGroup
  this.addContributionForm  = new FormGroup({
    subtopic: new FormControl(),  
    artlcleText: new FormControl(),
    keywords: new FormControl(),
  });

 //Get ID from Param
    if(this.route.snapshot.params['id']!= undefined){
    this.articleIdFromRoute = this.route.snapshot.params['id'];
    this.location = this.router.url;
    console.log("This is Defined")
    }else{
      console.log("This is Undefined")
    }

  }    
  ngOnInit(): void {

    this.getAllArticle();

    if(this.articleIdFromRoute != null){
      this.getArticle(this.articleIdFromRoute)
    }
}

getArticle(articleRouteId:string){
  this.articleService.getArticleById(articleRouteId).subscribe((response: any)=>{
  this.article = response.Data.Topic;
  this.topicName=this.article.TopicName
  }, 
  (error: any)=> {
  alertify.error("Failed to load Article, Please refresh the page.")
  });
  }
  
  getAllArticle(){
    this.articleService.getAllArticles().subscribe((response: any)=>{
    this.articlesList = response.Data.Data;
    }, 
    (error: any)=> {
    alertify.error("Failed to load Article, Please refresh the page.")
    });
    }

    updateSearchTerm(event){
     this.fileterTerm = event;
    }

    setID(event){
      this.articleIdFromSearch = event.TopicId;
    }
    unSetId(event){
      this.articleIdFromSearch = null;
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
 
  //Validating the Form
  validateForm(fieldToValidate: string[]){ 
    this.load=true;
    var validationResult="";

    if(this.articleIdFromSearch == null && this.articleIdFromRoute==null){
      validationResult += 'Article Topic, ';
    }

    fieldToValidate.forEach(element => {
      if(this.addContributionForm.get(element).value === null){
        validationResult += element + ', ';
     }
    });
 
     if(validationResult===""){
      this.model = Object.assign({}, this.addContributionForm.value);
      this.itemsAsObjects.forEach(element => {
        this.convKeywords+=element.value+','
      });
      this.model.keywords=this.convKeywords;
      if(this.articleIdFromRoute==undefined){
        this.newId=this.articleIdFromSearch;
      }else{
        this.newId=this.articleIdFromRoute;
      }
      this.submit(this.model,this.newId);
     return;
    }
    else{
      alertify.error("The following fields are required: " + validationResult)
     this.load=false;
    }
  }
 //Submit Button
 submit(model:ContributionToAddModel, idToSend:string){ 
   this.articleService.PostContribution(this.model,idToSend).subscribe(res=>{
   alertify.success("Article Created Successfully");
   this.load=false;
   this.addContributionForm.reset(); 
   }, 
   err=>{
     console.log(err)
     alertify.error(err)
    });
 }
}