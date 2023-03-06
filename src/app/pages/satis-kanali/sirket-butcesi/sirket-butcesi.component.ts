import { Component, ViewEncapsulation } from '@angular/core';
import { BudgetSalesChannelByOwnerDetailDto } from 'src/app/@core/data/dtos/budget-sales-channel-by-owner-detail-dto.model';
import { BudgetSalesChannelByOwnerMonthlyDto } from 'src/app/@core/data/dtos/budget-sales-channel-by-owner-monthly-dto.model';
import { DefaultFilter } from 'src/app/@core/data/models/main-filter';
import { MainFilterService } from 'src/app/@core/services/filter-values.service';
import { SalesChannelService } from 'src/app/@core/services/sales-channel.service';
import { GlobalVariables } from 'src/global';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'
import { ActivatedRoute } from '@angular/router';
import { SalesChannelDto } from 'src/app/@core/data/dtos/sales-channel-dto.model';


@Component({
  selector: 'app-sirket-butcesi',
  templateUrl: './sirket-butcesi.component.html',
  styleUrls: ['./sirket-butcesi.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SirketButcesiComponent {

  channelId: number;
  channel : SalesChannelDto;

  public isQuantity: boolean = false;
  public mainFilter: DefaultFilter = new DefaultFilter();
  public pivotTableData: SafeHtml;
  constructor(
    private salesChannelService: SalesChannelService,
    private mainFilterService: MainFilterService,
    private global: GlobalVariables,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute) {
    this.mainFilterService.mainFilter$.subscribe(data => {
      this.mainFilter = data;
    });

    this.channelId = this.route.snapshot.queryParams["id"];
  }

  salesChannelMonthlyData = new Array<BudgetSalesChannelByOwnerMonthlyDto>();

  salesChannelDetailedData = new Array<BudgetSalesChannelByOwnerDetailDto>();
  months = this.global.months;
  


  ngOnInit(): void {
    this.getSalesChannelSummaryData();
    this.getSalesChannelDetailedData();
    this.getSalesChannel(this.channelId);
  }

getSalesChannel(channelId: number) {
  var respose = this.salesChannelService.GetSalesChannelAsync(channelId);

  respose.subscribe(data => {
    if (data.isSuccess) {
      this.channel = data.results;

    } else {

      console.error("Data alınamadı");
    }

  });

}

  getSalesChannelSummaryData() {
    var respose = this.salesChannelService.GetSalesChannelOwnersCompanyBudgetMonthlyAsync(
      this.mainFilter.year, this.mainFilter.currency, this.channelId);

    respose.subscribe(data => {
      if (data.isSuccess) {
        this.salesChannelMonthlyData = data.results;

      } else {

        console.error("Data alınamadı");
      }

    });

  }

  getSalesChannelDetailedData() {
    var respose = this.salesChannelService.GetSalesChannelOwnersCompanyBudgetDetailAsync(
      this.mainFilter.year, this.mainFilter.currency, this.channelId, this.isQuantity);

    respose.subscribe(data => {
      if (data.isSuccess) {
        this.salesChannelDetailedData = data.results;
        this.pivotTableData = this.generatePivotTable(this.salesChannelDetailedData);

      } else {
        console.error("Data alınamadı");
      }

    });

  }

  generatePivotTable(data: Array<BudgetSalesChannelByOwnerDetailDto>) {

    var tableString = "";
    tableString += "<tr>";
    tableString += "<td colspan=\"3\"></td>";
    for (let index = 1; index < this.months.length; index++) {
      tableString += "<td><b>Bütçe</b></td><td><b>Fiili</b></td>";
    }
    tableString += "</tr>";



    let orderTypes = [... new Set(data.map(x => x.orderType))];
    orderTypes.forEach(orderType => {
      tableString += "<tr>";
      let partData = data.filter(x => x.orderType === orderType);
      var orderTypeText = (orderType?.startsWith(" | ") ? orderType?.replace(" | ", ""): orderType) as string;
      orderTypeText = orderTypeText?.replaceAll(" | ", "<br/>");
      if (partData.length > 1) {

        tableString += `<td rowspan="${partData.length}">${orderTypeText}</td>`;
      } else {
        tableString += `<td>${orderTypeText}</td>`;
      }

      let distChannels = [... new Set(partData.map(x => x.distributeChannel))];
      distChannels.forEach(distChannel => {
        if(tableString.endsWith("</tr>")) {
        tableString += "<tr>";
        }
        let distPartData = partData.filter(x => x.distributeChannel === distChannel);
        let distPartText: string = (distChannel?.startsWith(" | ") ?  distChannel?.replace(" | ", "") : distChannel) as string;

        distPartText = distPartText?.replaceAll(" | ", "<br/>|");
        if (distPartData.length > 1) {
          tableString += `<td rowspan="${distPartData.length}">${distPartText}</td>`;
        } else {
          tableString += `<td>${distPartText}</td>`;
        }

        distPartData.forEach(value => {
          let partText = (value.part?.startsWith(" | ") ?  value.part?.replace(" | ", "") : value.part) as string;
          partText = partText?.replaceAll(" | ", "<br/>|");

          tableString += `<td>${partText}</td>`;
          tableString += `<td  class="text-right">${value.ocakBudget}</td>`;
          tableString += `<td  class="text-right">${value.ocakReal}</td>`;
          tableString += `<td  class="text-right">${value.subatBudget}</td>`;
          tableString += `<td  class="text-right">${value.subatReal}</td>`;
          tableString += `<td  class="text-right">${value.martBudget}</td>`;
          tableString += `<td  class="text-right">${value.martReal}</td>`;
          tableString += `<td  class="text-right">${value.nisanBudget}</td>`;
          tableString += `<td  class="text-right">${value.nisanReal}</td>`;
          tableString += `<td  class="text-right">${value.mayisBudget}</td>`;
          tableString += `<td  class="text-right">${value.mayisReal}</td>`;
          tableString += `<td  class="text-right">${value.haziranBudget}</td>`;
          tableString += `<td  class="text-right">${value.haziranReal}</td>`;
          tableString += `<td  class="text-right">${value.temmuzBudget}</td>`;
          tableString += `<td  class="text-right">${value.temmuzReal}</td>`;
          tableString += `<td  class="text-right">${value.agustosBudget}</td>`;
          tableString += `<td  class="text-right">${value.agustosReal}</td>`;
          tableString += `<td  class="text-right">${value.eylulBudget}</td>`;
          tableString += `<td  class="text-right">${value.eylulReal}</td>`;
          tableString += `<td  class="text-right">${value.ekimBudget}</td>`;
          tableString += `<td  class="text-right">${value.ekimReal}</td>`;
          tableString += `<td  class="text-right">${value.kasimBudget}</td>`;
          tableString += `<td  class="text-right">${value.kasimReal}</td>`;
          tableString += `<td  class="text-right">${value.aralikBudget}</td>`;
          tableString += `<td  class="text-right">${value.aralikReal}</td>`;
          tableString += "</tr>";
        });


      });

    });

    return this.sanitizer.bypassSecurityTrustHtml(tableString);
  }

}
