import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PrivateAreaGuard } from './_guards/private-area.guard';
import { AuthService } from './_services/_auth_service/auth.service';
import { LoginComponent } from './components/private/login/login.component';
import { HeaderComponent } from './components/public/header/header';
import { SearchPreviewComponent } from './components/public/search-preview/search-preview.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserService } from './_services/_user_service/user.service';
import { UtilsService } from './_services/_utils_service/utils.service';
import { ArticleService } from './_services/_article_service/article.service';
import { CategoryService } from './_services/_article_service/category.service';
import { TokenInterceptor } from './_interceptors/token.interceptor';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ConfirmEmailComponent } from './components/public/confirm-email/confirm-email.component';
import { SignupComponent } from './components/public/signup/signup.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FullArticleComponent } from './components/public/full-article/full-article.component';
import { PopularArticleComponent } from './components/public/popularArticle/popularArticle.component';
import { RelatedArticlesComponent } from './components/public/related-articles/related-articles.component';
import { ChangePasswordComponent } from './components/private/change-password/change-password.component';
import { FooterComponent } from './components/public/footer/footer.component';
import { PostComponent } from './components/public/post/post.component';
import { HeroSectionComponent } from './components/public/hero-section/hero-section.component';
import { HomeComponent } from './components/public/home/home.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ProfileComponent } from './_pages/profile/profile.component';
import { UserPostsComponent } from './components/private/user-posts/user-posts.component';
import { ProfileInformationComponent } from './components/private/profile-information/profile-information.component';
import { ProfileHeaderComponent } from './components/private/profile-header/profile-header.component';
import { FeaturedUsersComponent } from './components/public/featured-users/featured-users.component';
import { SkeletonModule } from 'primeng/skeleton';
import { PublicSharedModule } from './modules/shared/public-shared.module';
import { CommentListComponent } from './components/public/comment-list/comment-list.component';
import { AddCommentComponent } from './components/public/comment-list/add-comment/add-comment.component';
import { ReplyCommentComponent } from './components/public/comment-list/reply-comment/reply-comment.component';
import { CommentComponent } from './components/public/comment-list/comment/comment.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    SearchPreviewComponent,
    SignupComponent,
    ConfirmEmailComponent,
    FullArticleComponent,
    PopularArticleComponent,
    RelatedArticlesComponent,
    FooterComponent,
    ChangePasswordComponent,
    FooterComponent,
    HeroSectionComponent,
    PostComponent,
    ProfileComponent,
    UserPostsComponent,
    ProfileInformationComponent,
    ProfileHeaderComponent,
    FeaturedUsersComponent,
    CommentListComponent,
    AddCommentComponent,
    ReplyCommentComponent,
    CommentComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    NgxPaginationModule,
    PaginationModule.forRoot(),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    InfiniteScrollModule,
    PublicSharedModule
  ],
  providers: [
    AuthService,
    PrivateAreaGuard,
    UserService,
    UtilsService,
    ArticleService,
    CategoryService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
