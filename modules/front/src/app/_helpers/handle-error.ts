import {Observable, of} from "rxjs";

export function handleError<T>(operation = 'operation', messageService, result?: T) {
  return (error: any): Observable<T> => {
    console.error(error.message)
    messageService.add(`${operation} à échoué: ${error.message[0].messages[0].message}`)
    return of(result as T)
  }
}
