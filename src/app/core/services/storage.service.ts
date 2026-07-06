import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  
  public saveLocalStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getLocalStorage(key: string){
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

}
