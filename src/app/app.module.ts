import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  TabsModule,
  TooltipModule,
  UtilitiesModule,
  WidgetModule,
  
} from '@coreui/angular';

import { IconModule, IconSetService } from '@coreui/icons-angular';

// Import containers
import {
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
} from './containers';


import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import localeTr from '@angular/common/locales/tr';

import { CookieService } from 'ngx-cookie-service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

//Custom Modules
import { YonetimModule } from './pages/yonetim/yonetim.module';
import { SatisKanaliModule } from './pages/satis-kanali/satis-kanali.module';
import { MainFilterService } from './@core/services/filter-values.service';
import { MultiSelectDropdownComponent } from './@core/components/multi-select-dropdown/multi-select-dropdown.component';
import { GlobalVariables } from 'src/global';
import { CustomTooltipHandler } from './@core/helpers/custom-tooltip-handler';
import { NgxSpinnerModule } from 'ngx-spinner';

registerLocaleData(localeTr);

const APP_CONTAINERS = [
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
];


@NgModule({
  declarations: [
    AppComponent,
    MultiSelectDropdownComponent,
    ...APP_CONTAINERS
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    AvatarModule,
    BreadcrumbModule,
    FooterModule,
    DropdownModule,
    GridModule,
    HeaderModule,
    SidebarModule,
    IconModule,
    NavModule,
    ButtonModule,
    FormModule,
    TooltipModule,
    UtilitiesModule,
    ButtonGroupModule,
    ReactiveFormsModule,
    SidebarModule,
    SharedModule,
    TabsModule,
    ListGroupModule,
    ProgressModule,
    BadgeModule,
    ListGroupModule,
    WidgetModule,
    CardModule,
    NgxSpinnerModule,
    FontAwesomeModule,
    YonetimModule,
    SatisKanaliModule,
  ],
  providers: [
    IconSetService, 
    CookieService,
    MainFilterService,
    { provide: LOCALE_ID, useValue: 'tr' },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: GlobalVariables},
    { provide: CustomTooltipHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }