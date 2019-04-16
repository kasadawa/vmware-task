import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule} from "@angular/forms";
import { GitViewerComponent } from './git-viewer/git-viewer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DetailedViewerComponent } from './detailed-viewer/detailed-viewer.component';
import { CommitsViewerComponent } from './commits-viewer/commits-viewer.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GitViewerComponent,
    PageNotFoundComponent,
    DetailedViewerComponent,
    CommitsViewerComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
