import { Routes } from "@angular/router";
import { MainLayoutComponent } from "./component/main-layout/main-layout.component";
import { AuthGuard } from "../../guard/auth-guard.service";

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'main',
        loadComponent: () => import('../../page/main-tab/main-tab.component').then(c => c.MainTabComponent)
      },
      {
        path: 'my-crops',
        loadComponent: () => import('../../module/management/crop-management/crop-management.component').then(c => c.CropManagementComponent)
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/main'
      }
    ],
    // canActivate: [ AuthGuard ]
  }
]
