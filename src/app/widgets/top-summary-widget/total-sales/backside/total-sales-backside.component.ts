import { Component, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { CompanyBudgetSummaryDto } from 'src/app/@core/data/dtos/company-budget-summary-dto.model';
import { DefaultFilter } from 'src/app/@core/data/models/main-filter';
import { MainFilterService } from 'src/app/@core/services/filter-values.service';
import { SalesService } from 'src/app/@core/services/sales.service';

@Component({
  selector: 'app-total-sales-backside',
  templateUrl: './total-sales-backside.component.html',
  styleUrls: ['./total-sales-backside.component.scss']
})
export class TotalSalesBacksideComponent {
  public chart2: any;

  public totalAmount = 0;
  salesSummaryData = new Array<CompanyBudgetSummaryDto>();
  mainFilter = new DefaultFilter();


  constructor(private mainFilterService: MainFilterService,
    private salesService: SalesService) {
    
    this.mainFilterService.mainFilter$.subscribe(data => {
      this.mainFilter = data;
      this.getSalesSummaryData();
      
    });

  }

  ngOnInit(): void {
    
  }

  getSalesSummaryData() {
    var respose = this.salesService.GetDashboardSummaryDataAsync(
      this.mainFilter.year,
      this.mainFilter.currency,
      true);

    respose.subscribe(data => {
      if (data.isSuccess) {
        this.salesSummaryData = data.results;

        this.totalAmount = this.salesSummaryData.reduce((sum, current) => sum + current.total_Realized, 0);
        this.getChart();
      } else {
        console.error("Data alınamadı");
      }

    });

  }

  getChart() {

    const labelData = this.salesSummaryData.map(x=>x.salesOrganization);
    const seriesData = this.salesSummaryData.map(x=> (x.total_Realized *100) / this.totalAmount);
    const data = {
      labels: labelData,
      datasets: [{
        label: 'Satış yüzdesi',
        data: seriesData,
        backgroundColor: [
          'rgb(255, 91, 0)',
          'rgb(212, 217, 37)'
        ],
        hoverOffset: 4
      }]
    };

    this.chart2 = new Chart("salesQuantityChart", {
      type: 'pie', //this denotes tha type of chart

      data: data,
      options: {
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "right"
          },
          datalabels: {
            color: 'black',
            rotation: 0,
            formatter: (value, ctx) => {
              let sum = 0;
              let dataArr = ctx.chart.data.datasets[0].data as Array<number>;
              dataArr.map(data => {
                sum = sum + data;
              });
              let percentage = (value * 100 / sum).toFixed(0) + "%";
              return percentage;
            }
          }
        }
      }

    });
  }
}
