import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { YonetimDashboardComponent } from './yonetim-dashboard/yonetim-dashboard.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Yönetim',
    },
    children: [
      {
        path: 'dashboard',
        component: YonetimDashboardComponent,
        data: {
          title: 'Ana sayfa',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class YonetimRoutingModule { }
