import { Component, Input } from '@angular/core';
import { DefaultFilter } from 'src/app/@core/data/models/main-filter';

@Component({
  selector: 'app-total-sales-backside',
  templateUrl: './total-sales-backside.component.html',
  styleUrls: ['./total-sales-backside.component.scss']
})
export class TotalSalesBacksideComponent {
  @Input() mainFilter: DefaultFilter | null= null;


  data = {
    labels: ['Yurtiçi', 'Yurtdışı'],
    datasets: [{
      backgroundColor: ['#00D8FF', '#DD1B16'],
      data: [80, 20]
    }]
  };
  
  options = {
    responsive: true,
    position: "right",
     plugins: {
        legend: {
          display: false,
            labels: {
                color: 'rgb(255, 255, 255)'
            }
        }
    }
};
}
