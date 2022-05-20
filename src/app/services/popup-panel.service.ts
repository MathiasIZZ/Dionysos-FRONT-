import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupPanelService {

  constructor() { }

  makeCityPopup(data: any): string {
    return ``+
    `<div>Ville : ${ data.name } </div>`
  }
}
