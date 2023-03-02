import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { CompanyBudgetSummaryDto } from 'src/app/@core/data/dtos/company-budget-summary-dto.model';
import { DefaultFilter } from 'src/app/@core/data/models/main-filter';
import { MainFilterService } from 'src/app/@core/services/filter-values.service';
import { SalesService } from 'src/app/@core/services/sales.service';

@Component({
  selector: 'app-total-budgets-frontside',
  templateUrl: './total-budgets-frontside.component.html',
  styleUrls: ['./total-budgets-frontside.component.scss']
})
export class TotalBudgetsFrontsideComponent implements OnInit {

  public totalSales = 0;
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
      false);

    respose.subscribe(data => {
      if (data.isSuccess) {
        this.salesSummaryData = data.results;

        this.totalSales = this.salesSummaryData.reduce((sum, current) => sum + current.total_Realized, 0);
      } else {
        console.error("Data alınamadı");
      }

    });

  }


}
