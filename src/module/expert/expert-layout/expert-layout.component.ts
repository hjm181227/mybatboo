import { Component } from '@angular/core';
import { AppHeaderComponent } from "../../../component/app-header/app-header.component";
import { SyntaxSharedModule } from "../../shared/syntax-shared.module";

@Component({
  selector: 'app-expert-layout',
  standalone: true,
  imports: [ SyntaxSharedModule, AppHeaderComponent ],
  templateUrl: './expert-layout.component.html',
  styleUrls: [ './expert-layout.component.scss' ]
})
export class ExpertLayoutComponent {

}
