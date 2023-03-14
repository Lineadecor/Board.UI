import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DagitimKanaliDetayComponent } from './dagitim-kanali-detay/dagitim-kanali-detay.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Dağıtım Kanalı',
    },
    children: [
      {
        path: 'detay',
        component: DagitimKanaliDetayComponent,
        data: {
          title: 'Dağıtım Kanalı Verileri',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DagitimKanaliRoutingModule { }
