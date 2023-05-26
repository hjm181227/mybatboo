import { Component } from '@angular/core';
import { SyntaxSharedModule } from "../../../shared/syntax-shared.module";
import { BottomTabBarComponent } from "../../../../component/bottom-tab-bar/bottom-tab-bar.component";
import { AppHeaderComponent } from "../../../../component/app-header/app-header.component";

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    SyntaxSharedModule,
    BottomTabBarComponent,
    AppHeaderComponent
  ],
  templateUrl: './tab-bar-layout.component.html',
  styleUrls: ['./tab-bar-layout.component.scss']
})
export class TabBarLayoutComponent {

}
