import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() {
  }

  set(key: string, value: string) {
    localStorage.setItem(key, value)
  }

  setObject(key: string, value: object) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  getObject(key: string) {
    return JSON.parse(this.get(key))
  }

  get(key: string) {
    return localStorage.getItem(key)
  }

  remove(key: string) {
    localStorage.removeItem(key)
  }
}
