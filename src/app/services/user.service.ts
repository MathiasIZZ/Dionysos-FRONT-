import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.entity';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
   }

  getPublicContent(): Observable<any> {
    return this.http.get(`${environment.TEST_API}` + 'all', { responseType: 'text' })
  }

  getUserBoard(): Observable<any> {
    return this.http.get(`${environment.TEST_API}` + 'user', { responseType: 'text' });
  }

  getModBoard(): Observable<any> {
    return this.http.get(`${environment.TEST_API}` + 'mod', { responseType: 'text'});
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(`${environment.TEST_API}` + 'admin', { responseType: 'text'});
  }

  findById(id: string): Observable<any> {
    return this.http.get(`${environment.USER_API}`+ `/${id}`, { responseType: 'text' });
  }
  findAll(): Observable<any> {
    return this.http.get(`${environment.USER_API}`+ '/all')
  }

  updateEmail(id: string, email: string): Observable<any> {
    return this.http.patch<User>(`${environment.USER_API}/${id}/email`, {email: email}, httpOptions);
  }

  updatePassword(id: string, password: string, newPassword: string): Observable<any> { 
    return this.http.patch<User>(`${environment.USER_API}/${id}/password`, {password: password, newPassword: newPassword});
  }
  
} 
