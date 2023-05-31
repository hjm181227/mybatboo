import { Component, Input } from '@angular/core';
import { AbstractBaseComponent, AsyncStatus, observeProperty$ } from "@mapiacompany/armory";
import { BehaviorSubject, combineLatest, Observable, switchMap, tap } from "rxjs";
import { filter } from "rxjs/operators";
import { ApiService } from "../../../service/api.service";
import { PageHeaderComponent } from "../../shared/component/page-header/page-header.component";
import { SyntaxSharedModule } from "../../shared/syntax-shared.module";
import { BsModalRef, BsModalService } from "@mapiacompany/ngx-bootstrap-modal";
import { CategoryNamePipe } from "../../../pipe/category-name.pipe";
import { CropTypeBadge } from "../../../component/crop-type-badge/crop-type-badge.component";
import { DiseaseNamePipe } from "../../../pipe/disease-name.pipe";

@Component({
  selector: 'app-category-diagnosis-record-list',
  standalone: true,
  imports: [
    SyntaxSharedModule,
    PageHeaderComponent,
    CategoryNamePipe,
    CropTypeBadge,
    DiseaseNamePipe
  ],
  templateUrl: './category-diagnosis-record-list.component.html',
  styleUrls: [ './category-diagnosis-record-list.component.scss' ]
})
export class CategoryDiagnosisRecordListComponent extends AbstractBaseComponent {
  @Input() category: Category;

  status$ = new BehaviorSubject(AsyncStatus.INITIAL);
  loader$ = new BehaviorSubject(null);
  records$: Observable<{ diagnosisRecord: DiagnosisRecord, diagnosisResultList: DiagnosisItem[] }[]> = combineLatest([
    this.loader$,
    observeProperty$(this, 'category')
  ]).pipe(
    filter(([ _, category ]) => !!category),
    switchMap(([ _, category ]) => this.api.loadCategoryDiagnosisRecords(category.id).pipe(
    ))
  )

  constructor(
    private api: ApiService,
    private modalRef: BsModalRef,
    private modalService: BsModalService
  ) {
    super();
  }

  ngOnInit() {
    this.modalRef.setClass('diagnosis-record-list-modal');
  }

  close() {
    this.modalRef.hide();
  }

  openDiagnosisResult(record: { diagnosisRecord: DiagnosisRecord, diagnosisResultList: DiagnosisItem[] }) {
    import('../../diagnosis/diagnosis-result/diagnosis-result.component').then(c => {
      this.modalService.show(c.DiagnosisResultComponent, {
        initialState: {
          diagnosisId: record.diagnosisRecord.id
        },
        onClose: () =>  this.loader$.next(null)
      })
    });
  }
}
