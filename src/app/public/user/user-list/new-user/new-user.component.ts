import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";
import {HttpService} from "../../../../common/services/http.service";
import {Router} from "@angular/router";
import {UserService} from "../../service/user.service";
import {Users} from "../../../../common/models/Users";
import {AuthenticationService} from "../../../../common/services/authentication.service";

@Component({
  selector: 'app-new-user',
  templateUrl: 'new-user.component.html',
  styleUrls: ['new-user.component.css']
})
export class NewUserComponent implements OnInit {

  form = this._formBuilder.group( {
    user: this._formBuilder.group( {

      username : ['',Validators.required ],
      password : ['',Validators.required ],
      name : ['',Validators.required ],
      address : ['',Validators.required ],
      email : ['',[Validators.required, Validators.email] ],

    } )
  });
  constructor(private _formBuilder: FormBuilder, public _router: Router, public _httpService: HttpService, public _authService: AuthenticationService) { }

  ngOnInit() {

  }

  onSubmit(event: Event){
    //para detener el submit
    event.preventDefault();
    console.log('Submit', this.form.value.user);

    this._httpService.post(this._httpService.apiBaseURL+'/users/register', this.form.value.user).subscribe(
      data => {
        console.log("token: "+this._authService.getToken());
        this._router.navigate(['/login']);
      },
      error => {
        console.error("Error saving user data "+error);
      }
    );

  }

}
