import { Component, ElementRef, Input, Renderer2, RendererStyleFlags2 } from '@angular/core';
import { SyntaxSharedModule } from "../../shared/syntax-shared.module";
import { ApiService } from "../../../service/api.service";
import { BehaviorSubject, catchError, EMPTY, iif, map, Observable, of, switchMap, tap } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { AbstractBaseComponent } from "@mapiacompany/armory";
import { BsModalRef } from "@mapiacompany/ngx-bootstrap-modal";
import { PageHeaderComponent } from "../../shared/component/page-header/page-header.component";
import { FastAverageColor, FastAverageColorResult } from "fast-average-color";
import { filter } from "rxjs/operators";
import { CropNamePipe } from "../../../pipe/crop-name.pipe";
import { CropTypeBadge } from "../../../component/crop-type-badge/crop-type-badge.component";
import { DiseaseListItem } from "../disease-list-item/disease-list-item.component";
import { MpCallout } from "@mapiacompany/styled-components";

@Component({
  selector: 'app-diagnosis-result',
  standalone: true,
  imports: [
    SyntaxSharedModule,
    PageHeaderComponent,
    CropNamePipe,
    CropTypeBadge,
    DiseaseListItem,
    MpCallout
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
    private api: ApiService,
    private route: ActivatedRoute,
    private modalRef: BsModalRef,
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {
    super();
  }

  ngOnInit() {
    this.subscribeOn(
      iif(
        () => !!this.diagnosisRecord,
        // this.api.getDiagnosisResult(this.diagnosisId),
        of(this.diagnosisRecord),
        this.route.params.pipe(
          map(({ diagnosisId }) => diagnosisId),
          switchMap(diagnosisId => this.api.getDiagnosisResult(diagnosisId)),
          map(res => res.data)
        )
      ).pipe(
        map(res => this.diagnosisResult$.next(res)),
        tap(console.log)
      )
    )

    this.modalRef.setClass('diagnosis-result-modal');
  }

  close() {
    this.modalRef.hide();
  }
}
