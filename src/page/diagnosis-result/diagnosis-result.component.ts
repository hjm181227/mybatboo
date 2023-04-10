import { Component } from '@angular/core';
import { SharedModule } from "../../module/shared/shared.module";

@Component({
  selector: 'app-diagnosis-result',
  standalone: true,
  imports: [
    SharedModule
  ],
  templateUrl: './diagnosis-result.component.html',
  styleUrls: ['./diagnosis-result.component.scss']
})
export class DiagnosisResultComponent {

}
