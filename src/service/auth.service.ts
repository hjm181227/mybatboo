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

  login({ email, password }: { email: string, password: string }) {
    return this.http.post<{ accessToken: string, refreshToken: string }>(`${environment.apiUrl}/member/signIn`, { email, password })
      .pipe(
        tap(res => {
          this.userActions.afterLogin(res);
        })
      );
  }

  register({ name, email, password }: { name: string, email: string, password: string }) {
    return this.http.post(`${environment.apiUrl}/member/signUp`, { name, email, password });
  }

  withdraw() {
    return this.http.post(`${environment.apiUrl}/member/withdraw/${10}`, {
      password: 'qwerqwer'
    })
      .pipe();
  }
}
