import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { User } from 'src/app/models/user.entity';
import { UserService } from 'src/app/services/user.service';
import {EventService} from "../../services/event.service";
import {Event} from "../../models/event.entity";
import {ToastrService} from "ngx-toastr";
import {MatPaginator} from "@angular/material/paginator";
import {MatTable, MatTableDataSource} from "@angular/material/table";






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

  dataSource!: MatTableDataSource<Event>;



  constructor(
    private eventService: EventService,
    private toastr: ToastrService,
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) { }


  ngOnInit(): void {
    this.getAllEvents();

  }

  ngAfterViewInit(): void {

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






  // ELEMENT_DATA: IEvent[] = [
  //   {name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  //   {name: 'Helium', weight: 4.0026, symbol: 'He'},
  //   {name: 'Lithium', weight: 6.941, symbol: 'Li'},
  //   {name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  //   {name: 'Boron', weight: 10.811, symbol: 'B'},
  //   {name: 'Carbon', weight: 12.0107, symbol: 'C'},
  //   {name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  //   {name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  //   {name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  //   { name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  //   { name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  //   { name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  //   { name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  //   { name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  //   { name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  //   { name: 'Sulfur', weight: 32.065, symbol: 'S'},
  //   { name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  //   { name: 'Argon', weight: 39.948, symbol: 'Ar'},
  //   { name: 'Potassium', weight: 39.0983, symbol: 'K'},
  //   { name: 'Calcium', weight: 40.078, symbol: 'Ca'},
  // ];




  addEvent() {
    window.location.assign("/client/add/event");
  }







  // displayedColumns: string[] = [
  //   '_id',
  //   'eventTitle',
  //   'city',
  //   'num',
  //   'street',
  //   'hourBegin',
  //   'hourEnd',
  //   'createdAt',
  //   'userLikes',
  //   'userDislikes',
  //   'usersParticipating',
  //   'category',
  //   'isAlive',
  //   'description',
  //   'authorId'
  // ];



}
