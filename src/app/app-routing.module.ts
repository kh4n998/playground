import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'playground',
    loadChildren: () => import("./playground/playground.module").then(m => m.PlaygroundModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'playground'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
