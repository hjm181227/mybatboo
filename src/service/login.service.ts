import { Injectable } from '@angular/core';
import { AuthService } from "./auth.service";
import { tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private auth: AuthService
  ) {
  }

  signIn(email: string, password: string) {
    return this.auth.login(email, password).pipe(
      tap(console.log)
    ).subscribe();
  }

  signUp(name: string, email: string, password: string) {
    return this.auth.register(name, email, password).pipe(
      tap(console.log)
    ).subscribe();
  }
}
