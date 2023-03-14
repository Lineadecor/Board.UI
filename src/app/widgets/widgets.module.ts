import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ButtonModule,
  CardModule,
  DropdownModule,
  GridModule,
  ProgressModule,
  SharedModule,
  TableModule,
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
import { TotalMonthlySalesComponent } from './top-summary-widget/total-monthly-sales/total-monthly-sales.component';
// Import library module
import { NgxSpinnerModule } from "ngx-spinner";
import { Top5SalesAgentsComponent } from './top-summary-widget/top5-sales-agents/top5-sales-agents.component';
import { DomesticSalesMapComponent } from './map-view-widgets/domestic-sales-map/domestic-sales-map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@NgModule({
  declarations: [

    WidgetsComponent,
    TopSummaryWidgetComponent,
    TotalSalesFrontsideComponent,
    TotalSalesBacksideComponent,
    TotalBudgetsBacksideComponent,
    TotalBudgetsFrontsideComponent,
    TotalMonthlySalesComponent,
    Top5SalesAgentsComponent,
    DomesticSalesMapComponent,
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
    TableModule,
    FlipCardModule,
    NgxSpinnerModule,
    LeafletModule,   
  ],
  exports: [
    TopSummaryWidgetComponent,
    DomesticSalesMapComponent
  ]
})
export class WidgetsModule {
}
