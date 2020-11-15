import {Injectable} from '@angular/core';
import {environment} from "../environments/environment";
import {MessageService} from "./message.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "./user";
import {catchError} from "rxjs/operators";
import {handleError} from "./_helpers/handle-error";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private api = environment.apiUrl + '/auth'

  constructor(private messageService: MessageService, private http: HttpClient) {
  }

  doLogin(formData): Observable<User> {
    return this.http.post<User>(this.api + '/local', formData).pipe(
      catchError(handleError<User>('login', this.messageService, null))
    )
  }

  doSignup() {
  }
}
