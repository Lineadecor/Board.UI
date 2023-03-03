import { ChangeDetectorRef, Component, Input, SimpleChanges } from '@angular/core';
import { CompanyBudgetSummaryDto } from 'src/app/@core/data/dtos/company-budget-summary-dto.model';
import { DefaultFilter } from 'src/app/@core/data/models/main-filter';
import { MainFilterService } from 'src/app/@core/services/filter-values.service';
@Component({
  selector: 'app-total-budgets-backside',
  templateUrl: './total-budgets-backside.component.html',
  styleUrls: ['./total-budgets-backside.component.scss']
})
export class TotalBudgetsBacksideComponent {
  @Input() data: Array<CompanyBudgetSummaryDto> = new Array<CompanyBudgetSummaryDto>();


  public totalBudgets = 0;
  public totalRealized = 0;
  public salesSummaryData = new Array<CompanyBudgetSummaryDto>()

  mainFilter = new DefaultFilter();

  constructor(private mainFilterService: MainFilterService,
    private cd: ChangeDetectorRef) {

    this.mainFilterService.mainFilter$.subscribe(data => {
      this.mainFilter = data;

    });

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["data"].currentValue !== undefined) {
      this.salesSummaryData = changes["data"].currentValue;
      this.totalRealized = this.salesSummaryData.reduce((sum, current) => sum + current.total_Realized, 0);
      this.totalBudgets = this.salesSummaryData.reduce((sum, current) => sum + current.total_Budget, 0);
    }

  }
}
