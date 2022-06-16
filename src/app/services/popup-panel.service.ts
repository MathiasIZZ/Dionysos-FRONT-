import { Injectable } from '@angular/core';
import { Event } from '../models/event.entity';

@Injectable({
  providedIn: 'root'
})
export class PopupPanelService {

  constructor() { }

  makeCityPopup(data: any): string {
    return ``+
    `<div>Ville : ${ data.name } </div>`
  }
  makeEventPopup(data: Event): string {
    return ``+
    `<div>
      Evenement : ${ data.eventTitle } 
      Ville : ${ data.city } 
      Heure Début : ${ data.hourBegin } 
    </div>`
  }
}
