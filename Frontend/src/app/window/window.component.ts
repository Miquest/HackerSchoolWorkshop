import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {map, Observable, startWith} from "rxjs";

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss']
})
export class WindowComponent implements OnInit {
  username: string | undefined;
  userControl = new FormControl();
  users: User[] = [];
  filteredUsers: Observable<User[]> | undefined;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.checkIfUserIsLoggedInElseRedirect();
    this.loadUsers();

    this.filteredUsers = this.userControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  checkIfUserIsLoggedInElseRedirect() : void {
    const user = localStorage.getItem('user');

    if (user != undefined) {
      const myUser = JSON.parse(user) as User;
      this.username = myUser.name;
    }else {
      this.router.navigate(['/login'])
    }
  }

  loadUsers() : void {
    this.userService.getUsers().subscribe(res => {
      this.users = res.body as User[];
    });
  }

  _filter(value: string): User[] {
    const filterValue = value.toLowerCase();
    return this.users.filter(user => user.name.toLowerCase().includes(filterValue));
  }
}
