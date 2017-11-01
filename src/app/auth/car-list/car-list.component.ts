import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {CartListService} from "./service/cart-list.service";
import {Item} from "../../common/models/Item";
import {SessionStorageService} from "ngx-webstorage";
import {ItemService} from "../item-list/service/item.service";
import {AuthenticationService} from "../../common/services/authentication.service";
import {Validators, FormBuilder} from "@angular/forms";
import {Response} from "../../common/models/Response";
import {Shipping} from "../../common/models/Shipping";

@Component({
  selector: 'app-car-list',
  templateUrl: 'car-list.component.html',
  styleUrls: ['car-list.component.css']
})
export class CarListComponent implements OnInit {

  private sub: any;
  public item: Item

  public cart;
  redirect = false;
  isEmpty = false;

  dataUser;

  form = this._formBuilder.group( {
    user: this._formBuilder.group( {

      name : ['',Validators.required ],
      address : ['',Validators.required ],
      email : ['',[Validators.required, Validators.email] ],

    } )
  });

  constructor(private  _router: Router,
              private _formBuilder: FormBuilder,
              private route: ActivatedRoute,
              public _cartListService: CartListService,
              public _locker: SessionStorageService,
              public _itemService: ItemService,
              public _authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.onDeleteFromCar();
    this.onFillInitialValues();
   }

  onFillInitialValues(){
    this.dataUser = this._authService.user;
  }


   onDeleteFromCar(){
     this.cart = this._locker.retrieve('cart');
     //Delete repeated
     this.cart = Array.from(new Set(this.cart));

     if (this.cart.length <= 0){
       this.isEmpty = true;
     }
   }

  onDeleteProject(itemsCar){

    if (this.cart.length <= 1){
      this.redirect = true;
    }

    const index: number = this.cart.indexOf(itemsCar);
    if (index !== -1) {
      this.cart.splice(index, 1);
    }

    if (this.redirect){
      this._router.navigate(['item-list']);
    }
  }

  onPutInCar(){
    for (var j = 0; j < this.cart.length; j++){
      if (this.cart[j]!=null){
        let data = this.onCallItem(this.cart[j]);
      }
    }
  }

  onPutInShipping(){
      //Hardcoded now by default, but change later
      this.onCallShipping(new Shipping(this.dataUser.address,"pending",1));
  }

  onCallItem(item: Item){
    this._itemService.putItem(item).subscribe(
      (data) => {
          return data;
      }
    );
  }

  onCallShipping(shipping: Shipping){
   this._itemService.putShipping(shipping).subscribe(
      (data) => {
         return data;
      }
    );
  }

  onPlaceOrder(event: Event){
    //para detener el submit
    event.preventDefault();

    //Putting the items
    this.onPutInCar();

    //Putting the items
    this.onPutInShipping();

    alert("Your shipping was place sucessfully")
    this._router.navigate(['item-list']);

  }

  ngOnDestroy(){

  }

}


// this.sub = this.route
//   .params
//   .subscribe(params => {
//     this.id = +params['id'];
//
//     // OJO: El signo mas es para convertir el id en un entero
//     //const id: number = +params['id'];
//     // this._cartListService.getSingle(id).subscribe(
//     //   (data) => {
//     //     this.item = data;
//     //   },
//     //   err => {
//     //     console.error(err);
//     //   },
//     //   () => {});
//   });
