import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js';
import { CompanyBudgetSummaryDto } from 'src/app/@core/data/dtos/company-budget-summary-dto.model';
import { DefaultFilter } from 'src/app/@core/data/models/main-filter';
import { MainFilterService } from 'src/app/@core/services/filter-values.service';

@Component({
  selector: 'app-total-sales-frontside',
  templateUrl: './total-sales-frontside.component.html',
  styleUrls: ['./total-sales-frontside.component.scss']
})
export class TotalSalesFrontsideComponent implements OnInit, OnChanges {
  @Input() data: Array<CompanyBudgetSummaryDto> = new Array<CompanyBudgetSummaryDto>();

  public chart: any;
  public totalSales = 0;

  public viewData = new Array<CompanyBudgetSummaryDto>()

  mainFilter = new DefaultFilter();

  constructor(private mainFilterService: MainFilterService,
    private cd: ChangeDetectorRef) {

    this.mainFilterService.mainFilter$.subscribe(data => {
      this.mainFilter = data;

    });

  }

  ngOnInit(): void {
    this.getChart(this.chart);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["data"].currentValue !== undefined) {
      this.viewData = changes["data"].currentValue;
      this.totalSales = this.viewData.reduce((sum, current) => sum + current.total_Realized, 0);
      this.getChart(this.chart);
    }

  }

  getChart(chart: Chart) {

    const labelData = this.viewData.map(x => x.salesOrganization);
    const seriesData = this.viewData.map(x => (x.total_Realized * 100) / this.totalSales);
    const chartdata = {
      labels: labelData,
      datasets: [{
        label: 'Satış yüzdesi',
        data: seriesData,
        backgroundColor: [
          'rgb(0,172,237)',
          'rgb(244, 209, 96)'
        ],
        hoverOffset: 4
      }]
    };

    if (chart === undefined || chart === null) {
      this.chart = new Chart("salesAmountChart", {
        type: 'pie', //this denotes tha type of chart

        data: chartdata,
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
    } else {
      this.chart.data= chartdata;
      this.chart.update("default");

    }
  }

}
