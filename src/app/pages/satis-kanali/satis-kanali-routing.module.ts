import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SirketButcesiComponent } from './sirket-butcesi/sirket-butcesi.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Satış Kanalı',
    },
    children: [
      {
        path: 'sirket-butcesi',
        component: SirketButcesiComponent,
        data: {
          title: 'Şirket Bütçesi',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SatisKanaliRoutingModule { }
