import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  content?: any;
  roles: string[] = [];
  users?: string[] = [];

  constructor(
    private userService: UserService, 
    private token: TokenStorageService) {
   }

  ngOnInit(): void {
    this.roles = this.token.getUser().roles;
    
    for (let role of this.roles) {  
      if (role === "ROLE_USER"){
        this.userService.getUserBoard().subscribe({
          next: (data) => {
            this.content = data;
            console.log('USerBoard : ',this.content);
          },
          error: (err) => {
            this.content = JSON.stringify(err.message);
          }
        });
        break;
      } 
      if (role === "ROLE_MODERATOR") {
        this.userService.getModBoard().subscribe({
          next: (data) => {
            this.content = data;
            console.log('ModBoard : ',this.content);
          },
          error: (err) => {
            this.content = JSON.stringify(err.message);
          }
        });
        break;
      }
      if (role === "ROLE_ADMIN") {
        this.userService.getAdminBoard().subscribe({
          next: (data) => {
            this.content = data;
            console.log('Admin : ',this.content);
          },
          error: (err) => {
            this.content = JSON.stringify(err.message);
          }
        });
        this.userService.findAll().subscribe({
          next: (data) => {
            this.users = data;
            console.log('FindAll USer : ',this.users);
          },
          error: (err) => {
            this.content = JSON.stringify(err.message);
          }
        });
        break;
      }
    }
  }
}
