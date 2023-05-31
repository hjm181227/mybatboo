import { Component, Input } from '@angular/core';
import { SyntaxSharedModule } from "../../shared/syntax-shared.module";
import { PageHeaderComponent } from "../../shared/component/page-header/page-header.component";
import { BsModalRef } from "@mapiacompany/ngx-bootstrap-modal";
import { ApiService } from "../../../service/api.service";

@Component({
  selector: 'app-pesticide-detail',
  standalone: true,
  imports: [
    SyntaxSharedModule,
    PageHeaderComponent
  ],
  templateUrl: './pesticide-detail.component.html',
  styleUrls: ['./pesticide-detail.component.scss']
})
export class PesticideDetailComponent {
  @Input() pesticide: Pesticide;

  basicInfoLabels = [
    { label: '작물명', key: 'cropName'},
    { label: '적용병해충', key: 'diseaseWeedName'},
    { label: '농약명', key: 'pestiKorName' },
    { label: '상표명', key: 'pestiBrandName'},
    { label: '영어명', key: 'engName' },
    { label: '용도', key: 'useName'},
    { label: '법인명', key: 'compName'},
  ]
  detailInfoLabels = [
    { label: '희석배수(10a당 사용량)', key: 'dilutUnit'},
    { label: '안전사용기준 (수확 ~일 전)', key: 'useSuittime'},
    { label: '안전사용기준 (~회 이내)', key: 'useNum'},
    { label: '사용적기', key: 'pestiUse'},
  ]

  constructor(
    private modalRef: BsModalRef,
    private api: ApiService,
  ) {
  }

  ngOnInit() {
    console.log(this.pesticide);
  }

  close() {
    this.modalRef.hide();
  }
}
