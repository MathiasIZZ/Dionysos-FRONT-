// @ts-ignore

import {CanActivate, Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {TokenStorageService} from "./auth/token-storage.service";

@Injectable({
  providedIn: "root"
})
export class AdminPASSGuard implements CanActivate {

  private isLoggedIn = false;
  private username?: string;
  private roles: String[] = [];

  constructor(private tokenStorageService: TokenStorageService, private router: Router) {}


  canActivate(): boolean {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if(this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      console.log(JSON.stringify(user));
      this.roles = user.roles;
      this.username = user.username;
      console.log(this.roles);
      if(this.roles == ['ROLE_ADMIN']) {
        console.log("true");
        return true;
      }
    }
    return false;
    console.log("false");
  }





}
