import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { MarkerService } from 'src/app/services/marker.service';
import * as L from 'leaflet';

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
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {

  @ViewChild('map')
  map?: any;
  
  isLoggedIn = false; 

  constructor(
    private markerService: MarkerService,
    private tokenStorageService : TokenStorageService) { }
    
  ngOnInit() {
    
  }

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
}
