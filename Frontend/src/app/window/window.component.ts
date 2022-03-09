import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {map, Observable, startWith} from "rxjs";
import {Chat} from "../../models/chat";
import {MatDialog} from "@angular/material/dialog";
import {ChatDialogComponent} from "./chat-dialog/chat-dialog.component";
import {Guid} from "guid-typescript";

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
  openedChat: Chat | undefined;

  chats: Chat[] = [];

  constructor(private userService: UserService, private router: Router, public dialog: MatDialog) { }

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

  openChat($chatId: string) {
    this.openedChat = this.chats.find(chat => chat.id === $chatId);
  }

  openDialog(): void {
    let getUsers = this.userService.getUsers().subscribe((resp) => {
      const dialogRef = this.dialog.open(ChatDialogComponent, {
        width: '250px',
        data: resp.body
      });

      let getUsersFromDialog = dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {
          let chat: Chat = {
            id: Guid.create().toString(),
            users: result
          }
          this.chats.push(chat);
          this.openChat(chat.id);
        }
        getUsers.unsubscribe();
        getUsersFromDialog.unsubscribe();
      });
    });
  }
}
