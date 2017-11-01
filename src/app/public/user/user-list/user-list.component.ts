import { Component, OnInit } from '@angular/core';
import {Users} from "../../../common/models/Users";
import {Config} from "../../../common/config";
import {UserService} from "../service/user.service";
import {HttpService} from "../../../common/services/http.service";
import {AuthenticationService} from "../../../common/services/authentication.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: Array<Users> = [];
  bindigVarUserName: string = "";
  apiBaseURL: string = Config.API_SERVER_URL;
  isLoading = true;
  isEmpty = false;

  constructor(private _userService: UserService,
              private _httpService: HttpService,  private _authService: AuthenticationService) { }

  ngOnInit() {
    this.getAllUsers();

  }

  getAllUsers() {

    if (this.bindigVarUserName!=""){
      this._userService.getAll(this.bindigVarUserName).subscribe((users: Users[] = []) => {
          this.users = users;
          this.isLoading = false;

          if (this.users==null || this.users.length<=0)
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
      this._userService.getAll("").subscribe((users: Users[] = []) => {
          this.users = users;
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
    this.users = sortedData;
  }


}
