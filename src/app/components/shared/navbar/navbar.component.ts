import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { NotfoundService } from 'src/app/services/notfound.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  private roles: string[] = [];
  isLoggedIn = false;
  username?: string;

  isAdmin = false;
  isModerator = false;
  isUser = false;


  constructor(
    private tokenStorageService : TokenStorageService,
    private router: Router,
    public nav: NotfoundService
    ) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    console.log(this.router.url)

    if(this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.username = user.username;
    }

    if(this.roles.includes('ROLE_ADMIN')) {
      this.isAdmin = true;
    } else if(this.roles.includes('ROLE_MODERATOR')) {
      this.isModerator = true;
    } else {
      this.isUser = true
    }


  }

  logout(): void {
    this.isLoggedIn = false;
    this.tokenStorageService.signOut();
    this.router.navigateByUrl("").then(() => {
      window.location.reload();
    });
  }

}
