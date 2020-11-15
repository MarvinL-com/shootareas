import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {mustMatch} from "../_helpers/must-match.validator";
import {AuthenticationService} from "../authentication.service";

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit {
  loginForm: FormGroup
  signupForm: FormGroup


  constructor(private fb: FormBuilder, private authService: AuthenticationService) {
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
    this.authService.doLogin(this.loginForm.value)
  }

  handleSignup() {
    if (this.signupForm.invalid) return
    console.log('success:', this.loginForm.value)
  }
}
