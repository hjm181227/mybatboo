import { Component, Input } from '@angular/core';
import { SyntaxSharedModule } from "../../shared/syntax-shared.module";
import { BsModalRef } from "@mapiacompany/ngx-bootstrap-modal";
import { ApiService } from "../../../service/api.service";
import { AlertService, MpTextarea } from "@mapiacompany/styled-components";
import { filter, switchMap } from "rxjs/operators";
import { PageHeaderComponent } from "../../shared/component/page-header/page-header.component";
import { BehaviorSubject, tap } from "rxjs";
import { AsyncStatus, bindStatus } from "@mapiacompany/armory";
import { FormControl } from "@angular/forms";
import { ToastService } from "../../../service/toast.service";

@Component({
  selector: 'app-record-memo-detail',
  standalone: true,
  imports: [
    SyntaxSharedModule,
    PageHeaderComponent,
    MpTextarea
  ],
  templateUrl: './record-memo-detail.component.html',
  styleUrls: [ './record-memo-detail.component.scss' ]
})
export class RecordMemoDetailComponent {
  @Input() memo: DiagnosisRecordMemo;

  editMode: boolean = false;

  contents = new FormControl('');

  status$ = new BehaviorSubject(AsyncStatus.INITIAL);

  constructor(
    private modalRef: BsModalRef,
    private api: ApiService,
    private alert: AlertService,
    private toase: ToastService
  ) {
  }

  editContent() {
    if (this.editMode) {
      this.api.updateDiagnosisRecordMemo(this.memo.id, this.contents.value).pipe(
        bindStatus(this.status$),
        tap(res => this.memo = res),
        tap(() => this.editMode = false),
        tap(() => this.toase.show('내용이 수정되었습니다.'))
      ).subscribe();
    } else {
      this.contents.patchValue(this.memo.contents);
      this.editMode = true;
    }
  }

  delete() {
    this.alert.confirm({
      title: '메모 삭제',
      content: '메모를 삭제하시겠습니까?',
      confirmMessage: '삭제',
      cancelMessage: '취소',
      confirmButtonColor: 'red',
    }).pipe(
      filter(res => !!res),
      switchMap(() => this.api.deleteDiagnosisRecordMemo(this.memo.id).pipe(
        bindStatus(this.status$)
      )),
      tap(() => this.toase.show('메모가 삭제되었습니다.')),
      tap(() => this.close())
    ).subscribe()
  }

  close() {
    this.modalRef.hide();
  }
}
