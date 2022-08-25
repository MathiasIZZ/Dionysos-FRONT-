import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Event } from 'src/app/models/event.entity';
import { EventService } from 'src/app/services/event.service';
import { MarkerService } from 'src/app/services/marker.service';
import { PopupPanelService } from 'src/app/services/popup-panel.service';

@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrls: ['./list-event.component.scss']
})
export class ListEventComponent implements OnInit {

  private roles: string[] = [];
  map?: any;
  cities: string = '/assets/data/french-cities.geojson';
  events: Event[] = [];

  errorMessage?: string;
  isLoggedIn = false;
  username?: string;

  // SI on veut gérer l'ajout d'un event pour un user connecté, faudra passer par le tokerStorageService
  // constructor(private eventService: EventService, private token: TokenStorageService) { }
  constructor(private eventService: EventService, private tokenStorageService: TokenStorageService, private toastr: ToastrService,
    private http: HttpClient,
    private popUpService: PopupPanelService) { }


  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if(this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.username = user.username;
      // this.makeEventMarkers(this.map);
    }

    this.getAllEvents();
    this.makeEventMarkers(this.map);
    // this.makeEventMarkers(this.map);
    // this.getAdresseFromDataGouv();
    // this.getAdresseFromDataGouvByHttpClient();

  }


  getAllEvents() {

    // Dans le cas d'un visiteur, findAllReducted liste réduite
    // SI USER, utiliser findAll
    if(this.isLoggedIn) {
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
    } else {
      this.eventService.findAllReducted().subscribe({
        next: (data) => {
          this.events = data;
          console.log('LIST Events Reducted : ', this.events.toString);
  
        },
        error: (err) => {
          this.errorMessage = err.message;
          console.log("LIST EVENT Reducted failed")
          this.toastr.error('Error', 'Events not found', {
            timeOut: 3000,
            progressBar: true
          });
        }
      });
    }

  }

  addEvent() {
    window.location.assign("/client/add/event");
  }
  makeEventMarkers(map: L.Map): any{
    // this.getAllEvents();
    map = L.map('map').setView([46.227638, 2.213749], 6);
    const tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
      maxZoom: 18,
      minZoom: 5,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>,' +
			' © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox/streets-v11',
      tileSize: 512,
		  zoomOffset: -1
    });
    tiles.addTo(map);
    this.http.get(this.cities).subscribe((res: any) => {
      for(const e of this.events){
        for(const c of res.features) {
          if(e.city === c.properties.name) {
            const lon = c.geometry.coordinates[0];
            const lat = c.geometry.coordinates[1];
            const marker = L.marker([lat, lon]);
            console.log('TEsT', c.properties.name);
            c.properties.event = e;
            marker.bindPopup(this.popUpService.makeEventPopup(e));
            marker.addTo(map);
          }
        }
      }
    })
  }
    // TEST GEOCODING API ADRESSE
    getAdresseFromDataGouv() {
      // TEST ADDOK Js adapté mais pas ouf
      const url = new URL('http://api-adresse.data.gouv.fr/search');
      const params = {q: 'lyo'};
      // Object.keys(params).forEach(
      //   key => url.searchParams.append(key, params[key])
      // )
      url.search = new URLSearchParams(params).toString();
      // fetch(url)
      fetch(new URLSearchParams(params).toString())
        .then(response => {
          if(response.status >= 200 && response.status < 300) {
            console.log('TEST API', response)
            return response;
          } else {
            // error.response = response;
            throw new Error(response.statusText);
          }
        })
        .then(response => response.json)
        .then(data => console.log('request succeeded whith JSON response', data))
        .catch(error => console.log('request failed', error));

    }

    // getAdresseFromDataGouvByHttpClient() {
    //   // TEST par HttpClient
    //   const params = {q: 'lyo'};
    //   let url = `http://api-adresse.data.gouv.fr/search/?q=${params}`;
    //   console.log('RETURN TEST API : ', this.http.get<JSON>(url).subscribe((data) =>
    //     console.log('DATA API = ', data)
    //   ));
    //   return this.http.get<JSON>(url);

    // }
}
