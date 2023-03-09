import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js';
import { NgxSpinnerService } from 'ngx-spinner';
import { CompanyBudgetSummaryDto } from 'src/app/@core/data/dtos/company-budget-summary-dto.model';
import { DefaultFilter } from 'src/app/@core/data/models/main-filter';
import { MainFilterService } from 'src/app/@core/services/filter-values.service';
import { SalesService } from 'src/app/@core/services/sales.service';

@Component({
  selector: 'app-total-budgets-frontside',
  templateUrl: './total-budgets-frontside.component.html',
  styleUrls: ['./total-budgets-frontside.component.scss']
})
export class TotalBudgetsFrontsideComponent implements OnInit, OnChanges {
  @Input() data: Array<CompanyBudgetSummaryDto> = new Array<CompanyBudgetSummaryDto>();
  @Input() loading: any;

  public totalBudgets = 0;
  public totalRealized = 0;
  public salesSummaryData = new Array<CompanyBudgetSummaryDto>()

  mainFilter = new DefaultFilter();

  constructor(private mainFilterService: MainFilterService,
    private spinner: NgxSpinnerService,
    private cd: ChangeDetectorRef) {

    this.mainFilterService.mainFilter$.subscribe(data => {
      this.mainFilter = data;

    });

  }
  ngOnInit(): void {
    this.spinner.show("sp2");
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["data"].currentValue !== undefined) {
      this.salesSummaryData = changes["data"].currentValue;
      this.totalRealized = this.salesSummaryData.reduce((sum, current) => sum + current.total_Realized, 0);
      this.totalBudgets = this.salesSummaryData.reduce((sum, current) => sum + current.total_Budget, 0);
    }

  }

}
