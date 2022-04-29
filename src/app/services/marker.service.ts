import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { Observable, Subscriber } from 'rxjs';
import { PopupPanelService } from './popup-panel.service';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  cities: string = '/assets/data/french-cities.geojson';
  marker?: L.Marker;
  accuracyCircle?: L.Circle;
  

  constructor(
    private http: HttpClient,
    private popupService: PopupPanelService) { }

  makeCityMarkers(mapCity: L.Map): void{
    mapCity = L.map('map').setView([46.227638, 2.213749], 6);
    const tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
      maxZoom: 18,
      minZoom: 5,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>,' +
			' © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox/streets-v11',
      tileSize: 512,
		  zoomOffset: -1
    }).addTo(mapCity);
    this.http.get(this.cities).subscribe((res: any) => {
      for(const c of res.features) {
        const lon = c.geometry.coordinates[0];
        const lat = c.geometry.coordinates[1];
        const marker = L.marker([lat, lon]);

        marker.bindPopup(this.popupService.makeCityPopup(c.properties));
        marker.addTo(mapCity);
      }
    })
  }

  getCurrentPositionMarker(map: L.Map): any {
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
    }).addTo(map);
    // tiles.addTo(map);
    function onLocationFound(e: { accuracy: any; latlng: L.LatLngExpression; }) {
      var radius = e.accuracy;
  
      L.marker(e.latlng).addTo(map)
          .bindPopup("You are within " + radius + " meters from this point").openPopup();
  
      L.circle(e.latlng, radius).addTo(map);
      console.log(e.latlng);
    }
    function onLocationError(e: { message: any; }) {
      alert(e.message);
    }

    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);

    map.locate({setView: true, maxZoom: 16});
    // Without Mapbox
    // navigator.geolocation.getCurrentPosition((position) => {
    //   const coords = position.coords;
    //   console.log(
    //     `lat: ${position.coords.latitude}, 
    //      lon: ${position.coords.longitude}`
    //   ); 
    //   map = L.map('map').setView([coords.latitude, coords.longitude], 13);
    //   const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //     maxZoom: 18,
    //     minZoom: 5,
    //     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    //   }).addTo(map);
    //   // tiles.addTo(map);
    //   function onLocationFound(e: { accuracy: any; latlng: L.LatLngExpression; }) {
    //     var radius = e.accuracy;
    
    //     L.marker(e.latlng).addTo(map)
    //         .bindPopup("You are within " + radius + " meters from this point").openPopup();
    
    //     L.circle(e.latlng, radius).addTo(map);
    //     console.log(e.latlng);
    //   }
    //   function onLocationError(e: { message: any; }) {
    //   alert(e.message);
    //   }
  
    //   map.on('locationfound', onLocationFound);
    //   map.on('locationerror', onLocationError);
  
    //   map.locate({setView: true, maxZoom: 16});
    //   console.log('coucou');
    // });
  //   function onLocationFound(e: { accuracy: any; latlng: L.LatLngExpression; }) {
  //     var radius = e.accuracy;
  
  //     L.marker(e.latlng).addTo(map)
  //         .bindPopup("You are within " + radius + " meters from this point").openPopup();
  
  //     L.circle(e.latlng, radius).addTo(map);
  //     console.log(e.latlng);
  // }
  // function onLocationError(e: { message: any; }) {
	// 	alert(e.message);
	// }

	// map.on('locationfound', onLocationFound);
	// map.on('locationerror', onLocationError);

	// map.locate({setView: true, maxZoom: 16});
  // console.log('coucou');
  //   if(!navigator.geolocation) {
  //     console.log('location is not supporter, from marker service')
  //   }
  //  navigator.geolocation.getCurrentPosition((position) => {
  //   const coords = position.coords;
  //   let latLng = [coords.latitude, coords.longitude];
  //   // let marker = L.marker(latLng).addTo(map);
  //  });
    // return new Observable((observer: Subscriber<any>) => {
    //   if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition((position: any) => {
    //       observer.next({
    //         latitude: position.coords.latitude,
    //         longitude: position.coords.longitude,
    //       });
    //       observer.complete();
    //       let latlng = {lat: position.latitude, lng: position.longitude};
    //       this.marker?.setLatLng(latlng);
    //       let radius = this.accuracyCircle?.setLatLng(latlng).setRadius(position.coords.accuracy);
    //       // let radius = event.accuracy / 2;
    //       this.marker?.bindPopup("You are within " + radius + " meters from this point").openPopup();
    //       this.marker?.addTo(map);
    //       console.log(radius);
    //     });
    //   } else {
    //     observer.error();
    //   }
    // })
  }
}
