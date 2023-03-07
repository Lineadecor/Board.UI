import { CommonModule } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';
import { SatisKanaliRoutingModule } from './satis-kanali-routing.module';
import { AvatarModule, ButtonGroupModule, ButtonModule, CardModule, FormModule, GridModule, NavModule, ProgressModule, TableModule, TabsModule } from '@coreui/angular';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '@coreui/icons-angular';
import { SirketButcesiComponent } from './sirket-butcesi/sirket-butcesi.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    SirketButcesiComponent
  ],
  imports: [
    SatisKanaliRoutingModule,
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
    HttpClientModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'tr' },
  ],
})
export class SatisKanaliModule { }
