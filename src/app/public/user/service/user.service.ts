import { Injectable } from '@angular/core';
import {AuthenticationService} from "../../../common/services/authentication.service";
import {Http, RequestOptions, Headers} from "@angular/http";
import { Observable } from 'rxjs/Observable';
import {HttpService} from "../../../common/services/http.service";
import {Users} from "../../../common/models/Users";

@Injectable()
export class UserService extends HttpService {

  constructor(public _http: Http, private _authService: AuthenticationService) {
    super(_http);
  }

  public getAll(puserName:string): Observable<Array<Users>> {
    const projects: Array<Users> = [];
    const url = `${this.apiBaseURL}/ShoppingCart/users/search?username=`+puserName;
    console.log("Token "+this._authService.getToken());
    return this.get(url, this._authService.getToken());
  }

  public getSingle(id: number): Observable<Users> {

    const url = `${this.apiBaseURL}/user/${id}`;
    return this._http.get(url).map(response => response.json());

  }

}
