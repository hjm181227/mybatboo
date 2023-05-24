import { Component, TemplateRef, ViewChild } from '@angular/core';
import { SyntaxSharedModule } from "../../shared/syntax-shared.module";
import { BehaviorSubject, catchError, map, of, switchMap, tap } from "rxjs";
import { ApiService } from "../../../service/api.service";
import { AbstractBaseComponent, AsyncStatus, bindStatus, prepare } from "@mapiacompany/armory";
import { AbstractControl, AsyncValidatorFn, FormControl, Validators } from "@angular/forms";
import { CategoryNamePipe } from "../../../pipe/category-name.pipe";
import { MpBottomSheetService } from "@mapiacompany/ngx-bootstrap-modal";
import { AlertService } from "@mapiacompany/styled-components";
import { filter } from "rxjs/operators";
import { ToastService } from "../../../service/toast.service";

@Component({
  selector: 'app-crop-management',
  standalone: true,
  imports: [
    SyntaxSharedModule,
    CategoryNamePipe
  ],
  templateUrl: './crop-management.component.html',
  styleUrls: [ './crop-management.component.scss' ]
})
export class CropManagementComponent extends AbstractBaseComponent {
  loader$ = new BehaviorSubject<void>(null);
  status$ = new BehaviorSubject(AsyncStatus.INITIAL);
  categories$ = this.loader$.pipe(
    switchMap(() => this.api.loadUserCategories().pipe(
      map(res => res.data)
    ))
  );

  currentCategory = new FormControl<string>(null);
  categoryValidationStatus$ = new BehaviorSubject(AsyncStatus.INITIAL);

  constructor(
    private api: ApiService,
    private bottomSheet: MpBottomSheetService,
    private alert: AlertService,
    private toast: ToastService
  ) {
    super();
  }

  openRecordList(category: Category) {
    import('../category-diagnosis-record-list/category-diagnosis-record-list.component').then(c => {
      this.bottomSheet.show(c.CategoryDiagnosisRecordListComponent, {
        initialState: {
          category
        }
      })
    })
  }

  addCategory() {
    this.alert.input({
      title: '카테고리 추가',
      content: '작물 진단 결과를 카테고리 별로 관리할 수 있습니다',
      confirmMessage: '추가',
      cancelMessage: '취소',
      placeholder: '추가할 카테고리 이름을 입력해주세요. (최대 20자)',
      confirmButtonColor: 'green',
      validators: [ Validators.required, Validators.maxLength(20) ],
      asyncValidators: [ this.categoryNameValidator() ],
      errorMessages: {
        maxlength: '카테고리 이름은 최대 20자까지 입력 가능합니다.',
        alreadyExists: '이미 존재하는 카테고리입니다.',
        validationError: '카테고리 검사 중 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.'
      }
    }).pipe(
      filter(value => !!value),
      bindStatus(this.status$),
      switchMap(name => this.api.createCategory(name)),
      tap(() => this.loader$.next(null)),
      tap(() => this.toast.show('카테고리가 추가되었습니다.'))
    ).subscribe()
  }

  editCategory(category: Category, $event: Event) {
    $event.stopPropagation();
    $event.preventDefault();

    import('../category-edit-modal/category-edit-modal.component').then(c => {
      this.bottomSheet.show(c.CategoryEditModalComponent, {
        initialState: {
          category
        },
        onClose: () => this.loader$.next(null)
      })
    })
  }

  deleteCategory(categoryId, event: Event) {
    event.preventDefault();
    event.stopPropagation();

    this.alert.confirm({
      title: '카테고리 삭제',
      content: '카테고리에 포함된 진단 기록은 \'미분류\'로 변경됩니다',
      confirmMessage: '삭제',
      cancelMessage: '취소',
      confirmButtonColor: 'red',
    }).pipe(
      filter(confirm => !!confirm),
      switchMap(() => this.api.deleteCategory(categoryId).pipe(
        tap(() => this.toast.show('카테고리가 삭제되었습니다.')),
        tap(() => this.loader$.next(null)),
      )),
    ).subscribe()
  }

  categoryNameValidator(): AsyncValidatorFn {
    return (fc: AbstractControl) => {
      return this.api.loadCategoryByName(fc.value).pipe(
        prepare(() => this.categoryValidationStatus$.next(AsyncStatus.PENDING)),
        map(() => ({ alreadyExists: { value: fc.value } })),
        tap(() => this.categoryValidationStatus$.next(AsyncStatus.REJECTED)),
        catchError((err) => {
          if (err.error?.code === 'CATEGORY_NOT_FOUND') {
            this.categoryValidationStatus$.next(AsyncStatus.FULFILLED);
            return of(null);
          } else {
            this.categoryValidationStatus$.next(AsyncStatus.REJECTED);
            return of({ validationError: { value: fc.value } });
          }
        })
      )
    }
  }
}
