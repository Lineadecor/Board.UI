import { ChangeDetectionStrategy, Component, Input,  OnInit } from '@angular/core';
import { ArcElement, Chart, PieController } from 'chart.js';
import { DefaultFilter } from 'src/app/@core/data/models/main-filter';

@Component({
  selector: 'app-total-sales-frontside',
  templateUrl: './total-sales-frontside.component.html',
  styleUrls: ['./total-sales-frontside.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TotalSalesFrontsideComponent implements OnInit {
  @Input() mainFilter: DefaultFilter | null= null;

  public chart: any;

  constructor() {
  }
  ngOnInit(): void {
   
  }
}
