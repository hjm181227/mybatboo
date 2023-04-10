import { Component } from '@angular/core';
import { SharedModule } from "../../module/shared/shared.module";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    SharedModule
  ],
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent {

}
