import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalSalesFrontsideComponent } from './total-sales-frontside.component';

describe('FrontsideComponent', () => {
  let component: TotalSalesFrontsideComponent;
  let fixture: ComponentFixture<TotalSalesFrontsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalSalesFrontsideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalSalesFrontsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
