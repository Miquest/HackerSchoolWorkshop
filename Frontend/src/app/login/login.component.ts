import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    console.log(this.userService.checkIfUsernameIsFree('test').subscribe(x => console.log(x)));
    console.log(this.userService.createUser('test').subscribe());
  }

}
