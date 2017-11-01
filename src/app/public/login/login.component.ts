import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../common/services/authentication.service';
import {Router} from '@angular/router';
import {SessionStorageService} from 'ngx-webstorage';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {

  user: any = <any>{};

  isLogin = false;

  constructor(public _authService: AuthenticationService,
              public _router: Router,
              public _locker: SessionStorageService) { }

  ngOnInit() {
    this.isLogin = true;
  }

  onSubmit(event: Event) {
    //se cancela el evento submit para que no se recargue la pagina
    event.preventDefault();
    this._authService.logIn(this.user.username, this.user.password).subscribe(
      (data) => {
        //console.log("El token : "+data.token);
        this._authService.user = data;
        this._authService.hasSession = true;
        this._locker.store('user', data);
        this._router.navigate(['/auth/home']);
        this.isLogin = true;
      },
      err => {
        this.isLogin = false;
        console.error("Error de autenticacion : "+err);
        this._authService.hasSession = false;

      }
    );
  }

}
