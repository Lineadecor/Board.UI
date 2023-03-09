import { CommonModule } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';
import { SatisKanaliRoutingModule } from './satis-kanali-routing.module';
import { AvatarModule, ButtonGroupModule, ButtonModule, CardModule, DropdownModule, FormModule, GridModule, NavModule, ProgressModule, TableModule, TabsModule, TooltipModule } from '@coreui/angular';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '@coreui/icons-angular';
import { SirketButcesiComponent } from './sirket-butcesi/sirket-butcesi.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    SirketButcesiComponent
  ],
  imports: [
    SatisKanaliRoutingModule,
    CardModule,
    NavModule,
    IconModule,
    DropdownModule,
    TabsModule,
    CommonModule,
    GridModule,
    ProgressModule,
    ReactiveFormsModule,
    ButtonModule,
    FontAwesomeModule,
    FormModule,
    ButtonModule,
    TooltipModule,
    ButtonGroupModule,
    AvatarModule,
    TableModule,
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'tr' },
  ],
})
export class SatisKanaliModule { }
