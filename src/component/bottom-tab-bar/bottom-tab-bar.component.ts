import { Component, Input } from '@angular/core';
import { SyntaxSharedModule } from "../../module/shared/syntax-shared.module";
import { FormControl } from "@angular/forms";
import { CameraService } from "../../service/camera.service";
import { ApiService } from "../../service/api.service";
import { BsModalService } from "@mapiacompany/ngx-bootstrap-modal";
import { DiagnosisService } from "../../service/diagnosis.service";
import { ActivatedRoute, Router } from "@angular/router";
import { GlobalState } from "../../ngrx";
import { Store } from "@ngrx/store";
import { selectRouteData } from "../../ngrx/router.selector";
import { map, tap } from "rxjs";
import { AbstractBaseComponent } from "@mapiacompany/armory";

@Component({
  selector: 'bottom-tab-bar',
  standalone: true,
  imports: [
    SyntaxSharedModule,
  ],
  templateUrl: './bottom-tab-bar.component.html',
  styleUrls: [ './bottom-tab-bar.component.scss' ]
})
export class BottomTabBarComponent extends AbstractBaseComponent {
  @Input() activeTab = location.pathname.includes('my-page') ? 'my-page' : 'home';

  constructor(
    private api: ApiService,
    private cameraService: CameraService,
    private diagnosisService: DiagnosisService,
    private modalService: BsModalService,
    private router: Router,
    private store$: Store<GlobalState>,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit() {
    this.subscribeOn(
      this.route.url.pipe(
        tap((url) => {
          console.log(url);
          this.activeTab = location.pathname.includes('my-page') ? 'my-page' : 'home';
        })
      )
    )
  }

  diagnose() {
    this.diagnosisService.startDiagnosis();
  }
}
