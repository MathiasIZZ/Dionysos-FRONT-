import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Event } from 'src/app/models/event.entity';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrls: ['./list-event.component.scss']
})
export class ListEventComponent implements OnInit {

  events: Event[] = [];
  errorMessage?: string;

  // SI on veut gérer l'ajout d'un event pour un user connecté, faudra passer par le tokerStorageService
  // constructor(private eventService: EventService, private token: TokenStorageService) { }
  constructor(private eventService: EventService, private token: TokenStorageService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllEvents();
  }


  getAllEvents() {
    this.eventService.findAll().subscribe({
      next: (data) => {
        this.events = data;
        console.log('LIST Events : ', this.events.toString);
      },
      error: (err) => {
        this.errorMessage = err.message;
        console.log("LIST EVENT failed")
        this.toastr.error('Error', 'Events not found', {
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
