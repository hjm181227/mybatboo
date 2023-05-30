import { Component, Input } from '@angular/core';
import { SyntaxSharedModule } from "../../shared/syntax-shared.module";
import { BsModalRef } from "@mapiacompany/ngx-bootstrap-modal";
import { ApiService } from "../../../service/api.service";
import { AsyncStatus, bindStatus, observeProperty$ } from "@mapiacompany/armory";
import { filter, switchMap } from "rxjs/operators";
import { BehaviorSubject, Observable } from "rxjs";
import { PageHeaderComponent } from "../../shared/component/page-header/page-header.component";

@Component({
  selector: 'app-inquiry-detail',
  standalone: true,
  imports: [
    SyntaxSharedModule,
    PageHeaderComponent
  ],
  templateUrl: './inquiry-detail.component.html',
  styleUrls: ['./inquiry-detail.component.scss']
})
export class InquiryDetailComponent {
  @Input() inquiryId: number;

  status$ = new BehaviorSubject(AsyncStatus.INITIAL);
  inquiry$: Observable<Inquiry> = observeProperty$(this, 'inquiryId').pipe(
    filter(id => !!id),
    switchMap(id => this.api.loadInquiryDetail(id).pipe(
      bindStatus(this.status$)
    ))
  )

  replyStatus$ = new BehaviorSubject(AsyncStatus.INITIAL);
  reply$ = this.inquiry$.pipe(
    filter(inquiry => !!inquiry && !!inquiry.replyId),
    switchMap(({ replyId }) => this.api.loadInquiryReply(replyId).pipe(
      bindStatus(this.replyStatus$)
    ))
  )

  constructor(
    private modalRef: BsModalRef,
    private api: ApiService,
  ) {
  }

  close() {
    this.modalRef.hide();
  }
}
