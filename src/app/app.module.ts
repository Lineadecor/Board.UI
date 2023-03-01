import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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


import { registerLocaleData } from '@angular/common';
import localeTr from '@angular/common/locales/tr';

import { CookieService } from 'ngx-cookie-service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { YonetimModule } from './pages/yonetim/yonetim.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { MainFilterService } from './@core/services/filter-values.service';



registerLocaleData(localeTr);

const APP_CONTAINERS = [
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
];


@NgModule({
  declarations: [
    AppComponent,
    ...APP_CONTAINERS
  ],
  imports: [
    BrowserModule,
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
    YonetimModule,
    FontAwesomeModule
  ],
  providers: [
    IconSetService, 
    CookieService,
    MainFilterService,
    { provide: LOCALE_ID, useValue: 'tr' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }