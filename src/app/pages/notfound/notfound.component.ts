import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss']
})
export class NotfoundComponent implements OnInit {

  urlLogo="../../../assets/images/logo.jpg";

  constructor() { }

  ngOnInit(): void {
  }

}
