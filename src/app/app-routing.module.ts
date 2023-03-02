import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Import Containers
import { DefaultLayoutComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'yonetim/dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'yonetim',
        loadChildren: () => import('./pages/yonetim/yonetim.module').then(m => m.YonetimModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
