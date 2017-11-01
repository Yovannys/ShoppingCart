import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../common/services/http.service";
import {AuthenticationService} from "../../common/services/authentication.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {

  name;

  constructor(public _httpService: HttpService, public _authService: AuthenticationService) { }

  ngOnInit() {
    let user = this._authService.user;
    this.name = user.name.toUpperCase();
  }

}
