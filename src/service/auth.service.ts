import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment";
import { tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  login(email: string, password: string, name?: string) {
    return this.http.post(`${environment.apiUrl}/login`, { name, email, password })
      .pipe(
        tap((response: any) => {
          localStorage.setItem('access_token', response.access_token);
        })
      );
  }

  register(name: string, email: string, password: string) {
    return this.http.post(`${environment.apiUrl}/register`, { name, email, password })
      .pipe(
        tap((response: any) => {
          localStorage.setItem('access_token', response.access_token);
        })
      );
  }
}
