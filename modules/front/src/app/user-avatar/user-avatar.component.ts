import { Component, OnInit, Input} from '@angular/core';
import {User} from "../user";

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss']
})
export class UserAvatarComponent implements OnInit {
  @Input() user : User
  constructor() { }

  ngOnInit(): void {
  }
  userLetters(): string {
    return this.user.username.substring(0,2).toUpperCase()
  }
}
