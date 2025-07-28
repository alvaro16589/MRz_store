import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutConfComponent } from './layout-conf.component';

describe('LayoutConfComponent', () => {
  let component: LayoutConfComponent;
  let fixture: ComponentFixture<LayoutConfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutConfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutConfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
