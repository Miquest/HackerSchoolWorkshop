import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.checkIfUserIsLoggedInElseRedirect();
  }

  checkIfUserIsLoggedInElseRedirect() {
    const id = localStorage.getItem('user_id');
    const name  =localStorage.getItem('user_name');

    if (id == undefined || name == undefined) {
      this.router.navigate(['/login'])
    }
  }

}
