import { Routes } from "@angular/router";
import { TabBarLayoutComponent } from "./component/main-layout/tab-bar-layout.component";

export const routes: Routes = [
  {
    path: '',
    component: TabBarLayoutComponent,
    children: [
      {
        path: 'main',
        loadComponent: () => import('../../page/main-tab/main-tab.component').then(c => c.MainTabComponent),
        data: { type: 'home' }
      },
      {
        path: 'my-page',
        loadComponent: () => import('../my-page/my-page/my-page.component').then(c => c.MyPageComponent),
        data: { tab: 'my-page' }
      },
      {
        path: 'my-page/category',
        loadComponent: () => import('../../module/management/crop-management/crop-management.component').then(c => c.CropManagementComponent),
        data: { tab: 'my-page' }
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/main'
      }
    ],
  }
]
