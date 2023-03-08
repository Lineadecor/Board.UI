import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { ChangeDetectorRef, Component, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js';
import { SalesMonthlyDto } from 'src/app/@core/data/dtos/sales-monthly-dto.model';
import { DefaultFilter } from 'src/app/@core/data/models/main-filter';
import { MainFilterService } from 'src/app/@core/services/filter-values.service';
import { SalesService } from 'src/app/@core/services/sales.service';
import { GlobalVariables } from 'src/global';

@Component({
  selector: 'app-total-monthly-sales',
  templateUrl: './total-monthly-sales.component.html',
  styleUrls: ['./total-monthly-sales.component.scss'],
  providers: [CurrencyPipe]
})
export class TotalMonthlySalesComponent {

  public chart3: any;

  monthlyData = new Array<SalesMonthlyDto>()

  mainFilter = new DefaultFilter();

  constructor(private mainFilterService: MainFilterService,
    private salesService: SalesService,
    private global: GlobalVariables,
    private currencyPipe: CurrencyPipe,
    private cd: ChangeDetectorRef) {

    this.mainFilterService.mainFilter$.subscribe(data => {
      this.mainFilter = data;
      this.getSalesSummaryData().subscribe(val=> {
        this.monthlyData = val.results;
        this.getChart(this.chart3);
      })
      
    });



  }


  getSalesSummaryData() {
    return this.salesService.GetMonthlySalesDataAsync(
      this.mainFilter.year,
      this.mainFilter.currency,
    );

  }

  getChart(chart: Chart) {

    const labels = this.monthlyData.map(x => this.global.months[x.month]);
    const data = {
      labels: labels,
      datasets: [{
        axis: 'y',
        label: 'Toplam',
        data: this.monthlyData.map(x => x.amount),
        fill: true,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)'
        ],
        borderWidth: 1
      }]
    };
    if (chart === undefined || chart === null) {
      this.chart3 = new Chart("salesMonthlyChart", {
        type: 'bar', 
        data: data,
        options: {
          maintainAspectRatio: true,
          plugins: {
            legend: {
              display: false
            },
            datalabels: {
              color: 'black',
              rotation: 0,
              formatter: (value, ctx) => {
                return this.currencyPipe.transform(value, this.mainFilter.currency,'symbol','1.0-0', 'tr') ;
              }
            }
          }
        }
      });
    } else {
      this.chart3.data = data;
      this.chart3.update("default");
    }
  }
}