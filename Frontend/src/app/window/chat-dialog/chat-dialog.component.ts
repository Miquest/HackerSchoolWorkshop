import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {User} from "../../../models/user";
import {FormControl} from "@angular/forms";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {find, first, map, Observable, startWith} from "rxjs";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";

@Component({
  selector: 'app-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.scss']
})
export class ChatDialogComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  userControl = new FormControl();
  filteredUsers: Observable<User[]> | undefined;
  allUsers: User[] = [];
  selectedUsers: User[] = [];

  @ViewChild('userInput') userInput!: ElementRef<HTMLInputElement>;

  constructor(public dialogRef: MatDialogRef<ChatDialogComponent>, @Inject(MAT_DIALOG_DATA) public users: User[],) {
    this.allUsers = users;
  }

  ngOnInit(): void {
    this.filteredUsers = this.userControl.valueChanges.pipe(
      startWith(null),
      map((username: string | null) => (username ? this._filter(username) : this.allUsers.slice()))
    );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.selectedUsers.push(this.allUsers.find(user => user.name === value) as User);
    }
    event.chipInput!.clear();
    this.userControl.setValue(null);
  }

  remove(user: User): void {
    const index = this.selectedUsers.indexOf(user);
    if (index >= 0) {
      this.selectedUsers.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedUsers.push(this.allUsers.find(user => user.name === event.option.value) as User);
    this.userControl.setValue(null);
  }

  private _filter(value: string): User[] {
    return this.allUsers.filter(user => user.name.includes(value));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
