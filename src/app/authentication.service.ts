import {Injectable} from '@angular/core';
import {environment} from "../environments/environment";
import {MessageService} from "./message.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";
import {handleError} from "./_helpers/handle-error";
import {AuthUser} from "./auth-user";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private api = environment.apiUrl + '/auth'

  constructor(private messageService: MessageService, private http: HttpClient) {
  }

  doLogin({email, password}): Observable<AuthUser> {
    return this.http.post<AuthUser>(this.api + '/local', {identifier: email, password}).pipe(
      catchError(handleError<AuthUser>('login', this.messageService, null))
    )
  }

  doSignup({email, password}): Observable<AuthUser> {
    return this.http.post<AuthUser>(this.api + '/local/register', {email, password}).pipe(
      catchError(handleError<AuthUser>('login', this.messageService, null))
    )
  }

  doLogout(): void{

  }
}
