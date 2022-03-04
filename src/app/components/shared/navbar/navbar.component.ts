import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // myFunction() {
  //   let x = document.getElementById("myTopnav");
  //   if (x!== null) {
  //     if (x.className === "topnav") {
  //       x.className += " responsive";
  //     } else {
  //       x.className = "topnav";
  //     }
  //   }
  // }

  
}
