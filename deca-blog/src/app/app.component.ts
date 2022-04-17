import { Component, OnInit } from '@angular/core';
import { ModalService } from './_services/modal.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'deca-blog';
  bodyText:string;
  l = {name: 'Name', action: () =>{console.log("helloworld")}}
  constructor(public modalService: ModalService){}
  ngOnInit(){
    this.bodyText = 'This text can be updated in sign in';
  }
  openModal(id:string){
    this.modalService.open(id);
  }
  closeModal(id:string){
    this.modalService.close(id);
  }

  handle(){}
}