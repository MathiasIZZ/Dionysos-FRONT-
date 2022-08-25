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
  makeEventPopup(data: Event): any {
    return ``+
    `<div>
      Evenement : ${ data.eventTitle } 
    </div>`  +
    `<div>
      Ville : ${ data.city } 
    </div>` +
    `<div>
    Like : ${ data.userLikes } 
    </div>` +
    `<div>
      Heure Début : ${ data.hourBegin } 
    </div>`
  }
}
