import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ButtonModule,
  CardModule,
  DropdownModule,
  GridModule,
  ProgressModule,
  SharedModule,
  WidgetModule
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';

import { WidgetsRoutingModule } from './widgets-routing.module';
import { WidgetsComponent } from './widgets/widgets.component';
import { TopSummaryWidgetComponent } from './top-summary-widget/top-summary-widget.component';
import { TotalSalesFrontsideComponent } from './top-summary-widget/total-sales/frontside/total-sales-frontside.component';
import { TotalSalesBacksideComponent } from './top-summary-widget/total-sales/backside/total-sales-backside.component';
import { FlipCardModule } from "src/app/@core/components/components"
import { TotalBudgetsBacksideComponent } from './top-summary-widget/total-budgets/backside/total-budgets-backside.component';
import { TotalBudgetsFrontsideComponent } from './top-summary-widget/total-budgets/frontside/total-budgets-frontside.component';


@NgModule({
  declarations: [

    WidgetsComponent,
    TopSummaryWidgetComponent,
    TotalSalesFrontsideComponent,
    TotalSalesBacksideComponent,
    TotalBudgetsBacksideComponent,
    TotalBudgetsFrontsideComponent,
  ],
  imports: [
    CommonModule,
    WidgetsRoutingModule,
    GridModule,
    WidgetModule,
    IconModule,
    DropdownModule,
    SharedModule,
    ButtonModule,
    CardModule,
    ProgressModule,
    FlipCardModule,
  ],
  exports: [
    TopSummaryWidgetComponent
  ]
})
export class WidgetsModule {
}
