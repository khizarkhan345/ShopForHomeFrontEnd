import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySalesComponent } from './display-sales.component';

describe('DisplaySalesComponent', () => {
  let component: DisplaySalesComponent;
  let fixture: ComponentFixture<DisplaySalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplaySalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplaySalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
