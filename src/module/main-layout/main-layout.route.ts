import { Routes } from "@angular/router";
import { MainLayoutComponent } from "./component/main-layout/main-layout.component";

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
        path: '',
        pathMatch: 'full',
        redirectTo: '/main'
      }
    ]
  }
]
