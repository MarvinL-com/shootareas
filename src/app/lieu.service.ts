import {Injectable} from '@angular/core';
import {Lieu} from "./lieu";
import {Observable} from "rxjs";
import {MessageService} from "./message.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {catchError} from "rxjs/operators";
import {handleError} from "./_helpers/handle-error";

@Injectable({
  providedIn: 'root'
})
export class LieuService {
  private api = environment.apiUrl + '/lieux'

  constructor(private messageService: MessageService, private http: HttpClient) {
  }

  doGetLieux(): Observable<Lieu[]> {
    return this.http.get<Lieu[]>(this.api).pipe(
      catchError(handleError<Lieu[]>('getLieux', this.messageService))
    )
  }

  doGetLieuBySlug(slug: string): Observable<Lieu[]> {
    return this.http.get<Lieu[]>(`${this.api}?slug=${slug}`).pipe(
      catchError(handleError<Lieu[]>('getLieuBySlug', this.messageService)))
  }

  doSearchLieuByNom(nom: string): Observable<Lieu[]>{
    return this.http.get<Lieu[]>(`${this.api}?nom_contains=${nom}`).pipe(
      catchError(handleError<Lieu[]>('getLieuByNom', this.messageService)))
  }

  doGetLieuByRandom(): Observable<Lieu> {
    return this.http.get<Lieu>(this.api + '/random').pipe(
      catchError(handleError<Lieu>('getLieuByRandom', this.messageService))
    )
  }

}
