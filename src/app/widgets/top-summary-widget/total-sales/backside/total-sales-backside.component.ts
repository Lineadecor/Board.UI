import { ChangeDetectorRef, Component, Input, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js';
import { CompanyBudgetSummaryDto } from 'src/app/@core/data/dtos/company-budget-summary-dto.model';
import { DefaultFilter } from 'src/app/@core/data/models/main-filter';
import { MainFilterService } from 'src/app/@core/services/filter-values.service';

@Component({
  selector: 'app-total-sales-backside',
  templateUrl: './total-sales-backside.component.html',
  styleUrls: ['./total-sales-backside.component.scss']
})
export class TotalSalesBacksideComponent {
  @Input() data: Array<CompanyBudgetSummaryDto> = new Array<CompanyBudgetSummaryDto>();


  public chart2: any;
  public totalAmount = 0;

  private viewData = new Array<CompanyBudgetSummaryDto>()

  mainFilter = new DefaultFilter();

  constructor(private mainFilterService: MainFilterService,
    private cd: ChangeDetectorRef) {

    this.mainFilterService.mainFilter$.subscribe(data => {
      this.mainFilter = data;

    });

  }

  ngOnInit(): void {
    this.getChart(this.chart2);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["data"].currentValue !== undefined) {
      this.viewData = changes["data"].currentValue;
      this.totalAmount = this.viewData.reduce((sum, current) => sum + current.total_Realized, 0);
      this.getChart(this.chart2);
    }

  }

  getChart(chart: Chart) {

    const labelData = this.viewData.map(x => x.salesOrganization);
    const seriesData = this.viewData.map(x => (x.total_Realized * 100) / this.totalAmount);
    const chartdata = {
      labels: labelData,
      datasets: [{
        label: 'Satış yüzdesi',
        data: seriesData,
        backgroundColor: [
          'rgb(138, 196, 208)',
          'rgb(244, 209, 96)'
        ],
        hoverOffset: 4
      }]
    };

    if (chart === undefined || chart === null) {
      this.chart2 = new Chart("salesQuantityChart", {
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
      this.chart2.data= chartdata;
      this.chart2.update("default");

    }
  }
}
