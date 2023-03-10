import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js';
import { NgxSpinnerService } from 'ngx-spinner';
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
export class TotalMonthlySalesComponent implements OnInit {

  public chart3: any;

  monthlyData = new Array<SalesMonthlyDto>()

  mainFilter = new DefaultFilter();
  loading: boolean = true;
  constructor(private mainFilterService: MainFilterService,
    private salesService: SalesService,
    private spinner: NgxSpinnerService,
    private global: GlobalVariables,
    private currencyPipe: CurrencyPipe,
    private cd: ChangeDetectorRef) {

    this.mainFilterService.mainFilter$.subscribe(data => {
      this.mainFilter = data;
      this.getSalesSummaryData().subscribe(val => {
        this.monthlyData = val.results;
        this.getChart(this.chart3);
        this.loading = false;
      })

    });

  }
  ngOnInit(): void {
    this.spinner.show("sp3");
    
  }


  getSalesSummaryData() {
    return this.salesService.GetMonthlySalesDataAsync(
     {
      year: this.mainFilter.year,
      currency: this.mainFilter.currency},
    );

  }

  getChart(chart: Chart) {

    const labels = this.monthlyData.map(x => this.global.months[x.month]);
    const data = {
      labels: labels,
      datasets: [{
        label: 'Toplam',
        data: this.monthlyData.map(x => x.amount),
        fill: false,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(149, 189, 255)',
          'rgb(58, 152, 185)',
          'rgb(231, 177, 10)',
          'rgb(166, 31, 105)',
          'rgb(242, 205, 92)',
          'rgb(63, 73, 127)'
        ],
        borderWidth: 0
      }]
    };
    if (chart === undefined || chart === null) {
      this.chart3 = new Chart("salesMonthlyChart", {
        type: 'bar',
        data: data,

        options: {
          scales: {
            y:{
              ticks: {
                display: false
              },
              grid: {
                display: false
              }
            },
            x: {
              grid: {
                display: false
              }
            }
          },
          plugins: {
            legend: {
              display: false
            },
            datalabels: {
              color: 'black',
              rotation: 0,
              formatter: (value, ctx) => {
                return this.currencyPipe.transform(value, this.mainFilter.currency, 'symbol', '1.0-0', 'tr');
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