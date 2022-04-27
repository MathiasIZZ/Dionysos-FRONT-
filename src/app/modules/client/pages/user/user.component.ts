import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  content ?: any;

  constructor(private userService: UserService) {
    this.content = this.userService.getUserBoard();
   }

  ngOnInit(): void {
    // const userObservable = of(this.content);
    // const userObserver = {
    //   next: (data: any) => console.log("UserObserver : " + data),
    //   error: (err: Error) => console.log("USerObserver Error : " + err),
    //   complete: () => console.log("Observer complete"),
    // };
    // userObservable.subscribe(userObserver);
    
    this.userService.getUserBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }
}
