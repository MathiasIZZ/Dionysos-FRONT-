import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../auth/token-storage.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  private user?: any;
  private roles: string[] = [];

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    if(this.tokenStorageService.getToken()) {
      this.user = this.tokenStorageService.getUser();
      this.roles = this.user.roles;
    }


  }

}
