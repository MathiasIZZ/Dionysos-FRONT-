import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  urlLogo="../../../assets/images/logo.jpg";
  urlImg="../../../assets/images/";

  constructor() {

   }

  ngOnInit(): void {
  }

}
