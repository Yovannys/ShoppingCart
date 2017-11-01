import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Item} from "../../../common/models/Item";
import {HttpService} from "../../../common/services/http.service";
import {AuthenticationService} from "../../../common/services/authentication.service";

@Injectable()
export class CartListService extends HttpService{

  constructor(public _http: Http, private _authService: AuthenticationService) {
    super(_http);
  }



}
