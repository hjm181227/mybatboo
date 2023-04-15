import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment";
import { tap } from "rxjs";
import { Store } from "@ngrx/store";
import { GlobalState } from "../ngrx";
import { UserActions } from "./user.action";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private store: Store<GlobalState>,
    private userActions: UserActions
  ) { }

  login(email: string, password: string, name?: string) {
    return this.http.post<{ token: string }>(`${environment.apiUrl}/member/signIn`, { email, password })
      .pipe(
        tap(res => {
          this.userActions.afterLogin(res.token)
        })
      );
  }

  register(name: string, email: string, password: string) {
    const test = {
      name: 'hjm',
      email: 'hjm@test.com',
      password: 'qwerqwer',
      phone: '010-1234-5678'
    }
    return this.http.post(`${environment.apiUrl}/member/signUp`, { ...test })
      .pipe(
        tap((token: any) => {
          // localStorage.setItem('token', token);
        })
      );
  }

  withdraw() {
    return this.http.post(`${environment.apiUrl}/member/withdraw/${10}`, {
      password: 'qwerqwer'
    })
      .pipe();
  }
}
