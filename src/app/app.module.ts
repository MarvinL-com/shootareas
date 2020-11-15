import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LieuxComponent } from './lieux/lieux.component';
import { MessagesComponent } from './messages/messages.component';
import { LieuDetailComponent } from './lieu-detail/lieu-detail.component';
import { HomepageComponent } from './homepage/homepage.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthFormComponent } from './auth-form/auth-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UniversalAppInterceptor} from "./universal-app-interceptor";
import { AddLieuComponent } from './add-lieu/add-lieu.component';
import { FormStepsComponent } from './form-steps/form-steps.component';

@NgModule({
  declarations: [
    AppComponent,
    LieuxComponent,
    MessagesComponent,
    LieuDetailComponent,
    HomepageComponent,
    AuthenticationComponent,
    AuthFormComponent,
    AddLieuComponent,
    FormStepsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS,useClass: UniversalAppInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
