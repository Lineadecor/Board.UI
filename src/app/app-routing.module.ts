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
      {
        path: 'satis-kanali',
        loadChildren: () => import('./pages/satis-kanali/satis-kanali.module').then(m => m.SatisKanaliModule)
      },
      {
        path: 'dagitim-kanali',
        loadChildren: () => import('./pages/dagitim-kanali/dagitim-kanali.module').then(m => m.DagitimKanaliModule)
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
