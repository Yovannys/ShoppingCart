import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './public/login/login.component';
import {HttpService} from "./common/services/http.service";
import {AuthenticationService} from "./common/services/authentication.service";

import {Ng2Webstorage} from 'ngx-webstorage';
import { HomeComponent } from './auth/home/home.component';
import { NotFoundComponent } from './common/not-found/not-found.component';
import {RouterModule} from "@angular/router";
import {routes} from "./routes";
import { HeaderComponent } from './common/layout/header/header.component';
import {AuthGuard} from "./common/guards/auth.guard";
import {PublicGuard} from "./common/guards/public.guard";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AppCustomUsernameDirective } from './public/login/directives/app-custom-username.directive';
import { NewUserComponent } from './public/user/user-list/new-user/new-user.component';
import { UserListComponent } from './public/user/user-list/user-list.component';
import {UserService} from "./public/user/service/user.service";
import { ItemListComponent } from './auth/item-list/item-list.component';
import { CarListComponent } from './auth/car-list/car-list.component';
import { SortingComponent } from './modules/shared-components/sorting/sorting.component';
import { LoaderComponent } from './modules/shared-components/loader/loader.component';
import {ItemService} from "./auth/item-list/service/item.service";
import {CartListService} from "./auth/car-list/service/cart-list.service";
import { PaymentComponent } from './auth/payment/payment.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NotFoundComponent,
    HeaderComponent,
    AppCustomUsernameDirective,
    NewUserComponent,
    UserListComponent,
    ItemListComponent,
    CarListComponent,
    SortingComponent,
    LoaderComponent,
    PaymentComponent,

  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2Webstorage,
    RouterModule.forRoot(routes)
  ],
  providers: [
    HttpService,
    AuthenticationService,
    AuthGuard,
    PublicGuard,
    UserService,
    ItemService,
    CartListService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
