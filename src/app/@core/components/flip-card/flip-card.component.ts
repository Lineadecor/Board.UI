import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    Input,
    OnChanges,
    OnInit,
    Renderer2,
    SimpleChanges,
    ViewChild
  } from '@angular/core';
  
  @Component({
    selector: 'app-flip-card',
    templateUrl: './flip-card.component.html',
    styleUrls: ['./flip-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class FlipCardComponent implements OnInit, OnChanges {
  
    @Input() flip: boolean;
    @ViewChild('flipContainer', { static: true }) private flipContainer?: any;
  
    constructor(private renderer: Renderer2) {
        this.flip=false;
    }
  
    ngOnInit(): void {
      this.rotate();
    }
  
    ngOnChanges(change: SimpleChanges) {
      if (this.flipContainer !== undefined) {
        this.rotate();
      }
    }
  
    rotate() {
      if (this.flip) {
        this.renderer.addClass(this.flipContainer.nativeElement, 'rotate');
      } else {
        this.renderer.removeClass(this.flipContainer.nativeElement, 'rotate');
      }
  
    }
  
  }