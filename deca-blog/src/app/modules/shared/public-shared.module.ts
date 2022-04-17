import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule } from '@angular/forms';
import { DecaBlogPaginationComponent } from '../../components/shared/public/deca-blog-pagination/deca-blog-pagination.component';
import { ActionDropDownComponent } from '../../components/shared/public/action-drop-down/action-drop-down.component';
import { PaginatorModule } from 'primeng/paginator';
import { SkeletonModule} from 'primeng/skeleton'
import { LoadingProfileComponent } from '../../components/shared/public/loaders/loading-profile/loading-profile.component';
import { LoadingTableComponent } from '../../components/shared/public/loaders/loading-table/loading-table.component';
import { LoadingArticleCardComponent } from '../../components/shared/public/loaders/article-card/loading-article-card.component';
import {ProgressBarModule} from 'primeng/progressbar';
import { PostLoaderComponent } from '../../components/shared/public/loaders/post-loader/post-loader.component';
import { FeaturedUsersLoaderComponent } from '../../components/shared/public/loaders/featured-users-loader/featured-users-loader.component';

@NgModule({
  declarations: [
    DecaBlogPaginationComponent,
    ActionDropDownComponent,
    LoadingProfileComponent,
    LoadingTableComponent,
    LoadingArticleCardComponent,
    PostLoaderComponent,
    FeaturedUsersLoaderComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    BsDropdownModule.forRoot(),
    FormsModule,
    PaginatorModule,
    SkeletonModule,
    ProgressBarModule
  ],
  exports:[
    DecaBlogPaginationComponent, 
    ActionDropDownComponent,
    LoadingProfileComponent,
    LoadingTableComponent,
    LoadingArticleCardComponent,
    ProgressBarModule,
    PostLoaderComponent,
    FeaturedUsersLoaderComponent
  ]
})
export class PublicSharedModule { }
