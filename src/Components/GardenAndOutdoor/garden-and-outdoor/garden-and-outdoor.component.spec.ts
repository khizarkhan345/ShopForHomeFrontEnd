import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GardenAndOutdoorComponent } from './garden-and-outdoor.component';

describe('GardenAndOutdoorComponent', () => {
  let component: GardenAndOutdoorComponent;
  let fixture: ComponentFixture<GardenAndOutdoorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GardenAndOutdoorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GardenAndOutdoorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
