import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Chat} from "../../../models/chat";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() chats: Chat[] | undefined;
  @Output() openChat = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  getUserNamesFromChat(chatId: string) : string {
    return this.chats?.filter(chat => chat.id === chatId)
      .map(chat => chat.users?.map(user => user.name)).join(", ") as string;
  }

  open(chatId: string) : void {
    this.openChat.emit(chatId);
  }
}
