import { Component} from '@angular/core';
import { FlipAnimation } from 'src/app/@core/animations';

@Component({
  selector: 'app-top-summary-widget',
  templateUrl: './top-summary-widget.component.html',
  styleUrls: ['./top-summary-widget.component.scss'],
  animations: FlipAnimation.animations
})
export class TopSummaryWidgetComponent {
  flipDiv = false;
  flipDiv2 = false;

  onClickflipDiv() {
    this.flipDiv = !this.flipDiv;
  }

  onClickflipDiv2() {
    this.flipDiv2 = !this.flipDiv2;
  }
}