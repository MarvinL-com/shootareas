import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {AuthenticationService} from "../authentication.service";
import {LocalStorageService} from "../local-storage.service";
import {MessageService} from "../message.service";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private location: Location,
              private authService: AuthenticationService,
              private ls: LocalStorageService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    if (this.ls.get('token') !== null) {
      this.location.back()
    }
  }

  handleLogin(formData) {
    this.authService.doLogin(formData).subscribe(({jwt, user}) => {
        this.ls.set('token', jwt)
        this.ls.setObject('user', user)
        this.location.back()
        this.messageService.add('Connexion réussie')
      }
    )
  }

  handleSignup(formData) {
    this.authService.doSignup(formData).subscribe(({jwt, user}) => {
        this.ls.set('token', jwt)
        this.ls.setObject('user', user)
        //todo go to complete profile
      }
    )
  }
}
