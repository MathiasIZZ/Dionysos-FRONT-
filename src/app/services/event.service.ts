import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Event } from '../models/event.entity';
import {User} from "../models/user.entity";
import {EventRequest} from "../models/providers/EventRequest.entity";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }


  findAll(): Observable<any> {
    return this.http.get(`${environment.EVENT_API}`+ '/all');
  }

  save(event: Event, currentUserId: string): Observable<EventRequest> {

    return this.http.post<any>(`${environment.EVENT_API}/create`,  {event, currentUserId})
  }


}
