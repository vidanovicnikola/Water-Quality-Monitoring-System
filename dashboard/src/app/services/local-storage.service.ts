import { Injectable } from '@angular/core';

export const WARNINGS_KEY = 'warnings';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  saveData(key: string, value: unknown): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getData(key: string): unknown {
    var data = localStorage.getItem(key);
    if (data != null) {
      data = JSON.parse(data);
    }
    return data;
  }

  removeData(key: string): void {
    localStorage.removeItem(key);
  }
}
