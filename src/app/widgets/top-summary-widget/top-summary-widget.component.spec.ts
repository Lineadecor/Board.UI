import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSummaryWidgetComponent } from './top-summary-widget.component';

describe('TopSummaryWidgetComponent', () => {
  let component: TopSummaryWidgetComponent;
  let fixture: ComponentFixture<TopSummaryWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopSummaryWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopSummaryWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
