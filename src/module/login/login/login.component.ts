import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SyntaxSharedModule } from "../../shared/syntax-shared.module";
import { MpInput } from "@mapiacompany/styled-components";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../../service/auth.service";
import { BehaviorSubject, tap } from "rxjs";
import { AsyncStatus, AsyncStatusType, bindStatus } from "@mapiacompany/armory";
import { BsModalRef } from "@mapiacompany/ngx-bootstrap-modal";
import { ToastService } from "../../../service/toast.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    SyntaxSharedModule,
    MpInput
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @Output() changeTab: EventEmitter<'find-password' | 'register'> = new EventEmitter();
  @Input() onSuccess: () => void;

  form = {
    email: new FormControl<string>('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl<string>('', [
      Validators.required
    ])
  };
  formGroup = new FormGroup(this.form);
  status$ = new BehaviorSubject<AsyncStatusType>(AsyncStatus.INITIAL);
  passwordVisibility: boolean = false;

  constructor(
    private authService: AuthService,
    private modalRef: BsModalRef,
    private toast: ToastService
  ) {
  }

  login() {
    const { email, password } = this.formGroup.value;
    this.authService.login({ email, password }).pipe(
      bindStatus(this.status$),
      tap(() => this.toast.show('로그인에 성공했습니다.')),
      tap(() => this.onSuccess && this.onSuccess()),
      tap(() => this.modalRef.hide())
    ).subscribe();
  }

  toggleVisibility() {
    this.passwordVisibility = !this.passwordVisibility;
  }
}
