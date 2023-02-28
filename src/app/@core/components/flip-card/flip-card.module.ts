import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlipCardComponent } from './flip-card.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    FlipCardComponent
  ],
  declarations: [FlipCardComponent]
})
export class FlipCardModule {
}