import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as L from 'leaflet';
import { ToastrService } from 'ngx-toastr';
import { Event } from 'src/app/models/event.entity';
import { EventService } from 'src/app/services/event.service';
import { MarkerService } from 'src/app/services/marker.service';
import { PopupPanelService } from 'src/app/services/popup-panel.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss']
})
export class EditEventComponent implements OnInit {

  // form: EventDTO = {
  //   eventTitle: "",
  //   city: "", 
  //   hourBegin: new Date,
  //   hourEnd: new Date, 
  //   description: "",
  //   isAlive: true

  // };


  map?: any;
  cities: string = '/assets/data/french-cities.geojson';
  form = this.fb.group({
    eventTitle: "",
    city: "", 
    hourBegin: "",
    hourEnd: "", 
    description: "",
    isAlive: true
  });

  event?: Event;
  errorMessage?: string;
  hourBegin!: Date;
  events: Event[] = [];

  constructor(private eventService: EventService, 
      private toastr: ToastrService,
      private fb: FormBuilder,
      private http: HttpClient,
      private popupService: PopupPanelService) { }

  ngOnInit(): void {

  }

  onSubmit(): void {

    this.form = this.fb.group({
      eventTitle: this.form.get('eventTitle')?.value,
      city: this.form.get('city')?.value, 
      hourBegin: this.form.get('hourBegin')?.value.toString().replace("T"," "),
      hourEnd: this.form.get('hourEnd')?.value.toString().replace("T"," "), 
      description: this.form.get('description')?.value,
      isAlive: true
    });

    // this.form.patchValue(this.form.get('hourBegin')?.value.toString().replace("T"," "));
    // this.form.patchValue(this.form.get('hourBegin')?.value.toString().replace("T"," "));
    // this.form.get('hourBegin')?.value.toString().replace("T"," ");
    // this.form.get('hourBegin')?.value.toString().replace("T"," ");
    this.hourBegin = this.form.get('hourBegin')?.value;
   
    console.log("Vérif Format date debut : " + this.form.get('hourBegin')?.value);
    console.log("Vérif Format date debut : " + this.form.get('hourBegin')?.value);
    console.log("Vérif hourBegin : " + this.hourBegin);
    // this.eventService.save(this.event!).subscribe({
    // this.eventService.save(this.form.value).subscribe({

    this.eventService.save(this.form.value).subscribe({
      next: () => {
        // this.event = data;
        // this.form = data;
        console.log("data added : " + this.form.value);
        this.toastr.success("Ajout ok", 'Evénement ajouter avec succès', {
          timeOut: 3000,
          progressBar: true
        });
        // this.postCurrentPositionEventMarker(this.map);
      },
      error: (err) => {
        this.errorMessage = err.message;
        console.log("add event failed")
        this.toastr.error(this.errorMessage , 'Echec de l\'ajout d\'événement', {
          timeOut: 3000,
          progressBar: true
        });
      }
      
    });
  }
  makeEventMarkers(map: L.Map): any{
    this.getAllEvents();
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
            marker.bindPopup(this.popupService.makeEventPopup(e));
            marker.addTo(map);
          }
        }
      }
    })
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
  // postCurrentPositionEventMarker(map: L.Map): any {
  //   // Affiche par défaut la carte de la France
  //   // Après Autorisation: géolocalisation 
  //   map = L.map('map').setView([46.227638, 2.213749], 6);
  //   const tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
  //     maxZoom: 18,
  //     minZoom: 5,
  //     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>,' +
	// 		' © <a href="https://www.mapbox.com/">Mapbox</a>',
  //     id: 'mapbox/streets-v11',
  //     tileSize: 512,
	// 	  zoomOffset: -1
  //   });
  //   tiles.bindPopup(this.popupService.makeEventPopup(this.form.value));
  //   tiles.addTo(map);
  //   function onLocationFound(e: { accuracy: any; latlng: L.LatLngExpression; }) {
  //     var radius = e.accuracy;
  //     // L.marker(e.latlng).addTo(map)
  //     //     .bindPopup("You are within " + radius + " meters from this point").openPopup();
  //     // L.marker(e.latlng).bindPopup(this.popupService.makeEventPopup(this.form.value)).openPopup();
  //     L.marker(e.latlng).addTo(map);
          
  //     L.circle(e.latlng, radius).addTo(map);
  //     console.log(e.latlng);
  //   }
  //   function onLocationError(e: { message: any; }) {
  //     alert(e.message);
  //   }

  //   map.on('locationfound', onLocationFound);
  //   map.on('locationerror', onLocationError);

  //   map.locate({setView: true, maxZoom: 16});
  // }

}
