import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { User } from 'src/app/models/user.entity';
import { UserService } from 'src/app/services/user.service';
import {EventService} from "../../services/event.service";
import {Event} from "../../models/event.entity";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {


  events: Event[] = [];

  constructor(private eventService: EventService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllEvents();
  }

  getAllEvents() {
    this.eventService.findAll().subscribe({
      next: (data) => {
        this.events = data;
        console.log(this.events.toString);
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
