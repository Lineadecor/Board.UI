import { Component, Input } from '@angular/core';
import { CompanyBudgetSummaryDto } from 'src/app/@core/data/dtos/company-budget-summary-dto.model';
import { DefaultFilter } from 'src/app/@core/data/models/main-filter';
import { MainFilterService } from 'src/app/@core/services/filter-values.service';
import { SalesService } from 'src/app/@core/services/sales.service';

@Component({
  selector: 'app-total-budgets-backside',
  templateUrl: './total-budgets-backside.component.html',
  styleUrls: ['./total-budgets-backside.component.scss']
})
export class TotalBudgetsBacksideComponent {
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

    getSalesSummaryData() {
      var respose = this.salesService.GetDashboardSummaryDataAsync(
        this.mainFilter.year,
        this.mainFilter.currency,
        true);
  
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
