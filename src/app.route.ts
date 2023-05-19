import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { mainLayoutMatcher } from "./module/main-layout/main-layout.matcher";
import { AuthGuard } from "./guard/auth-guard.service";

const routes: Routes = [
  // {
  //   path: '',
  //   component: DefaultLayoutComponent,
  // },
  // {
  //   path: 'main',
  //   loadComponent: () => import('./page/main-tab/main-tab.component').then(c => c.MainTabComponent)
  // },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/onboarding'
  },
  {
    path: 'login',
    pathMatch: 'full',
    redirectTo: '/onboarding'
  },
  {
    path: 'onboarding',
    loadComponent: () => import('./page/onboarding/onboarding.component').then(c => c.OnboardingComponent),
  },
  {
    matcher: mainLayoutMatcher,
    loadChildren: () => import('./module/main-layout/main-layout.route').then(m => m.routes),
    runGuardsAndResolvers: 'pathParamsOrQueryParamsChange',
    // canActivate: [ AuthGuard ]
  },
  // {
  //   path: 'login',
  //   loadComponent: () => import('./module/login/login-modal/login-modal.component').then(c => c.LoginModal)
  // },
  {
    path: 'diagnosis/:diagnosisId',
    loadComponent: () => import('./module/diagnosis/diagnosis-result/diagnosis-result.component').then(c => c.DiagnosisResultComponent),
    // canActivate: [ AuthGuard ]
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
