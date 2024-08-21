import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitchenAndTableTopComponent } from './kitchen-and-table-top.component';

describe('KitchenAndTableTopComponent', () => {
  let component: KitchenAndTableTopComponent;
  let fixture: ComponentFixture<KitchenAndTableTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KitchenAndTableTopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitchenAndTableTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
