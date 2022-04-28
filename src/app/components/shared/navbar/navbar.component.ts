import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  private roles: string[] = [];
  isLoggedIn = false;
  username?: string;

  constructor(
    private tokenStorageService : TokenStorageService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    console.log(this.router.url)

    if(this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      console.log("NavBar, user : " + JSON.stringify(user))
      this.roles = user.roles;
      this.username = user.username;
      console.log("NavBar, username : " + user.username)
    }
  }  

  logout(): void {
    this.isLoggedIn = false;
    this.tokenStorageService.signOut();
    this.router.navigateByUrl("");

  }

}
