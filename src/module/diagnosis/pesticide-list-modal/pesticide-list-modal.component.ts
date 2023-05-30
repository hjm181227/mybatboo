import { Component, Input } from '@angular/core';
import { SyntaxSharedModule } from "../../shared/syntax-shared.module";
import { ApiService } from "../../../service/api.service";
import { AsyncStatus, bindStatus, observeProperty$ } from "@mapiacompany/armory";
import { filter, switchMap } from "rxjs/operators";
import { BehaviorSubject, combineLatest, Observable, tap } from "rxjs";
import { PageHeaderComponent } from "../../shared/component/page-header/page-header.component";
import { BsModalRef, MpBottomSheetService } from "@mapiacompany/ngx-bootstrap-modal";
import { MpCol, MpHeadDirective, MpRow, MpTable } from "@mapiacompany/styled-components/table";
import { MpBlank } from "@mapiacompany/styled-components";
import { MpBottomPagination } from "@mapiacompany/styled-components/pagination";
import { PesticideDetailComponent } from "../pesticide-detail/pesticide-detail.component";

@Component({
  selector: 'app-pesticide-list-modal',
  standalone: true,
  imports: [
    SyntaxSharedModule,
    PageHeaderComponent,
    MpTable,
    MpCol,
    MpRow,
    MpHeadDirective,
    MpBlank,
    MpBottomPagination
  ],
  templateUrl: './pesticide-list-modal.component.html',
  styleUrls: ['./pesticide-list-modal.component.scss']
})
export class PesticideListModalComponent {
  @Input() cropName: string;
  @Input() diseaseName: string;

  loader$ = new BehaviorSubject(1);
  status$ = new BehaviorSubject(AsyncStatus.INITIAL);

  pesticideList$: Observable<{ totalCount: number, list: Pesticide[], displayCount: number, startPoint: number }> = combineLatest([
    this.loader$,
    observeProperty$(this, 'cropName').pipe(
      filter((cropName) => cropName?.length > 0)
    ),
    observeProperty$(this, 'diseaseName').pipe(
      filter((diseaseName) => diseaseName?.length > 0)
    )
  ]).pipe(
    switchMap(([ page, cropName, diseaseName ]) => {
      return this.api.loadPesticideList({ cropName, diseaseName, page, displayCount: 10 }).pipe(
        bindStatus(this.status$),
      )
    }),
    tap(console.log)
  )

  constructor(
    private api: ApiService,
    private modalRef: BsModalRef,
    private bottomSheet: MpBottomSheetService
  ) {
  }

  ngOnInit() {
    this.modalRef.setClass('pesticide-list-modal');
  }

  close() {
    this.modalRef.hide();
  }

  openPesticideDetail(pesticide: Pesticide) {
    this.bottomSheet.show(PesticideDetailComponent, {
      initialState: { pesticide }
    })
  }
}
