import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BudgetSalesChannelByOwnerDetailDto } from 'src/app/@core/data/dtos/budget-sales-channel-by-owner-detail-dto.model';
import { BudgetSalesChannelByOwnerMonthlyDto } from 'src/app/@core/data/dtos/budget-sales-channel-by-owner-monthly-dto.model';
import { DefaultFilter } from 'src/app/@core/data/models/main-filter';
import { MainFilterService } from 'src/app/@core/services/filter-values.service';
import { SalesChannelService } from 'src/app/@core/services/sales-channel.service';
import { GlobalVariables } from 'src/global';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'
import { ActivatedRoute } from '@angular/router';
import { SalesChannelDto } from 'src/app/@core/data/dtos/sales-channel-dto.model';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-sirket-butcesi',
  templateUrl: './sirket-butcesi.component.html',
  styleUrls: ['./sirket-butcesi.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [CurrencyPipe, DecimalPipe,]
})
export class SirketButcesiComponent implements OnInit {

  channelId: number;
  channel: SalesChannelDto;
  loading: boolean = true;

  public isQuantity: boolean = false;
  public viewTypeRdGrp = new UntypedFormGroup({
    viewTypeGrp: new UntypedFormControl('Tutar')
  });


  public mainFilter: DefaultFilter = new DefaultFilter();
  public pivotTableData: SafeHtml;
  constructor(
    private salesChannelService: SalesChannelService,
    private mainFilterService: MainFilterService,
    private global: GlobalVariables,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private currencyPipe: CurrencyPipe,
    private numberPipe: DecimalPipe,
    private library: FaIconLibrary,
    private spinner: NgxSpinnerService,
  ) {
    this.library.addIconPacks(fas, far);
    this.mainFilterService.mainFilter$.subscribe(data => {
      this.mainFilter = data;
    });

    this.channelId = this.route.snapshot.queryParams["id"];
  }

  salesChannelMonthlyData = new Array<BudgetSalesChannelByOwnerMonthlyDto>();

  salesChannelDetailedData = new Array<BudgetSalesChannelByOwnerDetailDto>();
  months = this.global.months;
  selectedTableName: string = 'AylikSirketButcesi';


  ngOnInit(): void {
    this.refreshData(false);
    this.spinner.show("spBudgets");
  }

  public refreshData(param: boolean) {
    this.isQuantity = param;
    this.viewTypeRdGrp.setValue({ viewTypeGrp: param ? "Miktar" : "Tutar" });
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
      this.mainFilter.year, this.mainFilter.currency, this.channelId, this.isQuantity);

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
      this.loading = false;
    });

  }

  generatePivotTable(data: Array<BudgetSalesChannelByOwnerDetailDto>) {

    var tableString = "";
    tableString += "<tr>";
    tableString += "<td colspan=\"3\"></td>";
    for (let index = 1; index <= this.months.length; index++) {
      tableString += "<td><b>Bütçe</b></td><td><b>Fiili</b></td>";
    }
    tableString += "</tr>";
    let bgColor = "td-bg-white";
    let orderTypes = [... new Set(data.map(x => x.orderType))];
    orderTypes.forEach(orderType => {
      if (bgColor === "td-bg-white") {
        bgColor = "td-bg-blue";
      } else {
        bgColor = "td-bg-white";
      }
      tableString += `<tr class=\"${bgColor}\">`;
      let partData = data.filter(x => x.orderType === orderType);
      var orderTypeText = (orderType?.startsWith(" | ") ? orderType?.replace(" | ", "") : orderType) as string;
      orderTypeText = orderTypeText?.replaceAll(" | ", "<br/>");

      if (partData.length > 1) {
        tableString += `<td rowspan="${partData.length}">${orderTypeText}</td>`;
      } else {
        tableString += `<td>${orderTypeText}</td>`;
      }

      let distChannels = [... new Set(partData.map(x => x.distributeChannel))];
      distChannels.forEach(distChannel => {
        if (tableString.endsWith("</tr>")) {
          tableString += `<tr class=\"${bgColor}\">`;
        }
        let distPartData = partData.filter(x => x.distributeChannel === distChannel);
        let distPartText: string = (distChannel?.startsWith(" | ") ? distChannel?.replace(" | ", "") : distChannel) as string;

        distPartText = distPartText?.replaceAll(" | ", "<br/>");
        if (distPartData.length > 1) {
          tableString += `<td rowspan="${distPartData.length}">${distPartText}</td>`;
        } else {
          tableString += `<td>${distPartText}</td>`;
        }

        distPartData.forEach(value => {
          let partText = (value.part?.startsWith(" | ") ? value.part?.replace(" | ", "") : value.part) as string;
          partText = partText?.replaceAll(" | ", "<br/>");

          tableString += `<td>${partText}</td>`;
          if (this.isQuantity) {
            tableString += `<td class="text-right">${this.numberPipe.transform(value.ocakBudget, '1.0-0')}</td>`;
            tableString += `<td class="text-right">${this.numberPipe.transform(value.ocakReal, '1.0-0')}</td>`;
            tableString += `<td class="text-right">${this.numberPipe.transform(value.subatBudget, '1.0-0')}</td>`;
            tableString += `<td class="text-right">${this.numberPipe.transform(value.subatReal, '1.0-0')}</td>`;
            tableString += `<td class="text-right">${this.numberPipe.transform(value.martBudget, '1.0-0')}</td>`;
            tableString += `<td class="text-right">${this.numberPipe.transform(value.martReal, '1.0-0')}</td>`;
            tableString += `<td class="text-right">${this.numberPipe.transform(value.nisanBudget, '1.0-0')}</td>`;
            tableString += `<td class="text-right">${this.numberPipe.transform(value.nisanReal, '1.0-0')}</td>`;
            tableString += `<td class="text-right">${this.numberPipe.transform(value.mayisBudget, '1.0-0')}</td>`;
            tableString += `<td class="text-right">${this.numberPipe.transform(value.mayisReal, '1.0-0')}</td>`;
            tableString += `<td class="text-right">${this.numberPipe.transform(value.haziranBudget, '1.0-0')}</td>`;
            tableString += `<td class="text-right">${this.numberPipe.transform(value.haziranReal, '1.0-0')}</td>`;
            tableString += `<td class="text-right">${this.numberPipe.transform(value.temmuzBudget, '1.0-0')}</td>`;
            tableString += `<td class="text-right">${this.numberPipe.transform(value.temmuzReal, '1.0-0')}</td>`;
            tableString += `<td class="text-right">${this.numberPipe.transform(value.agustosBudget, '1.0-0')}</td>`;
            tableString += `<td class="text-right">${this.numberPipe.transform(value.agustosReal, '1.0-0')}</td>`;
            tableString += `<td class="text-right">${this.numberPipe.transform(value.eylulBudget, '1.0-0')}</td>`;
            tableString += `<td class="text-right">${this.numberPipe.transform(value.eylulReal, '1.0-0')}</td>`;
            tableString += `<td class="text-right">${this.numberPipe.transform(value.ekimBudget, '1.0-0')}</td>`;
            tableString += `<td class="text-right">${this.numberPipe.transform(value.ekimReal, '1.0-0')}</td>`;
            tableString += `<td class="text-right">${this.numberPipe.transform(value.kasimBudget, '1.0-0')}</td>`;
            tableString += `<td class="text-right">${this.numberPipe.transform(value.kasimReal, '1.0-0')}</td>`;
            tableString += `<td class="text-right">${this.numberPipe.transform(value.aralikBudget, '1.0-0')}</td>`;
            tableString += `<td class="text-right">${this.numberPipe.transform(value.aralikReal, '1.0-0')}</td>`;
            tableString += `<td class="text-right">${this.numberPipe.transform(value.totalBudget, '1.0-0')}</td>`;
            tableString += `<td class="text-right">${this.numberPipe.transform(value.totalReal, '1.0-0')}</td>`;
          } else {
            tableString += `<td class="text-right">${this.currencyPipe.transform(value.ocakBudget, this.mainFilter.currency, 'symbol', '1.0-0', 'tr')}</td>`;
            tableString += `<td class="text-right">${this.currencyPipe.transform(value.ocakReal, this.mainFilter.currency, 'symbol', '1.0-0', 'tr')}</td>`;
            tableString += `<td class="text-right">${this.currencyPipe.transform(value.subatBudget, this.mainFilter.currency, 'symbol', '1.0-0', 'tr')}</td>`;
            tableString += `<td class="text-right">${this.currencyPipe.transform(value.subatReal, this.mainFilter.currency, 'symbol', '1.0-0', 'tr')}</td>`;
            tableString += `<td class="text-right">${this.currencyPipe.transform(value.martBudget, this.mainFilter.currency, 'symbol', '1.0-0', 'tr')}</td>`;
            tableString += `<td class="text-right">${this.currencyPipe.transform(value.martReal, this.mainFilter.currency, 'symbol', '1.0-0', 'tr')}</td>`;
            tableString += `<td class="text-right">${this.currencyPipe.transform(value.nisanBudget, this.mainFilter.currency, 'symbol', '1.0-0', 'tr')}</td>`;
            tableString += `<td class="text-right">${this.currencyPipe.transform(value.nisanReal, this.mainFilter.currency, 'symbol', '1.0-0', 'tr')}</td>`;
            tableString += `<td class="text-right">${this.currencyPipe.transform(value.mayisBudget, this.mainFilter.currency, 'symbol', '1.0-0', 'tr')}</td>`;
            tableString += `<td class="text-right">${this.currencyPipe.transform(value.mayisReal, this.mainFilter.currency, 'symbol', '1.0-0', 'tr')}</td>`;
            tableString += `<td class="text-right">${this.currencyPipe.transform(value.haziranBudget, this.mainFilter.currency, 'symbol', '1.0-0', 'tr')}</td>`;
            tableString += `<td class="text-right">${this.currencyPipe.transform(value.haziranReal, this.mainFilter.currency, 'symbol', '1.0-0', 'tr')}</td>`;
            tableString += `<td class="text-right">${this.currencyPipe.transform(value.temmuzBudget, this.mainFilter.currency, 'symbol', '1.0-0', 'tr')}</td>`;
            tableString += `<td class="text-right">${this.currencyPipe.transform(value.temmuzReal, this.mainFilter.currency, 'symbol', '1.0-0', 'tr')}</td>`;
            tableString += `<td class="text-right">${this.currencyPipe.transform(value.agustosBudget, this.mainFilter.currency, 'symbol', '1.0-0', 'tr')}</td>`;
            tableString += `<td class="text-right">${this.currencyPipe.transform(value.agustosReal, this.mainFilter.currency, 'symbol', '1.0-0', 'tr')}</td>`;
            tableString += `<td class="text-right">${this.currencyPipe.transform(value.eylulBudget, this.mainFilter.currency, 'symbol', '1.0-0', 'tr')}</td>`;
            tableString += `<td class="text-right">${this.currencyPipe.transform(value.eylulReal, this.mainFilter.currency, 'symbol', '1.0-0', 'tr')}</td>`;
            tableString += `<td class="text-right">${this.currencyPipe.transform(value.ekimBudget, this.mainFilter.currency, 'symbol', '1.0-0', 'tr')}</td>`;
            tableString += `<td class="text-right">${this.currencyPipe.transform(value.ekimReal, this.mainFilter.currency, 'symbol', '1.0-0', 'tr')}</td>`;
            tableString += `<td class="text-right">${this.currencyPipe.transform(value.kasimBudget, this.mainFilter.currency, 'symbol', '1.0-0', 'tr')}</td>`;
            tableString += `<td class="text-right">${this.currencyPipe.transform(value.kasimReal, this.mainFilter.currency, 'symbol', '1.0-0', 'tr')}</td>`;
            tableString += `<td class="text-right">${this.currencyPipe.transform(value.aralikBudget, this.mainFilter.currency, 'symbol', '1.0-0', 'tr')}</td>`;
            tableString += `<td class="text-right">${this.currencyPipe.transform(value.aralikReal, this.mainFilter.currency, 'symbol', '1.0-0', 'tr')}</td>`;
            tableString += `<td class="text-right">${this.currencyPipe.transform(value.totalBudget, this.mainFilter.currency, 'symbol', '1.0-0', 'tr')}</td>`;
            tableString += `<td class="text-right">${this.currencyPipe.transform(value.totalReal, this.mainFilter.currency, 'symbol', '1.0-0', 'tr')}</td>`;
          }

          tableString += "</tr>";
          tableString += `<tr class=\"${bgColor}\">`;
        });


      });

    });
    let totalValues = [
      data.map(x => x.ocakBudget).reduce((a, b) => { return a + b; }),
      data.map(x => x.ocakReal).reduce((a, b) => { return a + b; }),
      data.map(x => x.subatBudget).reduce((a, b) => { return a + b; }),
      data.map(x => x.subatReal).reduce((a, b) => { return a + b; }),
      data.map(x => x.martBudget).reduce((a, b) => { return a + b; }),
      data.map(x => x.martReal).reduce((a, b) => { return a + b; }),
      data.map(x => x.nisanBudget).reduce((a, b) => { return a + b; }),
      data.map(x => x.nisanReal).reduce((a, b) => { return a + b; }),
      data.map(x => x.mayisBudget).reduce((a, b) => { return a + b; }),
      data.map(x => x.mayisReal).reduce((a, b) => { return a + b; }),
      data.map(x => x.haziranBudget).reduce((a, b) => { return a + b; }),
      data.map(x => x.haziranReal).reduce((a, b) => { return a + b; }),
      data.map(x => x.temmuzBudget).reduce((a, b) => { return a + b; }),
      data.map(x => x.temmuzReal).reduce((a, b) => { return a + b; }),
      data.map(x => x.agustosBudget).reduce((a, b) => { return a + b; }),
      data.map(x => x.agustosReal).reduce((a, b) => { return a + b; }),
      data.map(x => x.eylulBudget).reduce((a, b) => { return a + b; }),
      data.map(x => x.eylulReal).reduce((a, b) => { return a + b; }),
      data.map(x => x.ekimBudget).reduce((a, b) => { return a + b; }),
      data.map(x => x.ekimReal).reduce((a, b) => { return a + b; }),
      data.map(x => x.kasimBudget).reduce((a, b) => { return a + b; }),
      data.map(x => x.kasimReal).reduce((a, b) => { return a + b; }),
      data.map(x => x.aralikBudget).reduce((a, b) => { return a + b; }),
      data.map(x => x.aralikReal).reduce((a, b) => { return a + b; }),
      data.map(x => x.totalBudget).reduce((a, b) => { return a + b; }),
      data.map(x => x.totalReal).reduce((a, b) => { return a + b; })];


    tableString += "<tr style=\"background-color:gainsboro\">";
    tableString += "<td colspan=\"3\"><b>Toplam</b></td>";
    if (this.isQuantity) {

      totalValues.forEach(value => {
        tableString += `<td class="text-right">${this.numberPipe.transform(value, '1.0-0')}</td>`;
      });

    } else {
      totalValues.forEach(value => {
        tableString += `<td class="text-right">${this.currencyPipe.transform(value, this.mainFilter.currency, 'symbol', '1.0-0', 'tr')}</td>`;
      });
    }
    tableString += "</tr>";
    return this.sanitizer.bypassSecurityTrustHtml(tableString);
  }


  exportToExcel(): void {

    let fileName = `${this.mainFilter.year}-${this.mainFilter.currency}-${this.selectedTableName}.xlsx`;
    /* pass here the table id */
    let element = document.getElementById(this.selectedTableName);
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, fileName);

  }

  exportToPdf(tableName: string): void {
    let fileName = `${this.mainFilter.year}-${this.mainFilter.currency}-${tableName}.pdf`;
    /*const doc = new jsPDF('landscape');
    doc.addFont("Amiri-Regular.ttf", "Amiri", "normal");
    doc.setFont("Amiri");
    autoTable(doc, { html: `#${tableName}`})
    doc.save(fileName);*/

    let DATA: any = document.getElementById(tableName);
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 280;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('l', 'mm', 'a4');
      let position = 10;
      PDF.addImage(FILEURI, 'PNG', 10, position, fileWidth, fileHeight);
      PDF.save(fileName);
    });
  }

  printDiv(divId: string) {
    const css = `<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
    integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">`;
    const printContents = document.getElementById(divId)?.innerHTML;
    const pageContent = `<!DOCTYPE html><html><head>${css}<style>table { width: max-content !important;}</style></head><body onload="window.print()">${printContents}</html>`;
    let popupWindow: Window | null;
    if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
      popupWindow = window.open(
        '',
        '_blank',
        'width=1000,height=900,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no'
      );
      popupWindow?.window.focus();
      popupWindow?.document.write(pageContent);
      popupWindow?.document.close();

    } else {
      popupWindow = window.open('', '_blank', 'width=1000,height=900');
      popupWindow?.document.open();
      popupWindow?.document.write(pageContent);
      popupWindow?.document.close();
    }

  }

  selectedTab(tabName: any) {
    this.selectedTableName = tabName;
  }
}
