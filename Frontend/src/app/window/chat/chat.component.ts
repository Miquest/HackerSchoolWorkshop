import {Component, Input, OnInit} from '@angular/core';
import {Chat} from "../../../models/chat";
import {MessageService} from "../../../services/message.service";
import {Message} from "../../../models/message";
import {User} from "../../../models/user";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @Input() chat: Chat | undefined;

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
  }

  getUserNamesFromChat() : string {
    return this.chat?.users.map(user => user.name).join(", ") as string;
  }

  sendMessage(text: string) {
    const id: string = (JSON.parse(localStorage.getItem('user') ?? '') as User).id

    let message: Message = {
      text: text,
      senderId: id,
      receiverId: [
        id
      ],
      toAllUsers: false,
      timestamp: "0"
    }
    this.messageService.sendMessage(message).subscribe();
  }
}
