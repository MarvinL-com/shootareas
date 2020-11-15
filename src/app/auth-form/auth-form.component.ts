import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {mustMatch} from "../_helpers/must-match.validator";
import {AuthenticationService} from "../authentication.service";
import {LocalStorageService} from "../local-storage.service";

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit {
  @Input() login
  @Input() signup
  loginForm: FormGroup
  signupForm: FormGroup


  constructor(private fb: FormBuilder, private authService: AuthenticationService, private ls: LocalStorageService) {
  }

  get f() {
    return this.loginForm.controls
  }

  get fs() {
    return this.signupForm.controls
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required]]
    })
    this.signupForm = this.fb.group(
      {
        'email': ['', [Validators.required, Validators.email]],
        'password': ['', [Validators.required, Validators.minLength(8)]],
        'confirmPassword': ['']
      }, {validator: mustMatch('password', 'confirmPassword')})
  }

  handleLogin() {
    if (this.loginForm.invalid) return
    this.login(this.loginForm.value)
  }

  handleSignup() {
    if (this.signupForm.invalid) return
    this.signup(this.signupForm.value)
  }
}
