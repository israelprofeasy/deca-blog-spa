import { Routes } from '@angular/router';
import { ConfirmEmailComponent } from './components/public/confirm-email/confirm-email.component';
import { SearchPreviewComponent } from './components/public/search-preview/search-preview.component';
import { PrivateAreaGuard } from './_guards/private-area.guard';
import { FullArticleComponent } from './components/public/full-article/full-article.component';
import { HomeComponent } from './components/public/home/home.component';
import { ProfileComponent } from './_pages/profile/profile.component';
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'confirmemail', component: ConfirmEmailComponent },
  { path: 'articles/search', component: SearchPreviewComponent },
  {
    path: 'profile/:id',
    component: ProfileComponent,
    canActivate: [PrivateAreaGuard],
  },

  { path: 'articles/search/:searchTerm', component: SearchPreviewComponent },
  {
    path: 'articles/:id',
    component: FullArticleComponent,
  },

  {
    path: 'account',
    loadChildren: () =>
      import('./modules/private/account/account.module').then(
        (m) => m.AccountModule
      ),
    canActivate: [PrivateAreaGuard],
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'article',
    loadChildren: () =>
      import('./modules/private/article/article.module').then(
        (m) => m.ArticleModule
      ),
    canActivate: [PrivateAreaGuard],
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'invite',
    loadChildren: () =>
      import('./modules/public/invitee/invitee.module').then(
        (m) => m.InviteeModule
      ),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/private/admin/admin.module').then((m) => m.AdminModule),
    canActivate: [PrivateAreaGuard],
    runGuardsAndResolvers: 'always',
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
