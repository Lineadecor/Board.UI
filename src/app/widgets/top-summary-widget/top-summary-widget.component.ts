import { Component, Input } from '@angular/core';
import { FlipAnimation } from 'src/app/@core/animations';
import Chart from 'chart.js/auto';
import { getRelativePosition } from 'chart.js/helpers';
import { DefaultFilter } from 'src/app/@core/data/models/main-filter';

@Component({
  selector: 'app-top-summary-widget',
  templateUrl: './top-summary-widget.component.html',
  styleUrls: ['./top-summary-widget.component.scss'],
  animations: FlipAnimation.animations
})
export class TopSummaryWidgetComponent {
  @Input() mainFilter: DefaultFilter | null= null;
  flipDiv = false;
  onClick() {
    this.flipDiv = !this.flipDiv;
  }
}