import { RouterModule, Routes } from '@angular/router';
import {PublicGuard} from "./common/guards/public.guard";
import {HomeComponent} from "./auth/home/home.component";
import {LoginComponent} from "./public/login/login.component";
import {AuthGuard} from "./common/guards/auth.guard";
import {NotFoundComponent} from "./common/not-found/not-found.component";
import {NewUserComponent} from "./public/user/user-list/new-user/new-user.component";
import {UserListComponent} from "./public/user/user-list/user-list.component";
import {ItemListComponent} from "./auth/item-list/item-list.component";
import {CarListComponent} from "./auth/car-list/car-list.component";


/*
* La idea es poner rutas por roles
* */

export const routes: Routes = [

  {
    path: '', pathMatch: 'full', redirectTo: '/login'
  },
  {
    path: 'login', component: LoginComponent, pathMatch: 'full', canActivate: [ PublicGuard ]
  },
  {
   // path: 'home', component: HomeComponent, data: { name: 'Home' }, canActivate: [ AuthGuard ]
    path: 'auth/home', component: HomeComponent, canActivate: [ AuthGuard ]
  },

  {
    path: 'new-user', component: NewUserComponent, canActivate: [ PublicGuard ]
  },

  {
    path: 'user-list', component: UserListComponent, canActivate: [ AuthGuard ]
  },

  {
    path: 'item-list', component: ItemListComponent, canActivate: [ AuthGuard ]
  },

  {
    path: 'car-list', component: CarListComponent, canActivate: [ AuthGuard ]
  },

  {
    path: 'car-list/:id', component: CarListComponent, canActivate: [ AuthGuard ]
  },


  {
    path: '**', component: NotFoundComponent
  }


];
