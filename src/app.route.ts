import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'main',
    loadComponent: () => import('./page/main-tab/main-tab.component').then(c => c.MainTabComponent)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/main'
  },
  {
    path: 'login',
    loadComponent: () => import('./page/login/login.component').then(c => c.LoginComponent)
  },
  {
    path: 'diangosis/:diagnosisId',
    loadComponent: () => import('./page/diagnosis-result/diagnosis-result.component').then(c => c.DiagnosisResultComponent)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'disabled',
      paramsInheritanceStrategy: 'always',
      initialNavigation: 'enabledBlocking'
    }),
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
