import { Component, Input } from '@angular/core';
import { SyntaxSharedModule } from "../../shared/syntax-shared.module";
import { PageHeaderComponent } from "../../shared/component/page-header/page-header.component";
import { BsModalRef } from "@mapiacompany/ngx-bootstrap-modal";
import { ApiService } from "../../../service/api.service";
import { FormControl } from "@angular/forms";
import { AbstractBaseComponent, AsyncStatus, bindStatus, observeProperty$ } from "@mapiacompany/armory";
import { filter, switchMap } from "rxjs/operators";
import { BehaviorSubject, tap } from "rxjs";
import { MpRadio } from "@mapiacompany/styled-components";
import { CategoryNamePipe } from "../../../pipe/category-name.pipe";
import { ToastService } from "../../../service/toast.service";

@Component({
  selector: 'app-category-change-modal',
  standalone: true,
  imports: [
    SyntaxSharedModule,
    PageHeaderComponent,
    MpRadio,
    CategoryNamePipe
  ],
  templateUrl: './category-change-modal.component.html',
  styleUrls: [ './category-change-modal.component.scss' ]
})
export class CategoryChangeModal extends AbstractBaseComponent {
  @Input() diagnosisId: number;

  categories$ = this.api.loadUserCategories().pipe(
    tap(console.log)
  );

  initialCategoryId;

  selected = new FormControl<number>(undefined);
  status$ = new BehaviorSubject(AsyncStatus.INITIAL);

  constructor(
    private modalRef: BsModalRef,
    private api: ApiService,
    private toast: ToastService
  ) {
    super();
  }

  ngOnInit() {
    this.subscribeOn(
      observeProperty$(this, 'diagnosisId').pipe(
        filter(id => !!id),
        switchMap(id => this.api.getDiagnosisResult(id).pipe(
          tap(({ categoryId }) => this.initialCategoryId = categoryId),
          tap(({ categoryId }) => this.selected.patchValue(categoryId)),
        ))
      )
    )
  }

  close() {
    this.modalRef.hide();
  };

  changeCategory() {
    this.api.changeDiagnosisRecordCategory(this.diagnosisId, this.selected.value).pipe(
      bindStatus(this.status$),
      tap(() => this.toast.show('카테고리가 변경되었습니다.')),
      tap(() => this.modalRef.hide())
    ).subscribe()
  }
}
