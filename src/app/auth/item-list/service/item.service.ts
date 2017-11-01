import { Injectable } from '@angular/core';
import {AuthenticationService} from "../../../common/services/authentication.service";
import {Http, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {HttpService} from "../../../common/services/http.service";
import {Item} from "../../../common/models/Item";
import {Response} from "../../../common/models/Response";
import {Shipping} from "../../../common/models/Shipping";
@Injectable()
export class ItemService extends HttpService{

  constructor(public _http: Http, private _authService: AuthenticationService) {
    super(_http);
  }

  public getAll(puserName:string): Observable<Array<Item>> {
    const projects: Array<Item> = [];
    const url = `${this.apiBaseURL}/products/search?name=`+puserName;
    return this.get(url, this._authService.getToken());
  }

  public getSingle(id: number): Observable<Item> {
    const url = `${this.apiBaseURL}/products/${id}`;
    return this.get(url, this._authService.user.api_token);
  }

  public putItem(item: Item): Observable<Response> {
    const url = `${this.apiBaseURL}/products/putInCar/`;
    return this.post(url, item ,this._authService.getToken());
  }

  public putShipping(shipinng: Shipping): Observable<Response> {
    const url = `${this.apiBaseURL}/shipping/persist`;
    return this.post(url, shipinng ,this._authService.getToken());
  }


}
