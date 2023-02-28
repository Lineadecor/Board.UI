import { LOCALE_ID, NgModule } from '@angular/core';
import { YonetimRoutingModule } from './yonetim-routing.module';
import { YonetimDashboardComponent } from './yonetim-dashboard/yonetim-dashboard.component';
import { AvatarModule, ButtonGroupModule, ButtonModule, CardModule, FormModule, GridModule, NavModule, ProgressModule, TableModule, TabsModule } from '@coreui/angular';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '@coreui/icons-angular';
import { WidgetsModule } from 'src/app/widgets/widgets.module';



@NgModule({
  declarations: [YonetimDashboardComponent],
  imports: [
    YonetimRoutingModule,
    CardModule,
    NavModule,
    IconModule,
    TabsModule,
    CommonModule,
    GridModule,
    ProgressModule,
    ReactiveFormsModule,
    ButtonModule,
    FormModule,
    ButtonModule,
    ButtonGroupModule,
    AvatarModule,
    TableModule,
    WidgetsModule,
    HttpClientModule
  ],
  providers: [ 
    { provide: LOCALE_ID, useValue: 'tr' },
  ],
})
export class YonetimModule { }
