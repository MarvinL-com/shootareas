import {Component} from '@angular/core';
import {LocalStorageService} from "./local-storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ShootAreas';

  constructor(private ls: LocalStorageService) {
  }

  get isLogin() {
    return this.ls.get('token') !== null;
  }

  get user() {
    return this.ls.getObject('user')
  }
}
