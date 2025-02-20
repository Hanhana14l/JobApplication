// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   constructor() { }
// }
import { Injectable, PLATFORM_ID, Inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000';
  
  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/auth/login`, credentials);
  }
  getRole(): string {
    if (isPlatformBrowser(this.platformId)) {
    return localStorage.getItem('role') || '';
    }
    return '';
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
    return !!localStorage.getItem('token');
    }
    return false;
  }
}
