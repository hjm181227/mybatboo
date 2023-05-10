import { Component, Input } from '@angular/core';
import { SyntaxSharedModule } from "../../shared/syntax-shared.module";
import { ApiService } from "../../../service/api.service";
import { iif, map, Observable, switchMap, tap } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { AbstractBaseComponent } from "@mapiacompany/armory";
import { BsModalRef } from "@mapiacompany/ngx-bootstrap-modal";

@Component({
  selector: 'app-diagnosis-result',
  standalone: true,
  imports: [
    SyntaxSharedModule
  ],
  templateUrl: './diagnosis-result.component.html',
  styleUrls: [ './diagnosis-result.component.scss' ]
})
export class DiagnosisResultComponent extends AbstractBaseComponent {
  @Input() diagnosisId: number;

  diagnosisResult$: Observable<any>;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private modalRef: BsModalRef
  ) {
    super();
  }

  ngOnInit() {
    this.diagnosisResult$ = iif(
      () => !!this.diagnosisId,
      this.api.getDiagnosisResult(this.diagnosisId),
      this.route.params.pipe(
        map(({ diagnosisId }) => diagnosisId),
        switchMap(diagnosisId => this.api.getDiagnosisResult(diagnosisId))
      )
    ).pipe(
      tap(console.log)
    )

    this.subscribeOn(
      this.diagnosisResult$
    )

    this.modalRef.setClass('diagnosis-result-modal');
  }
}
