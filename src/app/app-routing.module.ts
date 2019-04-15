import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import {LoginComponent} from './login/login.component';
import {GitViewerComponent} from './git-viewer/git-viewer.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
// guards 
import {AuthGuard} from './guards/auth.guard';



const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [ AuthGuard ]
   
  },
  {
    path: 'dashboard',
    component: GitViewerComponent,
    canActivate: [ AuthGuard ]

  },
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
