import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  username?: string;
  roles: string[] = [];

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if(this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.username = this.tokenStorage.getUser().username;
      this.roles = this.tokenStorage.getUser().roles;
      console.log("Login, ngOnInit : " + this.roles);
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    // this.authService.login(username, password).subscribe(
    //   data => {
    //     this.tokenStorage.saveToken(data.accessToken);
    //     this.tokenStorage.saveUser(data);

    //     this.isLoginFailed = false;
    //     this.isLoggedIn = true;
    //     this.roles = this.tokenStorage.getUser().roles;
    //     this.reloadPage();
    //     console.log("data : " + data);
    //   },
    //   err => {
    //     this.errorMessage = err.error.message;
    //     this.isLoginFailed = true;
    //   }
    // );
    this.authService.login(username, password).subscribe({
      next: (data) => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.reloadPage();
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        
        console.log("data : " + data);
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
   
  }

  reloadPage(): void {
    window.location.reload();
  }

  goToProfile() {
    window.location.assign("/client/profile");
  }

}
