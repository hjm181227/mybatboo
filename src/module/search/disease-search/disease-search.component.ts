import { Component } from '@angular/core';
import { SyntaxSharedModule } from "../../shared/syntax-shared.module";
import { AbstractBaseComponent, AsyncStatus, bindStatus } from "@mapiacompany/armory";
import { ApiService } from "../../../service/api.service";
import { PageHeaderComponent } from "../../shared/component/page-header/page-header.component";
import { FormControl, FormGroup } from "@angular/forms";
import { MpBlank, MpInput, MpLabel } from "@mapiacompany/styled-components";
import { BehaviorSubject, Observable, switchMap, tap } from "rxjs";
import { MpBottomPagination } from "@mapiacompany/styled-components/pagination";
import { CropNamePipe } from "../../../pipe/crop-name.pipe";
import { MpCol, MpHeadDirective, MpRow, MpTable } from "@mapiacompany/styled-components/table";
import { NavigateService } from "../../../service/navigate.service";

@Component({
  selector: 'app-disease-search',
  standalone: true,
  imports: [
    SyntaxSharedModule,
    PageHeaderComponent,
    MpInput,
    MpLabel,
    MpBottomPagination,
    CropNamePipe,
    MpTable,
    MpCol,
    MpRow,
    MpHeadDirective,
    MpBlank
  ],
  templateUrl: './disease-search.component.html',
  styleUrls: [ './disease-search.component.scss' ]
})
export class DiseaseSearchComponent extends AbstractBaseComponent {
  form = {
    keyword: new FormControl<string>(''),
    cropName: new FormControl<string>('')
  }
  formGroup = new FormGroup(this.form);

  listNum = 6;
  loader$ = new BehaviorSubject(1);
  searchStatus$ = new BehaviorSubject(AsyncStatus.INITIAL);
  searchResult: DiseaseSearchList = {
    totalCnt: 0,
    sickList: []
  }
  searchResult$: Observable<DiseaseSearchList> = this.loader$.pipe(
    // filter(() => {
    //   const { keyword, cropName } = this.formGroup.value;
    //   return keyword.length > 0 || cropName.length > 0;
    // }),
    switchMap((page) => {
      const { keyword, cropName } = this.formGroup.value;

      return this.api.searchDisease({
        cropName,
        keyword,
        listNum: this.listNum,
        page
      }).pipe(
        bindStatus(this.searchStatus$),
        tap(result => this.searchResult = result)
      )
    }),
  )

  constructor(
    private api: ApiService,
    private navigate: NavigateService
  ) {
    super();
  }

  close() {
    history.back();
  }

  trackByFn(index: number, disease: any) {
    return disease.sickKey;
  }

  openDiseaseDetailModal(disease: DiseaseSearchItem) {
    this.navigate.openDiseaseDetailModal({
      sickKey: disease.sickKey,
      diseaseName: disease.sickNameKor,
      cropName: disease.cropName,
    });
  }
}
