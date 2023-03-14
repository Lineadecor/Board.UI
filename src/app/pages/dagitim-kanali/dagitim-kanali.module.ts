import { LOCALE_ID, NgModule } from '@angular/core';
import { AvatarModule, ButtonGroupModule, ButtonModule, CardModule, FormModule, GridModule, NavModule, ProgressModule, TableModule, TabsModule } from '@coreui/angular';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '@coreui/icons-angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DagitimKanaliDetayComponent } from './dagitim-kanali-detay/dagitim-kanali-detay.component';
import { DagitimKanaliRoutingModule } from './dagitim-kanali-routing.module';



@NgModule({
  declarations: [DagitimKanaliDetayComponent],
  imports: [
    DagitimKanaliRoutingModule,
    CardModule,
    NavModule,
    IconModule,
    TabsModule,
    CommonModule,
    GridModule,
    ProgressModule,
    ReactiveFormsModule,
    ButtonModule,
    FontAwesomeModule,
    FormModule,
    ButtonModule,
    ButtonGroupModule,
    AvatarModule,
    TableModule,
    HttpClientModule,
    NgxSpinnerModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'tr' },
  ],
})
export class DagitimKanaliModule { }
