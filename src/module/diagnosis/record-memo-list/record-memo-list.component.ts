import { Component, Input } from '@angular/core';
import { ApiService } from "../../../service/api.service";
import { observeProperty$ } from "@mapiacompany/armory";
import { filter, switchMap } from "rxjs/operators";
import { SyntaxSharedModule } from "../../shared/syntax-shared.module";
import { PageHeaderComponent } from "../../shared/component/page-header/page-header.component";
import { BsModalRef, MpBottomSheetService } from "@mapiacompany/ngx-bootstrap-modal";
import { BehaviorSubject, combineLatest, Observable, tap } from "rxjs";
import { AlertService, MpBlank } from "@mapiacompany/styled-components";
import { MpCol, MpHeadDirective, MpRow, MpTable } from "@mapiacompany/styled-components/table";
import { RecordMemoDetailComponent } from "../record-memo-detail/record-memo-detail.component";

@Component({
  selector: 'app-record-memo-list',
  standalone: true,
  imports: [
    SyntaxSharedModule,
    PageHeaderComponent,
    MpBlank,
    MpTable,
    MpCol,
    MpRow,
    MpHeadDirective
  ],
  templateUrl: './record-memo-list.component.html',
  styleUrls: [ './record-memo-list.component.scss' ]
})
export class RecordMemoListComponent {
  @Input() recordId: number;

  loader$ = new BehaviorSubject(null);
  memoList$: Observable<DiagnosisRecordMemo[]> = combineLatest([
    observeProperty$(this, 'recordId'),
    this.loader$
  ]).pipe(
    filter(([ recordId ]) => !!recordId),
    switchMap(([ recordId ]) => this.api.getDiagnosisMemoList(recordId)),
    tap(res => console.log(res))
  )

  constructor(
    private api: ApiService,
    private modalRef: BsModalRef,
    private alert: AlertService,
    private bottomSheet: MpBottomSheetService
  ) {
  }

  close() {
    this.modalRef.hide();
  }

  addMemo() {
    this.alert.prompt({
      title: '메모 추가',
      content: '메모를 입력해주세요.',
      confirmMessage: '작성',
      confirmButtonColor: 'green',
      confirmButtonIconType: 'outlined',
      confirmButtonIconName: 'add',
      cancelMessage: '취소',
    }).pipe(
      filter(res => !!res),
      tap(res => console.log(res)),
      switchMap(content => this.api.addDiagnosisRecordMemo(this.recordId, content)),
      tap(() => this.loader$.next(null))
    ).subscribe()
  }

  openMemoDetail(memo: DiagnosisRecordMemo) {
    this.bottomSheet.show(RecordMemoDetailComponent, {
      initialState: { memo },
      onClose: () => this.loader$.next(null)
    })
  }
}
