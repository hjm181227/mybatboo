import { Component, Input } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, Validators } from "@angular/forms";
import { SyntaxSharedModule } from "../../shared/syntax-shared.module";
import { PageHeaderComponent } from "../../shared/component/page-header/page-header.component";
import { BsModalRef } from "@mapiacompany/ngx-bootstrap-modal";
import { AlertService, MpInput, MpLabel, MpTextarea } from "@mapiacompany/styled-components";
import { ApiService } from "../../../service/api.service";
import { ToastService } from "../../../service/toast.service";
import { filter } from "rxjs/operators";
import { BehaviorSubject, catchError, map, of, switchMap, tap } from "rxjs";
import { AsyncStatus, bindStatus, prepare } from "@mapiacompany/armory";

@Component({
  selector: 'app-category-edit-modal',
  standalone: true,
  imports: [
    SyntaxSharedModule,
    PageHeaderComponent,
    MpInput,
    MpTextarea,
    MpLabel
  ],
  templateUrl: './category-edit-modal.component.html',
  styleUrls: [ './category-edit-modal.component.scss' ]
})
export class CategoryEditModalComponent {
  @Input() category: Category;

  form = {
    name: new FormControl<string>('', [ Validators.required ]),
    memo: new FormControl<string>('')
  }

  formGroup = new FormGroup(this.form);

  status$ = new BehaviorSubject(AsyncStatus.INITIAL);

  errorMessages = {
    alreadyExists: '이미 존재하는 카테고리입니다.',
    validationError: '카테고리 검사 중 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.'
  }

  constructor(
    public modalRef: BsModalRef,
    public api: ApiService,
    public alert: AlertService,
    public toast: ToastService
  ) {
  }

  ngOnInit() {
    const { name, memo } = this.category;
    this.formGroup.patchValue({ name, memo: memo || '' });
    // this.form.name.addAsyncValidators(this.categoryNameValidator());
  }

  updateCategory() {
    this.alert.confirm({
      title: '카테고리 수정',
      content: '카테고리를 수정하시겠습니까?',
      confirmMessage: '수정',
      cancelMessage: '취소',
      confirmButtonColor: 'green',
    }).pipe(
      filter(confirm => !!confirm),
      switchMap(() => {
        const { name, memo } = this.formGroup.value;
        return this.api.updateCategory(this.category.id, { name, memo }).pipe(
          bindStatus(this.status$),
          tap(() => this.toast.show('카테고리가 수정되었습니다.')),
          tap(() => this.modalRef.hide())
        )
      })
    ).subscribe()
  }

  categoryNameValidator(): AsyncValidatorFn {
    return (fc: AbstractControl) => {
      return this.api.loadCategoryByName(fc.value).pipe(
        prepare(() => this.status$.next(AsyncStatus.PENDING)),
        map((res) => {
          if (res.id === this.category.id) {
            console.log(res, this.category);
            this.status$.next(AsyncStatus.INITIAL);
            return of(null);
          } else {
            if (res.id === this.category.id) {
              this.status$.next(AsyncStatus.INITIAL);
              return of(null);
            }
            this.status$.next(AsyncStatus.REJECTED);
            return { alreadyExists: { value: fc.value } };
          }
        }),
        catchError((err) => {
          if (err.error?.code === 'CATEGORY_NOT_FOUND') {
            this.status$.next(AsyncStatus.FULFILLED);
            return of(null);
          } else {
            this.status$.next(AsyncStatus.REJECTED);
            return of({ validationError: { value: fc.value } });
          }
        })
      )
    }
  }
}
