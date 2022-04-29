import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { MarkerService } from 'src/app/services/marker.service';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {

  private map?: any;
  isLoggedIn = false;
  urlLogo="../../../assets/images/logo.jpg";
  
  constructor(
    private markerService: MarkerService,
    private tokenStorageService : TokenStorageService) { }


  ngAfterViewInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      this.markerService.getCurrentPositionMarker(this.map);
    } else {
      this.markerService.makeCityMarkers(this.map);
    }

    
    if (!navigator.geolocation) {
      console.log('location is not supported');
    }
  }

  initMap(): void {
    
    // navigator.geolocation.getCurrentPosition((position) => {
    //   const coords = position.coords;
    //   console.log(
    //     `lat: ${position.coords.latitude}, 
    //      lon: ${position.coords.longitude}`
    //   ); 
    //   let geoMap = L.map('map').setView([coords.latitude, coords.longitude], 14);
    //   const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //     maxZoom: 36,
    //     minZoom: 6,
    //     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    //   });
    //   tiles.addTo(geoMap);
    //   this.markerService.getCurrentPositionMarker(geoMap);
    //   geoMap.locate({setView: true, maxZoom: 16});
    // });
  //   this.map = L.map('map',{
  //     center: [45.764043, 4.835659],
  //     zoom: 6
  //   });
  //   const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //     maxZoom: 36,
  //     minZoom: 6,
  //     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  //   });
  //   tiles.addTo(this.map);
  }
}
