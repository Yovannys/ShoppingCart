import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-not-found',
  templateUrl: 'not-found.component.html',
  styleUrls: ['not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  dataUser;

  constructor(  public _authService: AuthenticationService) { }

  ngOnInit() {

    this.dataUser = this._authService.user;
  }

}
