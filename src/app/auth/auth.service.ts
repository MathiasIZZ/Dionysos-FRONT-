import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${environment.AUTH_API}` + 'signin', {
      username,
      password
    }, httpOptions);
  }

  register(username: string, email: string, password: string): Observable<any> { 
    return this.http.post(`${environment.AUTH_API}` + 'signup', {
      username,
      email,
      password
    }, httpOptions);
  }

  refreshTokenAuth(token: string) {
    return this.http.post(`${environment.AUTH_API}` + 'refreshtoken', {
      refreshToken: token
    }, httpOptions);
  }

  // Pas sur que cette méthode soit utile !!
  refreshTokenTest(token: string) {
    return this.http.post(`${environment.TEST_API}` + 'refreshtoken', {
      refreshToken: token
    }, httpOptions);
  }
}
