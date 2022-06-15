import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import {ToastrService} from "ngx-toastr";

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

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.verifToken();



  }

  onSubmit(): void {
    const { username, password } = this.form;
    this.authService.login(username, password).subscribe({
      next: (data) => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        //TODO: pourquoi avoir reload la page apres la connexion ? ça bloque le toaster de notification
        // this.reloadPage();
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;

        console.log("data : " + data);
        this.toastr.success("", 'Connection successfully', {
          timeOut: 3000,
          progressBar: true
        });
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.isLoginFailed = true;
        console.log("failed")
        this.toastr.error('Utilisateur inconnu', 'Connection failed', {
          timeOut: 3000,
          progressBar: true
        });
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }

  goToProfile(): void {
    window.location.assign("");
  }

  verifToken(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.username = this.tokenStorage.getUser().username;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }




}
