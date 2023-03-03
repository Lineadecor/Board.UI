import { Component, OnInit } from '@angular/core';
import { FlipAnimation } from 'src/app/@core/animations';
import { CompanyBudgetSummaryDto } from 'src/app/@core/data/dtos/company-budget-summary-dto.model';
import { DefaultFilter } from 'src/app/@core/data/models/main-filter';
import { MainFilterService } from 'src/app/@core/services/filter-values.service';
import { SalesService } from 'src/app/@core/services/sales.service';

@Component({
  selector: 'app-top-summary-widget',
  templateUrl: './top-summary-widget.component.html',
  styleUrls: ['./top-summary-widget.component.scss'],
  animations: FlipAnimation.animations
})
export class TopSummaryWidgetComponent implements OnInit{
  flipDiv = false;
  flipDiv2 = false;
  mainFilter = new DefaultFilter();

  public salesAmountSummaryData: Array<CompanyBudgetSummaryDto>;
  public salesQuantitySummaryData:Array<CompanyBudgetSummaryDto>;

  constructor(private mainFilterService: MainFilterService,
    private salesService: SalesService) {

    this.mainFilterService.mainFilter$.subscribe(data => {
      this.mainFilter = data;
    });

    this.salesAmountSummaryData = new Array<CompanyBudgetSummaryDto>();
    this.salesQuantitySummaryData = new Array<CompanyBudgetSummaryDto>();
  }
  ngOnInit(): void {
    this.getSalesSummaryData(false).subscribe(
      data => {
        if (data.isSuccess) {
          this.salesAmountSummaryData=data.results;
        } else {
          console.error("Data alınamadı");
        }
      });

    this.getSalesSummaryData(true).subscribe(
      data => {
        if (data.isSuccess) {
          this.salesQuantitySummaryData = data.results;
        } else {
          console.error("Data alınamadı");
        }
      });

  }


  onClickflipDiv() {
    this.flipDiv = !this.flipDiv;
  }

  onClickflipDiv2() {
    this.flipDiv2 = !this.flipDiv2;
  }

  getSalesSummaryData(isQuaintity: boolean) {
    return this.salesService.GetDashboardSummaryDataAsync(
      this.mainFilter.year,
      this.mainFilter.listMonths.join(","),
      this.mainFilter.currency,
      isQuaintity);

  }
}