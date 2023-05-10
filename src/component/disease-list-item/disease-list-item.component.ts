import { Component, Input } from '@angular/core';
import { SyntaxSharedModule } from "../../module/shared/syntax-shared.module";

@Component({
  selector: 'app-disease-list-item',
  standalone: true,
  imports: [
    SyntaxSharedModule
  ],
  templateUrl: './disease-list-item.component.html',
  styleUrls: ['./disease-list-item.component.scss']
})
export class DiseaseListItemComponent {
  @Input() diseaseCode: DiseaseCode = 5;
  @Input() cropType: CropType = 1;
  @Input() accuracy: number;
}
