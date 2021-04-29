import { Injectable } from '@angular/core';
import {Region} from "./region";
import {Observable} from "rxjs";
import {MessageService} from "./message.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {catchError} from "rxjs/operators";
import {handleError} from "./_helpers/handle-error";
import {Lieu} from "./lieu";

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  private api = environment.apiUrl + '/regions'
  constructor(private messageService: MessageService, private http: HttpClient) { }

  doGetRegions(): Observable<Region[]>{
    return this.http.get<Region[]>(this.api).pipe(
      catchError(handleError<Region[]>('getRegion', this.messageService))
    )
  }
}
