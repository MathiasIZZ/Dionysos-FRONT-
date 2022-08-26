import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  errorMsg?: string;
  errorMsg2?: string;
  id!: string;
  user?: any;
  showUpdateEmail = false;
  showErrorEmail = false;
  showUpdatePassword = false;
  showErrorPassword = false;


  emailForm: FormGroup = this.fb.group({
    email: ['', Validators.email]
  })
  passwordForm: FormGroup = this.fb.group({
    password: ['', Validators.required],
    newPassword: ['', Validators.required]
  })

  constructor(private tokenStorage: TokenStorageService,
              private fb : FormBuilder,
              private userService: UserService) { }

  ngOnInit(): void {
    if(this.tokenStorage.getToken()) {
      this.user = this.tokenStorage.getUser();
      this.id = this.user.id;
    }
    this.initUser();
  }

  initUser() {
    this.userService.findById(this.id).subscribe(data => {
      this.user = data;
      this.emailForm.patchValue({email: this.user.email});
    });
  }

  updateEmail() {
    this.userService.updateEmail(
      this.user
    ).subscribe({
      next: () => {
        this.showUpdateEmail = true;
        console.log("Update Email ok !!");
      },
      error: (err) => {
        this.showErrorEmail = true;
        this.errorMsg = err.error.message;
        console.log(this.showErrorEmail);
        console.log("Update Email Fail !!");
      }
    });
    this.showUpdateEmail = false;
    this.showErrorEmail = false;
  }
  

  updatePassword() {
    this.userService.updatePassword(
      this.user
    ).subscribe({
      next: () => {
        this.showUpdatePassword = true;
        console.log("Update Paswword ok !!");
      },
      error: (err) => {
        this.showErrorPassword = true;
        this.errorMsg2 = err.error.message;
        console.log("Update Paswword fail !!");
      }
    });
    this.showUpdatePassword = false;
    this.showErrorPassword = false;
  }

}
