import { Component, EventEmitter, Output } from '@angular/core';
import { SyntaxSharedModule } from "../../module/shared/syntax-shared.module";
import { AuthService } from "../../service/auth.service";
import { FormControl, FormGroup } from "@angular/forms";
import { tap } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    SyntaxSharedModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @Output() onRegister = new EventEmitter();

  form = {
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  }

  formGroup = new FormGroup(this.form);

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
  }

  onSubmit() {
    const { name, email, password } = this.formGroup.value;
    this.auth.register(name, email, password).pipe(
      tap(() => {
        this.onRegister.emit();
      })
    ).subscribe();
  }
}
