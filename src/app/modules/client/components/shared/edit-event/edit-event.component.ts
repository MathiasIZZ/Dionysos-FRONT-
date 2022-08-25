import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as L from 'leaflet';
import { ToastrService } from 'ngx-toastr';
import { Event } from 'src/app/models/event.entity';
import { EventService } from 'src/app/services/event.service';
import { MarkerService } from 'src/app/services/marker.service';
import { PopupPanelService } from 'src/app/services/popup-panel.service';

import {Category} from "../../../../../models/Category.entity";
import {CategoryService} from "../../../../../services/category.service";
import {TokenStorageService} from "../../../../../auth/token-storage.service";
import { Router } from '@angular/router';


@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss']
})
export class EditEventComponent implements OnInit {

  map?: any;
  cities: string = '/assets/data/french-cities.geojson';
  form = this.fb.group({
    eventTitle: "",
    num: "",
    street: "",
    city: "",
    hourBegin: "",
    hourEnd: "",
    createdAt: new Date(),
    category: "",
    description: "",
    isAlive: true,
    author: String
  });

  authorId?: string;

  event?: Event;
  errorMessage?: string;
  hourBegin!: Date;
  events: Event[] = [];
  categories: Category[] = [];
  dataFromApiAdresse: any;
  category: Category = new Category();



  constructor(private eventService: EventService,
      private cateoryService: CategoryService,
      private toastr: ToastrService,
      private fb: FormBuilder,
      private http: HttpClient,
      private router: Router,
      private popupService: PopupPanelService,
      private tokenStorageService: TokenStorageService) { }



  ngOnInit(): void {
    this.getAllCategories();
    const user = this.tokenStorageService.getUser();
    this.authorId = user.id;

  }

  onSubmit(): void {
   
    this.form = this.fb.group({
      eventTitle: this.form.get('eventTitle')?.value,
      num: this.form.get('num')?.value,
      street: this.form.get('street')?.value,
      city: this.form.get('city')?.value,
      hourBegin: this.form.get('hourBegin')?.value.toString().replace("T"," "),
      hourEnd: this.form.get('hourEnd')?.value.toString().replace("T"," "),
      createdAt: new Date().toISOString().replace("T"," ").replace("Z"," ").slice(0, 19),
      category: this.form.get('category')?.value,
      description: this.form.get('description')?.value,
      isAlive: true,
      authorId: this.authorId
    });

    console.log(this.form.value);
    console.log('FORMAT DATE :', new Date().toISOString().replace("T"," ").replace("Z"," "));
    console.log('FORMAT DATE indexOf:', new Date().toISOString().replace("T"," ").replace("Z"," ").slice(0, 19));
   
    let nameStreet: string = this.form.get('street')?.value;
    const reg = /\s/g;
    console.log('RegEx : ', nameStreet.replace(reg,"+"));
    if(this.form.get('num')?.value === " ") {
      console.log('Num vide, nameStreet.trim() =', nameStreet.trim());
      let query: string = nameStreet.replace(reg,"+")
      +"+"+ this.form.get('city')?.value;
      this.eventService.getDataFromApiAdresse(query).subscribe((data) => {
        this.dataFromApiAdresse = data;
        console.log('Data récupéré depuis API Adresse :', this.dataFromApiAdresse);
        
        if(this.dataFromApiAdresse.features) {
          let jsonData = this.dataFromApiAdresse.features[0];
          console.log('jsonData = ', jsonData);
          if(this.event?.city === jsonData.properties.city) {
            // this.event.marker.longitude = lon;
            // this.event.marker.latitude = lat;
            const lon = jsonData.geometry.coordinates[0];
            const lat = jsonData.geometry.coordinates[1];
            console.log('FROM API ADRESSE lon', lon);
            console.log('FROM API ADRESSE lat', lat);
          }
        }
      });
    }
    // for(let char of nameStreet) {
    //   if (char.match(" ")) {
    //     console.log(char.match(" "));
        
    //   }
    // }

    if(this.form.get('num')?.value !== " ") {
      let query: string = this.form.get('num')?.value.trim() + "+" + nameStreet.replace(" ","+").replace(" ","+")
      +"+"+ this.form.get('city')?.value;
      console.log('query', query);
      this.eventService.getDataFromApiAdresse(query).subscribe((data) => {
        this.dataFromApiAdresse = data;
        console.log('Data récupéré depuis API Adresse :', this.dataFromApiAdresse);
        
        if(this.dataFromApiAdresse.features) {
          let jsonData = this.dataFromApiAdresse.features[0];
          console.log('jsonData = ', jsonData);
          if(this.event?.city === jsonData.properties.city) {
            // this.event.marker.longitude = lon;
            // this.event.marker.latitude = lat;
            const lon = jsonData.geometry.coordinates[0];
            const lat = jsonData.geometry.coordinates[1];
            console.log('FROM API ADRESSE lon', lon);
            console.log('FROM API ADRESSE lat', lat);
          }
        }
      });
    }
 
    this.event = this.form.value;
    
    if (this.event) {
      this.event.category = this.category;
      if(this.event.category) {
        this.event.category.name = this.category.name;
        this.event.category.name = this.form.get('category')?.value;
      }

      // TODO
      // ON POURRA SET les likes et dislikes ici plutôt que dans le back
      this.event.userLikes = 15;
      console.log('Event to save before subscribe: ', this.event)
      this.eventService.save(this.event).subscribe({
        next: () => {
          console.log("data added : " + this.form.value);
          this.toastr.success("Ajout ok", 'Evénement ajouter avec succès', {
            timeOut: 3000,
            progressBar: true
          });

        },
        error: (err) => {
          this.errorMessage = err.message;
          console.log("add event failed")
          this.toastr.error(this.errorMessage , 'Echec de l\'ajout de l\'événement', {
            timeOut: 3000,
            progressBar: true
          });
        }
      });
      this.router.navigateByUrl("/client/event").then(() => {
        // window.location.reload();
        this.getCurrentPositionEventMarker(this.map);
      });
    }
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

    this.eventService.findAllReducted().subscribe({
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

  getAllCategories() {
    this.cateoryService.findAll().subscribe( {
      next: (data) => {
        this.categories = data;
        console.log('List des catégories:', this.categories);
      },
      error: (err) => {
        this.errorMessage = err.message;
        console.log("La liste des catégories n'a pas pu être récupérée");
      }
    })
  }

  getCurrentPositionEventMarker(map: L.Map): any {
    // Affiche par défaut la carte de la France
    // Après Autorisation: géolocalisation 
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
    function onLocationFound(e: { accuracy: any; latlng: L.LatLngExpression; }) {
      var radius = e.accuracy;
      L.marker(e.latlng).addTo(map)
          .bindPopup("Vous êtes dans un rayon de " + radius + " métres de l'EVENT crée !!").openPopup();
  
      L.circle(e.latlng, radius).addTo(map);
      console.log(e.latlng);
    }
    function onLocationError(e: { message: any; }) {
      alert(e.message);
    }

    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);

    map.locate({setView: true, maxZoom: 16});
  }

}
