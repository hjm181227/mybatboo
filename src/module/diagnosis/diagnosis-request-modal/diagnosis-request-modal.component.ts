import { Component, Input } from '@angular/core';
import { AbstractBaseComponent, AsyncStatus, bindStatus } from "@mapiacompany/armory";
import { SyntaxSharedModule } from "../../shared/syntax-shared.module";
import { Photo } from "@capacitor/camera";
import { FormControl } from "@angular/forms";
import { GlobalState } from "../../../ngrx";
import { Store } from "@ngrx/store";
import { selectRecentCropType } from "../../../ngrx/user.state";
import { filter } from "rxjs/operators";
import { BehaviorSubject, catchError, map, tap } from "rxjs";
import { PageHeaderComponent } from "../../shared/component/page-header/page-header.component";
import { BsModalRef, BsModalService } from "@mapiacompany/ngx-bootstrap-modal";
import { ApiService } from "../../../service/api.service";
import { BottomFixedBar } from "../../../component/bottom-fixed-bar/bottom-fixed-bar";
import { DiagnosisService } from "../../../service/diagnosis.service";
import { Geolocation } from "@capacitor/geolocation";
import { CameraService } from "../../../service/camera.service";
import { Router } from "@angular/router";
import { Toast } from "ngx-toastr";
import { ToastService } from "../../../service/toast.service";

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

  status$ = new BehaviorSubject(AsyncStatus.INITIAL);

  constructor(
    private store$: Store<GlobalState>,
    private modalRef: BsModalRef,
    private api: ApiService,
    private diagnosisService: DiagnosisService,
    private cameraService: CameraService,
    private router: Router,
    private modalService: BsModalService,
    private toast: ToastService
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
    this.status$.next(AsyncStatus.PENDING);
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
          tap(() => this.status$.next(AsyncStatus.FULFILLED)),
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
          }),
          catchError(err => {
            if (err.code === 'NOTHING_DETECTED') {
              this.toast.show('검출할 대상을 찾지 못했습니다. 다시 시도해주세요.');
              this.modalRef.hide();
            }
            return err;
          })
        ).subscribe();
      }).catch(err => {
        console.log(err);
        this.status$.next(AsyncStatus.REJECTED);
      });
    }).catch(err => this.status$.next(AsyncStatus.REJECTED));
  }
}
