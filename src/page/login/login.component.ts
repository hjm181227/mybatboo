import { Component } from '@angular/core';
import { SharedModule } from "../../module/shared/shared.module";
import { FormControl, FormGroup } from "@angular/forms";
import { AuthService } from "../../service/auth.service";
import { tap } from "rxjs";

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
    email: new FormControl(''),
    password: new FormControl('')
  };

  formGroup = new FormGroup(this.form);

  constructor(
    private auth: AuthService
  ) {
  }

  onSubmit(): void {
    const { email, password } = this.formGroup.value;
    this.auth.login(email, password).pipe(
      tap(() => {
      }),
    ).subscribe();
  }
}
