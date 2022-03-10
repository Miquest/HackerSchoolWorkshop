import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {interval, map, Observable, startWith, Subscription} from "rxjs";
import {Chat} from "../../models/chat";
import {MatDialog} from "@angular/material/dialog";
import {ChatDialogComponent} from "./chat-dialog/chat-dialog.component";
import {Guid} from "guid-typescript";
import {Message} from "../../models/message";
import {MessageService} from "../../services/message.service";

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss']
})
export class WindowComponent implements OnInit, OnDestroy {
  user!: User;
  userControl = new FormControl();
  users: User[] = [];
  filteredUsers: Observable<User[]> | undefined;
  openedChat: Chat | undefined;
  receiveMessagesInterval!: Subscription;
  chats: Chat[] = [];

  constructor(private userService: UserService, private messageService: MessageService, private router: Router,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.checkIfUserIsLoggedInElseRedirect();
    this.loadUsers();

    this.filteredUsers = this.userControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );

    this.receiveMessagesInterval = interval(500).pipe().subscribe(() => this.receiveMessages());
  }

  ngOnDestroy(): void {
    this.receiveMessagesInterval.unsubscribe();
  }

  checkIfUserIsLoggedInElseRedirect() : void {
    const user = localStorage.getItem('user');

    if (user != undefined) {
      this.user = JSON.parse(user) as User;
    }else {
      this.router.navigate(['/login'])
    }
  }

  receiveMessages(): void {
    this.messageService.receiveMessages(this.user.id).subscribe((resp) => {
      const messages: Message[] = resp.body as Message[];
      messages.forEach(message => {
        this.readMessageAndTranslate(message);
      });
    });
  }

  readMessageAndTranslate(message: Message) {
    message.receiverId.splice(message.receiverId.indexOf(this.user.id), 1);
    let group: string[] = this.createUserGroupFromMessage(message);
    let chat: Chat | undefined = this.getChatByGroup(group);
    if (chat === undefined) {
      this.addNewChatToChatListAndAddMessage(group, message);
    }else {
      chat.messages.push(message);
    }
  }

  createUserGroupFromMessage(message: Message): string[] {
    let group: string[] = [];
    message.receiverId.forEach(receiver => {
      group.push(receiver);
    });
    group.push(message.senderId);
    return group;
  }

  getChatByGroup(group: string[]): Chat | undefined {
    return this.chats.find(chat => {
      let x: string[] = [];
      chat.users.forEach(y => x.push(y.id));
      return x.filter(y => group.indexOf(y) < 0);
    });
  }

  addNewChatToChatListAndAddMessage(group: string[], message: Message) {
    let chat: Chat = {
      id: Guid.create().toString(),
      users: this.getUsersById(group),
      messages: [message]
    }
    this.chats.push(chat);
  }

  getUsersById(userIds: string[]): User[] {
    let users: User[] = [];
    userIds.forEach(userId => {
      let user: User | undefined = this.users.find(user => user.id === userId);
      if (user !== undefined) {
        users.push(user);
      }
    });
    return users;
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

  createNewChat(): void {
    let getUsers = this.userService.getUsers().subscribe((resp) => {
      const dialogRef = this.dialog.open(ChatDialogComponent, {
        width: '250px',
        data: resp.body
      });

      let getUsersFromDialog = dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {
          let chat: Chat = {
            id: Guid.create().toString(),
            users: result,
            messages: []
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
