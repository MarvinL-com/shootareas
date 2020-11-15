import {Observable, of} from "rxjs";

export function handleError<T>(operation = 'operation', messageService, result?: T) {
  return (error: any): Observable<T> => {
    console.error(error)
    messageService.add(`${operation} à échoué: ${error.message}`)
    return of(result as T)
  }
}
