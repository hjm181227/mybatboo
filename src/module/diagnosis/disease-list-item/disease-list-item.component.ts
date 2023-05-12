import { Component, Input } from '@angular/core';
import { SyntaxSharedModule } from "../../shared/syntax-shared.module";
import { DiseaseNamePipe } from "../../../pipe/disease-name.pipe";

@Component({
  selector: 'disease-list-item',
  standalone: true,
  imports: [
    SyntaxSharedModule,
    DiseaseNamePipe
  ],
  templateUrl: './disease-list-item.component.html',
  styleUrls: ['./disease-list-item.component.scss']
})
export class DiseaseListItem {
  @Input() diseaseItem: DiagnosisItem;

}
