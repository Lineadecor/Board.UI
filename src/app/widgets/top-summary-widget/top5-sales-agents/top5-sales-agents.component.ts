import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js';
import { NgxSpinnerService } from 'ngx-spinner';
import { Top5SalesAgentDto } from 'src/app/@core/data/dtos/top5-sales-agent-dto.model';
import { DefaultFilter } from 'src/app/@core/data/models/main-filter';
import { MainFilterService } from 'src/app/@core/services/filter-values.service';
import { SalesChannelService } from 'src/app/@core/services/sales-channel.service';
import { GlobalVariables } from 'src/global';
import { CustomTooltipHandler } from "src/app/@core/helpers/custom-tooltip-handler";

@Component({
  selector: 'app-top5-sales-agents',
  templateUrl: './top5-sales-agents.component.html',
  styleUrls: ['./top5-sales-agents.component.scss'],
  providers: [CurrencyPipe, DecimalPipe]
})
export class Top5SalesAgentsComponent {

  public chart4: any;

  top5AgentData = new Array<Top5SalesAgentDto>()

  mainFilter = new DefaultFilter();
  loading: boolean = true;
  constructor(private mainFilterService: MainFilterService,
    private salesService: SalesChannelService,
    private spinner: NgxSpinnerService,
    private global: GlobalVariables,
    private currencyPipe: CurrencyPipe,
    private numberPipe: DecimalPipe,
    private toolTipHandler: CustomTooltipHandler,
    private cd: ChangeDetectorRef) {

    this.mainFilterService.mainFilter$.subscribe(data => {
      this.mainFilter = data;
      this.getTop5AgentData().subscribe(val => {
        this.top5AgentData = val.results;
        this.toolTipHandler.dataForLabel = val.results;
        this.getChart(this.chart4);
        this.loading = false;
      })

    });

  }
  ngOnInit(): void {
    this.spinner.show("sp3");
    
  }


  getTop5AgentData() {
    return this.salesService.GetTop5SalesAgentsAsync(
      this.mainFilter.year,
      this.mainFilter.listMonths.join(","),
      this.mainFilter.currency,
      "1100"
    );

  }

  getChart(chart: Chart) {

    const labels = this.top5AgentData.map(x => x.cariAdi.slice(0,10));
    const data = {
      labels: labels,
      datasets: [{
        label: 'Toplam',
        data: this.top5AgentData.map(x => x.yuzde),
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
      this.chart4 = new Chart("top5AgentChart", {
        type: 'bar',
        data: data,

        options: {
          indexAxis: 'y',
          scales: {
            x:{
              ticks: {
                display: false
              },
              grid: {
                display: false
              }
            },
            y: {
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
                
                return "%" + this.numberPipe.transform(value, '1.0-0');
              }
            },

            
            tooltip: {
              enabled: false,
              position: 'average',
              titleColor: "white",
              
              external: this.toolTipHandler.externalTooltipHandler,
            }
          }
        }
      });
    } else {
      this.chart4.data = data;
      this.chart4.update("default");
    }
  }
}
