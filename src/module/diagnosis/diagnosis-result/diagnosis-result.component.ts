import { Component, ElementRef, Input, Optional, Renderer2, RendererStyleFlags2 } from '@angular/core';
import { SyntaxSharedModule } from "../../shared/syntax-shared.module";
import { ApiService } from "../../../service/api.service";
import { BehaviorSubject, catchError, EMPTY, iif, map, of, switchMap, tap } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { AbstractBaseComponent } from "@mapiacompany/armory";
import { BsModalRef, MpBottomSheetService } from "@mapiacompany/ngx-bootstrap-modal";
import { PageHeaderComponent } from "../../shared/component/page-header/page-header.component";
import { FastAverageColor, FastAverageColorResult } from "fast-average-color";
import { filter } from "rxjs/operators";
import { CropNamePipe } from "../../../pipe/crop-name.pipe";
import { CropTypeBadge } from "../../../component/crop-type-badge/crop-type-badge.component";
import { DiseaseListItem } from "../disease-list-item/disease-list-item.component";
import { MpCallout } from "@mapiacompany/styled-components";
import { RecordMemoListComponent } from "../record-memo-list/record-memo-list.component";
import { CategoryNamePipe } from "../../../pipe/category-name.pipe";
import { CategoryChangeModal } from "../category-change-modal/category-change-modal.component";

@Component({
  selector: 'app-diagnosis-result',
  standalone: true,
  imports: [
    SyntaxSharedModule,
    PageHeaderComponent,
    CropNamePipe,
    CropTypeBadge,
    DiseaseListItem,
    MpCallout,
    CategoryNamePipe
  ],
  templateUrl: './diagnosis-result.component.html',
  styleUrls: [ './diagnosis-result.component.scss' ]
})
export class DiagnosisResultComponent extends AbstractBaseComponent {
  @Input() diagnosisId: number;
  @Input() diagnosisRecord: DiagnosisRecord;

  diagnosisResult$: BehaviorSubject<DiagnosisRecord> = new BehaviorSubject<DiagnosisRecord>(null);

  fastAverageColor = new FastAverageColor();
  bgColor$ = this.diagnosisResult$.pipe(
    filter(res => !!res),
    switchMap(({ imagePath }) => {
      return this.fastAverageColor.getColorAsync(imagePath);
    }),
    tap((info: FastAverageColorResult) => {
      this.renderer.setStyle(this.elementRef.nativeElement, '--image-container-bg-color', info?.hex, RendererStyleFlags2.DashCase);
    }),
    catchError(() => EMPTY),
  );

  constructor(
    @Optional() private modalRef: BsModalRef,
    private api: ApiService,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private bottomSheet: MpBottomSheetService
  ) {
    super();
  }

  ngOnInit() {
    this.subscribeOn(
      iif(
        () => !!this.diagnosisRecord,
        // this.api.getDiagnosisResult(this.diagnosisId),
        of(this.diagnosisRecord),
        iif(
          () => !!this.diagnosisId,
          of(this.diagnosisId),
          this.route.params.pipe(
            map(({ diagnosisId }) => +diagnosisId)
          )
        ).pipe(
          switchMap(diagnosisId => this.api.getDiagnosisResult(diagnosisId).pipe(
            map(record => ({ ...record, id: diagnosisId }))
          ))
        )
      ).pipe(
        map(res => this.diagnosisResult$.next(res)),
        tap(console.log)
      )
    )

    if (this.modalRef) {
      this.modalRef.setClass('diagnosis-result-modal');
    }
  }

  close() {
    if (this.modalRef) {
      this.modalRef.hide();
    } else {
      history.back();
    }
  }

  openMemoList() {
    if (!this.diagnosisResult$.value) {
      return;
    }

    this.bottomSheet.show(RecordMemoListComponent, {
      initialState: {
        recordId: this.diagnosisResult$.value.id
      }
    });
  }

  changeCategory() {
    this.bottomSheet.show(CategoryChangeModal, {
      initialState: {
        diagnosisId: this.diagnosisResult$.value.id
      },
    })
  }
}
