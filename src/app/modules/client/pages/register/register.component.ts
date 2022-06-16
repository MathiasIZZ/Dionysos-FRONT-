import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
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
        console.log("data : " + data.username + data.email + data.password);
        this.isSignup = true;
        this.isSignupFailed = false;
        this.toastr.success("", "Enregistrement réussi !", {
          progressBar: true,
          timeOut: 3000
        });
      setTimeout(this.goToHome, 1000)
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isSignupFailed  = true;
        this.toastr.error("", "Erreur lors de votre enregistrement", {
          progressBar: true,
          timeOut: 3000
        })
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }

  goToHome() {
    window.location.assign("/client/login");
  }

}
