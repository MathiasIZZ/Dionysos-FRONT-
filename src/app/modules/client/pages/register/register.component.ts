import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: any = {
    username: null,
    email: null,
    password: null
  };
  isSignup = false;
  isSignupFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private toastr: ToastrService) { }

  ngOnInit(): void { }

  onSubmit(): void {
    const { username, email, password } = this.form;
    this.authService.register(username, email, password).subscribe({
      next: (data) => {
        console.log("data : " + data);
        this.isSignup = true;
        this.isSignupFailed = false;
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isSignupFailed  = true;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }

  goToHome() {
    window.location.assign("");
  }

}
