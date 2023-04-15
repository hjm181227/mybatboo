import { Component } from '@angular/core';
import { SharedModule } from "../../module/shared/shared.module";
import { ApiService } from "../../service/api.service";

@Component({
  selector: 'app-diagnosis-result',
  standalone: true,
  imports: [
    SharedModule
  ],
  templateUrl: './diagnosis-result.component.html',
  styleUrls: [ './diagnosis-result.component.scss' ]
})
export class DiagnosisResultComponent {
  diagnosisResult$ = this.api.getDiagnosisResult(1);

  constructor(
    private api: ApiService
  ) {
  }
}
