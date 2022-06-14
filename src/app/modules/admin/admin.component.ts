import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { User } from 'src/app/models/user.entity';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  publicContent?: string;
  userContent?: string;
  username?: string;
  errorContent?: string;
  roles?: string[];
  user?: User;
  route?: string;

  constructor(private userService: UserService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {

    if(this.tokenStorage.getToken()) {
      this.username = this.tokenStorage.getUser().username;
      this.user = this.tokenStorage.getUser();
      this.roles = this.tokenStorage.getUser().roles;
      console.log('ROLES : ', this.roles?.values);

      this.roles = this.tokenStorage.getUser().roles;
    }
    this.userService.getPublicContent().subscribe((data) => {
      this.publicContent = data;
      console.log(this.publicContent);
    });
    if (this.roles){
      for (let role of this.roles) {
        if (role === "ROLE_USER") {
          this.route = " api/test/user";
          this.userService.getUserBoard().subscribe({
            next: (dataU) => {
              this.userContent = dataU;
              console.log(this.userContent);
            },
            error: (err) => {
              this.errorContent = err.message;
              console.log(this.errorContent);
            }
          });
          break;
        }
        if (role === "ROLE_MODERATOR") {
          this.route = " api/test/mod";
          this.userService.getModBoard().subscribe({
            next: (dataU) => {
              this.userContent = dataU;
              console.log(this.userContent);
            },
            error: (err) => {
              this.errorContent = err.message;
              console.log(this.errorContent);
            }
          });
          break;
        }
        if (role === "ROLE_ADMIN") {
          this.route = " api/test/admin";
          this.userService.getAdminBoard().subscribe({
            next: (dataU) => {
              this.userContent = dataU;
              console.log(this.userContent);
            },
            error: (err) => {
              this.errorContent = err.message;
              console.log(this.errorContent);
            }
          });
          break;
        }
      }
    } else {
      this.route = "Aucune route "
      this.userContent = "USER non connecté "
    }
  }
}
