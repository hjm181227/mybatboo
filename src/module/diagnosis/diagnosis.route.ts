import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: ':diagnosisId',
    loadComponent: () => import('./diagnosis-result/diagnosis-result.component').then(c => c.DiagnosisResultComponent),
  },
]
