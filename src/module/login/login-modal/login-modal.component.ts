import { Component, Input } from '@angular/core';
import { SyntaxSharedModule } from "../../shared/syntax-shared.module";
import { FormControl, FormGroup } from "@angular/forms";
import { AuthService } from "../../../service/auth.service";
import { ToastService } from "../../../service/toast.service";
import { MpInput } from "@mapiacompany/styled-components";
import { PageHeaderComponent } from "../../shared/component/page-header/page-header.component";
import { BsModalRef } from "@mapiacompany/ngx-bootstrap-modal";
import { LoginComponent } from "../login/login.component";
import { RegisterComponent } from "../register/register.component";

@Component({
  selector: 'login-modal',
  standalone: true,
  imports: [
    SyntaxSharedModule,
    MpInput,
    PageHeaderComponent,
    LoginComponent,
    RegisterComponent
  ],
  templateUrl: './login-modal.component.html',
  styleUrls: [ './login-modal.component.scss' ]
})
export class LoginModal {
  @Input() onSuccess: () => void;

  tab: 'login' | 'register' | 'find-password' | 'find-email' = 'login';
  form = {
    email: new FormControl(''),
    password: new FormControl('')
  };

  formGroup = new FormGroup(this.form);

  constructor(
    private auth: AuthService,
    private toast: ToastService,
    public modalRef: BsModalRef
  ) {
  }

  get headerButton() {
    switch (this.tab) {
      case 'login':
        return 'register';
      case 'register':
        return 'login';
      default:
        return 'register';
    }
  }

  get currentTab(): string {
    return this.tab;
  }

  tabName(tab) {
    switch (tab) {
      case 'login':
        return '로그인';
      case 'register':
        return '회원가입';
      default:
        return '로그인';
    }
  }
}
