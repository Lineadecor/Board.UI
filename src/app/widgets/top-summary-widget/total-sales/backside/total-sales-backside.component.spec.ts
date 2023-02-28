import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalSalesBacksideComponent } from './total-sales-backside.component';

describe('BacksideComponent', () => {
  let component: TotalSalesBacksideComponent;
  let fixture: ComponentFixture<TotalSalesBacksideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalSalesBacksideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalSalesBacksideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
