import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {LocalStorageService} from "./local-storage.service";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class UniversalAppInterceptor implements HttpInterceptor {
  constructor(private ls: LocalStorageService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.ls.get('token')
    if (token !== null) req = req.clone({url: req.url, setHeaders: {Authorization: `Bearer ${token}`}})
    return next.handle(req)
  }
}
