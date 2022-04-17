import { Component, HostListener, OnChanges } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IGetArticleModel } from 'src/app/_models/IGetArticleModel';
import { SearchService } from 'src/app/_services/_search_service/search.service';
import { User } from '../../../_models/user';
import { ModalService } from '../../../_services/modal.service';
import { AuthService } from '../../../_services/_auth_service/auth.service';
import { UserService } from '../../../_services/_user_service/user.service';
declare let alertify: any;

@Component({
  selector: 'app-Header',
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class HeaderComponent implements OnChanges {
  searchTerm: any;
  term:string;
  total:any = 0;
  results: IGetArticleModel[];
  perPage: number = 10;
  filter: any = "search-by-topic-name";
  pageNumber:number = 1;

  searchBarVisible: boolean = true;
  showBar: boolean = false;
  show: boolean = false;

  constructor(
    public modalService: ModalService,
    public authService: AuthService,
    private userService: UserService,
    private searchService: SearchService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnChanges(): void {
    this.route.params.subscribe(params =>{
      console.log(params.searchTerm);
      if(params.searchTerm)
        this.searchTerm = params.searchTerm;
    })
    
  }

  get user(): User {
    return this.userService.User;
  }

  logout(prop): void {
    this.show = prop;
    this.authService.logout();
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  onMouseover() {
    this.searchBarVisible = true;
  }

  onMouseout() {
    this.searchBarVisible = false;
  }

  onChangeClass() {
    this.showBar = !this.showBar;
  }

  dropdown(): void {
    this.show = !this.show;
  }
  @HostListener('window:click', ['$event']) onDocumentClick(event): void {
    this.show = false;
  }

  @HostListener('window:resize', ['$event']) onResize(event): void {
    this.show = false;
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  search():void{
    if(this.searchTerm)
      this.router.navigateByUrl('articles/search/' + this.searchTerm)
  }
}
