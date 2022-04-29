import { Component, OnInit } from '@angular/core';
import { NotfoundService } from 'src/app/services/notfound.service';
@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss']
})
export class NotfoundComponent implements OnInit {

  urlLogo = "../../../assets/images/logo.jpg";

  constructor(public nav: NotfoundService) {

  }

  ngOnInit(): void {
    this.nav.hide();
    this.nav.doSomethingElseUseful();
  }

}
