import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Region} from "./region";
import {MessageService} from "./message.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {catchError} from "rxjs/operators";
import {handleError} from "./_helpers/handle-error";
import {City} from "./city";

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private api = environment.apiUrl + '/communes'

  constructor(private messageService: MessageService, private http: HttpClient) { }

  doGetCitiesByRegion(region: Region): Observable<City[]>{
    return this.http.get<City[]>(this.api+'?region.id='+region.id).pipe(catchError(handleError<City[]>('getCitiesByRegion', this.messageService)))
  }
}
