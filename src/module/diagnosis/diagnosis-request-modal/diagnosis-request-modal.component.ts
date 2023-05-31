import { Component, Input } from '@angular/core';
import { AbstractBaseComponent, AsyncStatus } from "@mapiacompany/armory";
import { SyntaxSharedModule } from "../../shared/syntax-shared.module";
import { Photo } from "@capacitor/camera";
import { FormControl } from "@angular/forms";
import { GlobalState } from "../../../ngrx";
import { Store } from "@ngrx/store";
import { selectRecentCropType } from "../../../ngrx/user.state";
import { filter, take } from "rxjs/operators";
import { BehaviorSubject, catchError, EMPTY, tap } from "rxjs";
import { PageHeaderComponent } from "../../shared/component/page-header/page-header.component";
import { BsModalRef, BsModalService } from "@mapiacompany/ngx-bootstrap-modal";
import { ApiService } from "../../../service/api.service";
import { BottomFixedBar } from "../../../component/bottom-fixed-bar/bottom-fixed-bar";
import { DiagnosisService } from "../../../service/diagnosis.service";
import { Geolocation, Position } from "@capacitor/geolocation";
import { CameraService } from "../../../service/camera.service";
import { Router } from "@angular/router";
import { ToastService } from "../../../service/toast.service";
import { AlertService } from "@mapiacompany/styled-components";
import { ngrxUserActions } from "../../../ngrx/user.reducer";

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

  geolocation: Position;
  geoLocationPromise: Promise<Position>;

  constructor(
    private store$: Store<GlobalState>,
    private modalRef: BsModalRef,
    private api: ApiService,
    private diagnosisService: DiagnosisService,
    private cameraService: CameraService,
    private router: Router,
    private modalService: BsModalService,
    private toast: ToastService,
    private alert: AlertService
  ) {
    super();
  }

  ngOnInit() {
    this.modalRef.setClass('diagnosis-request-modal');
    this.subscribeOn(
      this.store$.select(selectRecentCropType).pipe(
        filter(cropType => !!cropType),
        tap(cropType => this.cropType.patchValue(cropType))
      )
    );

    this.geoLocationPromise = Geolocation.getCurrentPosition().then(position => {
      this.geolocation = position;
      return position;
    })
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
    const requestAction$ = ({ latitude, longitude }) => {
      const fileName = 'mybatboo_' + (new Date().getTime()) + '.jpg';

      this.status$.next(AsyncStatus.PENDING);
      this.cameraService.writeFileToDevice(this.cropPhoto.dataUrl, fileName).then(res => {
        this.cameraService.readFileFromDevice(res.fileName).then(image => {
          const requestInput: DiagnosisRequestInput = {
            cropType: this.cropType.value,
            image,
            geolocation: { latitude, longitude }
          };

          this.api.requestDiagnosis(requestInput).pipe(
            take(1),
            tap(() => this.status$.next(AsyncStatus.FULFILLED)),
            tap(() => this.store$.dispatch(ngrxUserActions.setRecentCropType({ recentCropType: this.cropType.value }))),
            tap(res => {
              this.close();
              import('../diagnosis-result/diagnosis-result.component').then(c => {
                this.modalService.show(c.DiagnosisResultComponent, {
                  initialState: {
                    diagnosisRecord: res.data
                  }
                })
              });
              this.cameraService.deleteImageFromDevice(fileName).then(() => console.log('image deleted'));
            }),
            catchError(err => {
              if (err.error?.code === 'NOTHING_DETECTED' || err.code === 'NOTHING_DETECTED') {
                this.alert.alert({
                  title: '검출 대상을 찾지 못했습니다.',
                  content: '작물이 사진에 잘 보이도록 다시 촬영해주세요.',
                  closeMessage: '확인',
                  closeButtonColor: 'green'
                }).pipe(
                  tap(() => this.close())
                ).subscribe();
              } else {
                this.toast.show(err.message);
                this.status$.next(AsyncStatus.REJECTED);
              }
              return EMPTY;
            })
          ).subscribe();
        }).catch(err => {
          this.toast.show('이미지 로드에 실패했습니다. 다시 시도해주세요.');
          this.status$.next(AsyncStatus.REJECTED);
        });
      }).catch(err => {
        this.toast.show('촬영한 이미지를 가져오는데 실패했습니다. 다시 시도해주세요.');
        this.status$.next(AsyncStatus.REJECTED);
      });
    }
    if (this.geolocation) {
      const { latitude, longitude } = this.geolocation.coords;
      requestAction$({ latitude, longitude });
    } else {
      Geolocation.getCurrentPosition().then(position => {
        const { latitude, longitude } = position.coords;
        requestAction$({ latitude, longitude });
      });
    }
  }
}
