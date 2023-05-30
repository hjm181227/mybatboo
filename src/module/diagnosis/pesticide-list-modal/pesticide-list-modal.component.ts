import { Component, Input } from '@angular/core';
import { SyntaxSharedModule } from "../../shared/syntax-shared.module";
import { ApiService } from "../../../service/api.service";
import { observeProperty$ } from "@mapiacompany/armory";
import { filter, switchMap } from "rxjs/operators";
import { BehaviorSubject, combineLatest, tap } from "rxjs";
import { PageHeaderComponent } from "../../shared/component/page-header/page-header.component";
import { BsModalRef } from "@mapiacompany/ngx-bootstrap-modal";

@Component({
  selector: 'app-pesticide-list-modal',
  standalone: true,
  imports: [
    SyntaxSharedModule,
    PageHeaderComponent
  ],
  templateUrl: './pesticide-list-modal.component.html',
  styleUrls: ['./pesticide-list-modal.component.scss']
})
export class PesticideListModalComponent {
  @Input() cropName: string;
  @Input() diseaseName: string;

  loader$ = new BehaviorSubject(1);

  pesticideList$ = combineLatest([
    this.loader$,
    observeProperty$(this, 'cropName').pipe(
      filter((cropName) => cropName?.length > 0)
    ),
    observeProperty$(this, 'diseaseName').pipe(
      filter((diseaseName) => diseaseName?.length > 0)
    )
  ]).pipe(
    switchMap(([ page, cropName, diseaseName ]) => {
      console.log(page, cropName, diseaseName)
      return this.api.loadPesticideList({ cropName, diseaseName, page, displayCount: 10 })
    }),
    tap(console.log)
  )

  constructor(
    private api: ApiService,
    private modalRef: BsModalRef
  ) {
  }

  ngOnInit() {
    this.modalRef.setClass('pesticide-list-modal');
  }

  close() {
    this.modalRef.hide();
  }
}
