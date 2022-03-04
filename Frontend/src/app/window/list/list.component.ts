import {Component, Input, OnInit} from '@angular/core';
import {Chat} from "../../../models/chat";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() chats: Chat[] | undefined;

  constructor() { }

  ngOnInit(): void {
  }
}
