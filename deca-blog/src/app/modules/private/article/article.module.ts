import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ArticleComponent } from './article.component';
import { NewArticleComponent } from './new-article/new-article.component';
import { QuillModule } from 'ngx-quill';
import { TagInputModule } from 'ngx-chips';
import { ReactiveFormsModule } from '@angular/forms';
import { TopicListComponent } from './article-topic/topic-list/topic-list.component';
import { ArticletopicsComponent } from './article-topic/articletopics/articletopics.component';
import { PublicSharedModule } from '../../../modules/shared/public-shared.module';
import { PrivateSharedModule } from '../../shared/private-shared.module';
import { CreateContributionsComponent } from './create-contributions/create-contributions.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { ContributionListComponent } from 'src/app/components/private/contribution-list/contribution-list.component';
import { TopbarComponent } from 'src/app/components/private/topbar/topbar.component';
import { UsersContributionComponent } from 'src/app/components/private/users-contribution/users-contribution.component';
import { PendingArticlesComponent } from './Pending/pending-articles/pending-articles.component';
import { PendingArticlesListComponent } from './Pending/pending-articles-list/pending-articles-list.component';
import { PendingArticlesTopbarComponent } from './Pending/pending-articles-topbar/pending-articles-topbar.component';


const routes: Routes = [
  {
    path: '', component: ArticleComponent, children:[
      { path: 'new', component: NewArticleComponent },
      { path: 'add-contribution/:id', component: CreateContributionsComponent },
      { path: 'add-contribution', component: CreateContributionsComponent },
      { path: 'article-topics', component: ArticletopicsComponent},
      { path: 'contributions', component: UsersContributionComponent},
      { path: 'pendingcontributions', component: PendingArticlesComponent},
    ]
},
];

@NgModule({
  declarations: [
    ArticleComponent,
    NewArticleComponent,
    TopicListComponent,
    ArticletopicsComponent,
    CreateContributionsComponent,
    ContributionListComponent,
    TopbarComponent,
    UsersContributionComponent,
    PendingArticlesComponent,
    PendingArticlesListComponent,
    PendingArticlesTopbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PrivateSharedModule,
    QuillModule.forRoot(),
    TagInputModule,
    ReactiveFormsModule,
    PublicSharedModule,
    AutocompleteLibModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ArticleModule { }
