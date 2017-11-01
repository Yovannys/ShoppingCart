import { Component, OnInit } from '@angular/core';
import {Item} from "../../common/models/Item";
import {Config} from "../../common/config";
import {HttpService} from "../../common/services/http.service";
import {AuthenticationService} from "../../common/services/authentication.service";
import {ItemService} from "./service/item.service";
import {SessionStorageService} from "ngx-webstorage";

@Component({
  selector: 'app-item-list',
  templateUrl: 'item-list.component.html',
  styleUrls: ['item-list.component.css']
})
export class ItemListComponent implements OnInit {

  items: Array<Item> = [];
  bindigVarItemName: string = "";
  apiBaseURL: string = Config.API_SERVER_URL;
  isLoading = true;
  isEmpty = false;


  public cart = [];

  selectedBook(book){
    this.cart.push(book);
  }


  constructor(private _itemService: ItemService,
              private _httpService: HttpService,
              private _authService: AuthenticationService,
              public _locker: SessionStorageService
  ) { }

  ngOnDestroy(){
    this._locker.store('cart', this.cart);
    this.cart = [];
  }


  ngOnInit() {
    this.getAllItems();
  }

  getAllItems() {

    if (this.bindigVarItemName!=""){
      this._itemService.getAll(this.bindigVarItemName).subscribe((items: Item[] = []) => {
          this.items = items;
          this.isLoading = false;

          if (this.items==null || this.items.length<=0)
          this.isEmpty = true;
        },
        err => {
          console.error(err);
          this.isLoading = false;
        },
        () => {
          console.log('Finished!');
        });
    }else {
      this._itemService.getAll("").subscribe((items: Item[] = []) => {
          this.items = items;
          this.isLoading = false;
        },
        err => {
          console.error(err);
          this.isLoading = false;
        },
        () => {
          console.log('Finished!');
        });
    }

  }
  public setData(sortedData) {
    console.log('sortedData: %o', sortedData);
    this.items = sortedData;
  }
}
