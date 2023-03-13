import { Component,  OnInit } from '@angular/core';
import { ArcElement, Chart, PieController } from 'chart.js/auto';
import { SalesChannelDashboardSummaryDto } from 'src/app/@core/data/dtos/sales-channel-dashboard-summary-dto.model';
import { DefaultFilter } from 'src/app/@core/data/models/main-filter';
import { MainFilterService } from 'src/app/@core/services/filter-values.service';
import { SalesChannelService } from 'src/app/@core/services/sales-channel.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-yonetim-dashboard',
  templateUrl: './yonetim-dashboard.component.html',
  styleUrls: ['./yonetim-dashboard.component.scss']
})
export class YonetimDashboardComponent  implements OnInit {
  
  public mainFilter :DefaultFilter= new DefaultFilter();
  loading: boolean = true;
  constructor(
    private salesChannelService: SalesChannelService,
    private spinner: NgxSpinnerService,
    private mainFilterService: MainFilterService) {
      this.mainFilterService.mainFilter$.subscribe(data=> {
        this.mainFilter=data;
       });
       Chart.register(ChartDataLabels, PieController, ArcElement);
  }
 
  salesChannelSummaryData= new Array<SalesChannelDashboardSummaryDto>();

  ngOnInit(): void {
    this.getSalesChannelSummaryData();
    this.spinner.show("spSalesChannels");
  }


  getSalesChannelSummaryData() {
    var respose = this.salesChannelService.GetDashboardSummaryDataAsync(
      {year: this.mainFilter.year, 
      months: this.mainFilter.listMonths.join(","), 
      currency: this.mainFilter.currency});
      
    respose.subscribe(data => {
      if(data.isSuccess) {
        this.salesChannelSummaryData = data.results;

      } else {

        console.error("Data alınamadı");
      }
      this.loading = false;
    });

  }

}
