import { Component, Input } from '@angular/core';
import { AbstractBaseComponent } from "@mapiacompany/armory";
import { SyntaxSharedModule } from "../../shared/syntax-shared.module";
import { Photo } from "@capacitor/camera";
import { FormControl } from "@angular/forms";
import { GlobalState } from "../../../ngrx";
import { Store } from "@ngrx/store";
import { selectRecentCropType } from "../../../ngrx/user.state";
import { filter } from "rxjs/operators";
import { map, tap } from "rxjs";
import { PageHeaderComponent } from "../../shared/component/page-header/page-header.component";
import { BsModalRef, BsModalService } from "@mapiacompany/ngx-bootstrap-modal";
import { ApiService } from "../../../service/api.service";
import { BottomFixedBar } from "../../../component/bottom-fixed-bar/bottom-fixed-bar";
import { DiagnosisService } from "../../../service/diagnosis.service";
import { Geolocation } from "@capacitor/geolocation";
import { CameraService } from "../../../service/camera.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-diagnosis-request-modal',
  standalone: true,
  imports: [
    SyntaxSharedModule,
    PageHeaderComponent,
    BottomFixedBar,
  ],
  templateUrl: './diagnosis-request-modal.component.html',
  styleUrls: [ './diagnosis-request-modal.component.scss' ]
})
export class DiagnosisRequestModalComponent extends AbstractBaseComponent {
  @Input() cropPhoto: Photo;

  cropType = new FormControl<number>(null);

  constructor(
    private store$: Store<GlobalState>,
    private modalRef: BsModalRef,
    private api: ApiService,
    private diagnosisService: DiagnosisService,
    private cameraService: CameraService,
    private router: Router,
    private modalService: BsModalService
  ) {
    super();
  }

  ngOnInit() {
    this.modalRef.setClass('diagnosis-request-modal');
    console.log(this.cropPhoto);
    this.subscribeOn(
      this.store$.select(selectRecentCropType).pipe(
        filter(cropType => !!cropType),
        tap(cropType => this.cropType.patchValue(cropType))
      )
    )
  }

  selectCropType(cropType: number) {
    this.cropType.patchValue(cropType);
  }

  close() {
    this.modalRef.hide();
  }

  retakePhoto() {
    this.close();
    this.diagnosisService.startDiagnosis();
  }

  request() {
    Geolocation.getCurrentPosition().then(position => {
      const { latitude, longitude } = position.coords;
      this.cameraService.convertPhotoToFile(this.cropPhoto).then(image => {
        const requestInput: DiagnosisRequestInput = {
          cropType: this.cropType.value,
          image,
          geolocation: { latitude, longitude }
        };

        this.api.requestDiagnosis(requestInput).pipe(
          tap(console.log),
          map((res: ApiResponse<DiagnosisRecord>) => res.data),
          tap(res => {
            // this.router.navigate([ '/diagnosis', res.recordId ]);
            this.close();
            import('../diagnosis-result/diagnosis-result.component').then(c => {
              this.modalService.show(c.DiagnosisResultComponent, {
                initialState: {
                  diagnosisRecord: res
                }
              })
            })
          })
        ).subscribe();
      });
    });
  }
}
