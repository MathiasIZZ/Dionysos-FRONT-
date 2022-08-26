import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Event } from '../models/event.entity';

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

  findAllReducted(): Observable<any> {
    return this.http.get(`${environment.EVENT_API}`+ '/all/reducted');
  }

  findAllByCity(city: string): Observable<any> {
    return this.http.get(`${environment.EVENT_API}/all/${city}`);
  }

  findByAuthorId(authorId: string): Observable<any> {
    return this.http.get(`${environment.EVENT_API}/all/${authorId}`);
  }

  save(event: Event): Observable<Event> {
    return this.http.post<Event>(`${environment.EVENT_API}/new`, event);
  }

  getDataFromApiAdresse(q: string): Observable<any> {
    return this.http.get(`${environment.EVENT_API}/api/adresse/${q}`);
  }
}
