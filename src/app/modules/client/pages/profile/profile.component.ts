import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { EventService } from 'src/app/services/event.service';
import {ToastrService} from "ngx-toastr";

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
  role?: any;
  // showUpdateEmail = false;
  // showErrorEmail = false;
  // showUpdatePassword = false;
  // showErrorPassword = false;


  // emailForm: FormGroup = this.fb.group({
  //   email: ['', Validators.email]
  // })
  // passwordForm: FormGroup = this.fb.group({
  //   password: ['', Validators.required],
  //   newPassword: ['', Validators.required]
  // })

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatTable, { static: true }) table!: MatTable<any>;


  displayedColumns: string[] = [
    // '_id',
    'eventTitle',
    'city',
    'num',
    'street',
    'hourBegin',
    'hourEnd',
    'createdAt',
    'userLikes',
    'userDislikes',
    'usersParticipating',
    'category',
    // 'isAlive',
    'description'
    // 'authorId'
  ];

  dataSource!: MatTableDataSource<Event>;
  
  constructor(private tokenStorage: TokenStorageService,
              private toastr: ToastrService,
              private eventService: EventService,
              private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    if(this.tokenStorage.getToken()) {
      this.user = this.tokenStorage.getUser();
      this.id = this.user.id;
      this.role = this.user.roles[0];
      this.getUserEvents();
    }
    // this.initUser();
    
  }
  getUserEvents() {
    this.eventService.findByAuthorId(this.id).subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource<Event>(data);
        this.dataSource.paginator = this.paginator;
        this.cdr.detectChanges();
      },
      error: () => {
        this.toastr.error('Error', 'Impossible de charger les événements', {
          timeOut: 3000,
          progressBar: true
        });
      }
    });
  }

  // initUser() {
  //   this.userService.findById(this.id).subscribe(data => {
  //     this.user = data;
  //     this.emailForm.patchValue({email: this.user.email});
  //   });
  // }

  // updateEmail() {
  //   this.userService.updateEmail(
  //     this.user
  //   ).subscribe({
  //     next: () => {
  //       this.showUpdateEmail = true;
  //       console.log("Update Email ok !!");
  //     },
  //     error: (err) => {
  //       this.showErrorEmail = true;
  //       this.errorMsg = err.error.message;
  //       console.log(this.showErrorEmail);
  //       console.log("Update Email Fail !!");
  //     }
  //   });
  //   this.showUpdateEmail = false;
  //   this.showErrorEmail = false;
  // }
  

  // updatePassword() {
  //   this.userService.updatePassword(
  //     this.user
  //   ).subscribe({
  //     next: () => {
  //       this.showUpdatePassword = true;
  //       console.log("Update Paswword ok !!");
  //     },
  //     error: (err) => {
  //       this.showErrorPassword = true;
  //       this.errorMsg2 = err.error.message;
  //       console.log("Update Paswword fail !!");
  //     }
  //   });
  //   this.showUpdatePassword = false;
  //   this.showErrorPassword = false;
  // }

}
