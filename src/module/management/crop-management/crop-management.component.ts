import { Component } from '@angular/core';
import { SyntaxSharedModule } from "../../shared/syntax-shared.module";
import { map } from "rxjs";
import { ApiService } from "../../../service/api.service";
import { AbstractBaseComponent } from "@mapiacompany/armory";
import { FormControl } from "@angular/forms";
import { CategoryNamePipe } from "../../../pipe/category-name.pipe";
import { MpBottomSheetService } from "@mapiacompany/ngx-bootstrap-modal";

@Component({
  selector: 'app-crop-management',
  standalone: true,
  imports: [
    SyntaxSharedModule,
    CategoryNamePipe
  ],
  templateUrl: './crop-management.component.html',
  styleUrls: [ './crop-management.component.scss' ]
})
export class CropManagementComponent extends AbstractBaseComponent {
  categories$ = this.api.loadUserCategories().pipe(
    map(res => res.data)
  );

  currentCategory = new FormControl<string>(null);

  constructor(
    private api: ApiService,
    private bottomSheet: MpBottomSheetService
  ) {
    super();
  }

  openRecordList(category: Category) {
    import('../category-diagnosis-record-list/category-diagnosis-record-list.component').then(c => {
      this.bottomSheet.show(c.CategoryDiagnosisRecordListComponent, {
        initialState: {
          category
        }
      })
    })
  }

}
