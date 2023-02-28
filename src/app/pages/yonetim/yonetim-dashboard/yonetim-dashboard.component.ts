import { Component,  OnInit } from '@angular/core';
import { ArcElement, Chart, PieController } from 'chart.js/auto';
import { BehaviorSubject } from 'rxjs';
import { SalesChannelDashboardSummaryDto } from 'src/app/@core/data/dtos/sales-channel-dashboard-summary-dto.model';
import { DefaultFilter } from 'src/app/@core/data/models/main-filter';
import { MainFilterService } from 'src/app/@core/services/filter-values.service';
import { SalesChannelService } from 'src/app/@core/services/sales-channel.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';
@Component({
  selector: 'app-yonetim-dashboard',
  templateUrl: './yonetim-dashboard.component.html',
  styleUrls: ['./yonetim-dashboard.component.scss']
})
export class YonetimDashboardComponent  implements OnInit {
  
  mainFilter :DefaultFilter= new DefaultFilter();
  
  constructor(
    private salesChannelService: SalesChannelService,
    private mainFilterService: MainFilterService) {
      this.mainFilterService.mainFilter$.subscribe(data=> {
        this.mainFilter=data;
       });
       Chart.register(ChartDataLabels, PieController, ArcElement);
  }
 
  salesChannelSummaryData= new Array<SalesChannelDashboardSummaryDto>();
  chart: any;

  ngOnInit(): void {
    this.getSalesChannelSummaryData();
    this.getChart();
    
  }


  getSalesChannelSummaryData() {
    var respose = this.salesChannelService.GetDashboardSummaryDataAsync(this.mainFilter.year, this.mainFilter.currency);
    respose.subscribe(data => {
      if(data.isSuccess) {
        this.salesChannelSummaryData = data.results;

      } else {

        console.error("Data alınamadı");
      }

    });

  }

 

  data = {
    labels: [
      'Yurtiçi',
      'Yurtdışı'
    ],
    datasets: [{
      label: 'Toplam satış hedefleri',
      data: [75, 25],
      backgroundColor: [
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };


  getChart() {
    this.chart = new Chart("MyChart", {
      type: 'pie', //this denotes tha type of chart

      data: this.data,
      options: {
        maintainAspectRatio: false,
        plugins: {
          legend:{
            display:true,
            position: "right"
          },
          datalabels: {
            color: 'white',
            rotation: 0,
            formatter: (value, ctx) => {
              let sum = 0;
              let dataArr = ctx.chart.data.datasets[0].data as Array<number>;
              dataArr.map(data => {
                  sum = sum + data  ;
              });
              let percentage = (value*100 / sum).toFixed(2)+"%";
              return  percentage;
          }
          }
        }
      }
      
    });
  }



}
