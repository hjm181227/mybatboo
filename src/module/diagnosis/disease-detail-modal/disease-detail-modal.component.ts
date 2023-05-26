import { Component, Input } from '@angular/core';
import { SyntaxSharedModule } from "../../shared/syntax-shared.module";
import { PageHeaderComponent } from "../../shared/component/page-header/page-header.component";
import { BsModalRef } from "@mapiacompany/ngx-bootstrap-modal";
import { ApiService } from "../../../service/api.service";
import { DiseaseNamePipe } from "../../../pipe/disease-name.pipe";

@Component({
  selector: 'app-disease-detail-modal',
  standalone: true,
  imports: [
    SyntaxSharedModule,
    PageHeaderComponent,
    DiseaseNamePipe
  ],
  templateUrl: './disease-detail-modal.component.html',
  styleUrls: ['./disease-detail-modal.component.scss']
})
export class DiseaseDetailModalComponent {
  @Input() diseaseCode: number;
  @Input() diseaseName: string;
  @Input() cropName: string;
  @Input() sickKey: string;

  details$;

  constructor(
    public modalRef: BsModalRef,
    private api: ApiService
  ) {
  }
}
