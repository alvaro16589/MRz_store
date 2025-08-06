import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutUserOrderComponent } from './layout-user-order.component';

describe('LayoutUserOrderComponent', () => {
  let component: LayoutUserOrderComponent;
  let fixture: ComponentFixture<LayoutUserOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutUserOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutUserOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
