import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { User } from 'src/app/models/user.entity';
import { UserService } from 'src/app/services/user.service';
import {EventService} from "../../services/event.service";
import {Event} from "../../models/event.entity";
import {ToastrService} from "ngx-toastr";
import {MatPaginator} from "@angular/material/paginator";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {CategoryService} from "../../services/category.service";
import {Category} from "../../models/Category.entity";






@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable, { static: true }) table!: MatTable<any>;


  displayedColumns: string[] = [
    // '_id',
    'eventTitle',
    'city',
    // 'num',
    // 'street',
    'hourBegin',
    'hourEnd',
    'createdAt',
    // 'userLikes',
    // 'userDislikes',
    // 'usersParticipating',
    'category',
    // 'isAlive',
    'description',
    'authorId'
  ];

  displayColumnsUsers: string[] = [
    'id',
    'firstname',
    'lastname',
    'username',
    // 'password',
    'email',
  ];

  displayColumnsCategories: string[] = [
    'id',
  'name'
  ]

  dataSource!: MatTableDataSource<Event>;
  dataSourceUsers!: MatTableDataSource<User>;

  dataSourceCategories!: MatTableDataSource<Category>


  constructor(
    private eventService: EventService,
    private toastr: ToastrService,
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    private categoryService: CategoryService
  ) { }


  ngOnInit(): void {
    this.getAllEvents();
    this.getAllUsers();
    this.getAllCategories();
  }

  ngAfterViewInit(): void {

  }

  getAllCategories() {
    this.categoryService.findAll().subscribe({
      next: (data) => {
        this.dataSourceCategories = new MatTableDataSource<Category>(data);
        this.dataSourceCategories.paginator = this.paginator;
        this.cdr.detectChanges()
      },
      error: () => {
        this.toastr.error('Error', 'Impossible de charger les événements', {
          timeOut: 3000,
          progressBar: true
        });
      }
    })
  }

  getAllUsers() {
    this.userService.findAll().subscribe({
      next: (data) => {
        this.dataSourceUsers = new MatTableDataSource<User>(data);
        this.dataSourceUsers.paginator = this.paginator;
        this.cdr.detectChanges()
        console.log("tous les users", data)
      },
      error: () => {
        this.toastr.error('Error', 'Impossible de charger les événements', {
          timeOut: 3000,
          progressBar: true
        });
      }
    })
  }

  getAllEvents() {
    this.eventService.findAll().subscribe({
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



  addEvent() {
    window.location.assign("/client/add/event");
  }






}
