import {Component, Input, OnInit} from '@angular/core';
import {Chat} from "../../../models/chat";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @Input() chat: Chat | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  getUserNamesFromChat() : string {
    return this.chat?.users.map(user => user.name).join(", ") as string;
  }
}
