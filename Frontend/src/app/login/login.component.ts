import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {take} from "rxjs";
import {User} from "../../models/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  login(username: string) : void {
    this.createUserIfUsernameIsFree(username)
  }

  createUserIfUsernameIsFree(username: string) : void {
    this.userService.checkIfUsernameIsFree(username)
      .pipe(take(1))
      .subscribe(res => {
        const check = res.body as boolean;
        if (check) {
          this.createUser(username);
        }else {
          this.usernameAlreadyExists(username);
        }
      });
  }

  createUser(username: string) : void {
    this.userService.createUser(username)
      .pipe(take(1))
      .subscribe((user: User) => {
        this.saveUserInLocalStorage(user);
        this.redirectToChat();
      });
  }

  saveUserInLocalStorage(user: User) : void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  redirectToChat() : void {
    this.router.navigate(['/chat']);
  }

  usernameAlreadyExists(username: string) : void {
    alert("Username: " + username + " already exists!");
  }
}
