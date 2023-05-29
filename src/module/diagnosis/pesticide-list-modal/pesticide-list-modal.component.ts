import { Component, Input } from '@angular/core';
import { SyntaxSharedModule } from "../../shared/syntax-shared.module";
import { ApiService } from "../../../service/api.service";
import { observeProperty$ } from "@mapiacompany/armory";
import { filter, switchMap } from "rxjs/operators";
import { BehaviorSubject, combineLatest, tap } from "rxjs";

@Component({
  selector: 'app-pesticide-list-modal',
  standalone: true,
  imports: [
    SyntaxSharedModule
  ],
  templateUrl: './pesticide-list-modal.component.html',
  styleUrls: ['./pesticide-list-modal.component.scss']
})
export class PesticideListModalComponent {
  @Input() cropName: string;
  @Input() diseaseName: string;

  loader$ = new BehaviorSubject(1);

  pesticideList$ = combineLatest([
    this.loader$,
    observeProperty$(this, 'cropName').pipe(
      filter((cropName) => cropName?.length > 0)
    ),
    observeProperty$(this, 'diseaseName').pipe(
      filter((diseaseName) => diseaseName?.length > 0)
    )
  ]).pipe(
    switchMap(([ page, cropName, diseaseName ]) => {
      return this.api.loadPesticideList({ cropName, diseaseName, page, displayCount: 10 })
    }),
    tap(console.log)
  )

  constructor(
    private api: ApiService
  ) {
  }
}
