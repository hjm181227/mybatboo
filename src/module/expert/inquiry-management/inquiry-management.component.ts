import { Component } from '@angular/core';
import { SyntaxSharedModule } from "../../shared/syntax-shared.module";
import { ApiService } from "../../../service/api.service";
import { GlobalState } from "../../../ngrx";
import { Store } from "@ngrx/store";
import { selectCurrentUser } from "../../../ngrx/user.state";
import { BehaviorSubject, switchMap, tap } from "rxjs";
import { AsyncStatus, bindStatus } from "@mapiacompany/armory";
import { BsModalService } from "@mapiacompany/ngx-bootstrap-modal";
import { InquiryDetailComponent } from "../../my-page/inquiry-detail/inquiry-detail.component";
import { MpCol, MpHeadDirective, MpRow, MpTable } from "@mapiacompany/styled-components/table";
import { MpBlank } from "@mapiacompany/styled-components";
import { ReplyEditModalComponent } from "../reply-edit-modal/reply-edit-modal.component";

@Component({
  selector: 'app-inquiry-management',
  standalone: true,
  imports: [
    SyntaxSharedModule,
    MpTable,
    MpCol,
    MpRow,
    MpHeadDirective,
    MpBlank
  ],
  templateUrl: './inquiry-management.component.html',
  styleUrls: [ './inquiry-management.component.scss' ]
})
export class InquiryManagementComponent {
  currentUser$ = this.store.select(selectCurrentUser);
  status$ = new BehaviorSubject(AsyncStatus.INITIAL);
  loader$ = new BehaviorSubject(null);
  inquiryList$ = this.loader$.pipe(
    switchMap(() => this.api.loadInquiryList().pipe(
      bindStatus(this.status$),
      tap(console.log),
    ))
  )

  constructor(
    private api: ApiService,
    private store: Store<GlobalState>,
    private modalService: BsModalService
  ) {
  }

  openInquiryDetail(inquiryId: number) {
    this.modalService.show(ReplyEditModalComponent, {
      initialState: { inquiryId },
      onClose: () => this.loader$.next(null)
    })
  }
}
