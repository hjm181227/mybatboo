import { Component, EventEmitter, Output } from '@angular/core';
import { SyntaxSharedModule } from "../../shared/syntax-shared.module";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { AsyncStatus, AsyncStatusType, prepare, ToHelperTextPipe } from "@mapiacompany/armory";
import { BehaviorSubject, catchError, finalize, tap } from "rxjs";
import { CustomValidators } from "../../shared/custom-validator";
import { AuthService } from "../../../service/auth.service";
import { MpInput } from "@mapiacompany/styled-components";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    SyntaxSharedModule,
    ToHelperTextPipe,
    MpInput
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @Output() changeTab: EventEmitter<'login' | 'register'> = new EventEmitter();
  status$ = new BehaviorSubject<AsyncStatusType>(AsyncStatus.INITIAL);
  passwordVisibility: boolean = false;
  passwordRepeatVisibility: boolean = false;

  form = {
    email: new UntypedFormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    passwordRepeat: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    name: new UntypedFormControl('', [ Validators.maxLength(50) ])
  };
  formGroup: UntypedFormGroup = new UntypedFormGroup(this.form, [
    CustomValidators.requiredSameValue('password', 'passwordRepeat')
  ]);
  formErrors = {
    email: {
      required: 'core.login-modal.email-placeholder',
      email: 'core.login-modal.email-placeholder'
    },
    password: {
      required: 'core.login-modal.password-placeholder',
      minlength: 'core.login-modal.password-min-length'
    },
    passwordRepeat: {
      required: 'core.login-modal.password-placeholder',
      minlength: 'core.login-modal.password-min-length',
      requiredSameValue: 'core.login-modal.password-mismatch'
    },
    name: {
      required: 'register.name-placeholder',
      maxlength: 'register.name-max-length'
    }
  };

  constructor(
    private authService: AuthService,
    // private alert: AlertService
  ) {
  }

  registerSubmit() {
    const { email, password, name } = this.formGroup.value;
    this.authService.register({ email, password, name }).pipe(
      prepare(() => this.status$.next(AsyncStatus.PENDING)),
      catchError(err => {
        console.error(err);
        if (err?.error?.code === 'GENERAL_ACCOUNT_ALREADY_EXIST') {
          // return this.alert.error('register.general-account-already-exist');
        }

        if (err?.error?.code === 'ALREADY_EXIST_NICKNAME') {
          // return this.alert.error('register.already-exist-nickname');
        }

        // return this.alert.error(err);
        return err;
      }),
      tap(() => this.changeTab.emit('login')),
      finalize(() => this.status$.next(AsyncStatus.INITIAL)),
    ).subscribe();
  }
}
