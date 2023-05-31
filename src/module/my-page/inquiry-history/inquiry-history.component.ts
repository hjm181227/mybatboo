import { Component } from '@angular/core';
import { SyntaxSharedModule } from "../../shared/syntax-shared.module";
import { ApiService } from "../../../service/api.service";
import { BehaviorSubject, switchMap, tap } from "rxjs";
import { MpCol, MpHeadDirective, MpRow, MpTable } from "@mapiacompany/styled-components/table";
import { MpBlank } from "@mapiacompany/styled-components";
import { AsyncStatus, bindStatus } from "@mapiacompany/armory";
import { BsModalService, MpBottomSheetService } from "@mapiacompany/ngx-bootstrap-modal";
import { InquiryDetailComponent } from "../inquiry-detail/inquiry-detail.component";
import { InquiryInputFormComponent } from "../inquiry-input-form/inquiry-input-form.component";

@Component({
  selector: 'app-inquiry-history',
  standalone: true,
  imports: [
    SyntaxSharedModule,
    MpTable,
    MpCol,
    MpRow,
    MpHeadDirective,
    MpBlank
  ],
  templateUrl: './inquiry-history.component.html',
  styleUrls: [ './inquiry-history.component.scss' ]
})
export class InquiryHistoryComponent {
  status$ = new BehaviorSubject(AsyncStatus.INITIAL);
  loader$ = new BehaviorSubject(null);
  history$ = this.loader$.pipe(
    switchMap(() => this.api.loadInquiryHistory().pipe(
      bindStatus(this.status$),
      tap(console.log),
    ))
  )

  constructor(
    private api: ApiService,
    private bottomSheet: MpBottomSheetService,
    private modalService: BsModalService
  ) {
  }

  openInquiryDetail(inquiryId: number) {
    this.bottomSheet.show(InquiryDetailComponent, {
      initialState: { inquiryId }
    })
  }

  openInquiryInputForm() {
    this.modalService.show(InquiryInputFormComponent, {
      onClose: () => this.loader$.next(null)
    });
  }
}
