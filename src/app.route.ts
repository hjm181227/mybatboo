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
  }
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
