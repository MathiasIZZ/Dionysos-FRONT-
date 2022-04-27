import { Injectable } from '@angular/core';
import { User } from '../models/user.entity';

const TOKEN_KEY = 'auth-token'; // peut être à modifier
const USER_KEY = 'auth-user';  // peut être à modifier

@Injectable({
  providedIn: 'root'
})
/**
 * Classe qui sera peut être à modifier en fonction du back
 */
export class TokenStorageService {

  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
    console.log("Logout, session clear")
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      console.log("TokenStorage, user : " + user);
      return JSON.parse(user);
    }
    return {};
  }
  
}
