import { Component } from '@angular/core';
import { SharedModule } from "../../module/shared/shared.module";
import { FormControl, FormGroup } from "@angular/forms";
import { AuthService } from "../../service/auth.service";
import { tap } from "rxjs/operators";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    SharedModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
})
export class LoginComponent {
  status: 'login' | 'register' | 'find-password' | 'find-email' = 'login';
  form = {
    email: new FormControl('chullee49@naver.com'),
    password: new FormControl('dlcjf0409')
  };

  formGroup = new FormGroup(this.form);

  constructor(
    private auth: AuthService
  ) {
  }

  onSubmit(): void {
    const { email, password } = this.formGroup.value;
    this.auth.login(email, password).pipe(
      tap(console.log),
      tap()
    ).subscribe();
  }

  onRegister(): void {
    this.auth.register('hjm', '','').pipe(
      tap(console.log),
    ).subscribe();
  }

  onWithdraw(): void {
    this.auth.withdraw().pipe(
      tap(console.log),
    ).subscribe();
  }
}
