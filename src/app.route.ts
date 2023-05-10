import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { mainLayoutMatcher } from "./module/main-layout/main-layout.matcher";

const routes: Routes = [
  // {
  //   path: '',
  //   component: DefaultLayoutComponent,
  // },
  // {
  //   path: 'main',
  //   loadComponent: () => import('./page/main-tab/main-tab.component').then(c => c.MainTabComponent)
  // },
  // {
  //   path: '',
  //   pathMatch: 'full',
  //   redirectTo: '/main'
  // },
  {
    matcher: mainLayoutMatcher,
    loadChildren: () => import('./module/main-layout/main-layout.route').then(m => m.routes),
    runGuardsAndResolvers: 'pathParamsOrQueryParamsChange'
  },
  {
    path: 'login',
    loadComponent: () => import('./page/login/login.component').then(c => c.LoginComponent)
  },
  {
    path: 'diagnosis/:diagnosisId',
    loadComponent: () => import('./module/diagnosis/diagnosis-result/diagnosis-result.component').then(c => c.DiagnosisResultComponent),
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
