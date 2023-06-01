import { Routes } from "@angular/router";
import { ExpertLayoutComponent } from "./expert-layout/expert-layout.component";

export const routes: Routes = [
  {
    path: '',
    component: ExpertLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'inquiry'
      },
      {
        path: 'inquiry',
        loadComponent: () => import('./inquiry-management/inquiry-management.component').then(c => c.InquiryManagementComponent),
      },
    ],
  }
]
