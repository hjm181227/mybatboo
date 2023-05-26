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
      required: '이메일을 입력해주세요',
      email: '이메일 형식이 올바르지 않습니다'
    },
    password: {
      required: '비밀번호를 입력해주세요',
      minlength: '비밀번호는 6자리 이상 입력해주세요'
    },
    passwordRepeat: {
      required: '위의 비밀번호를 다시 입력해주세요.',
      minlength: '비밀번호는 6자리 이상 입력해주세요',
      requiredSameValue: '비밀번호가 일치하지 않습니다'
    },
    name: {
      required: '이름을 입력해주세요.',
      maxlength: '이름은 50자 이하로 입력해주세요.'
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
