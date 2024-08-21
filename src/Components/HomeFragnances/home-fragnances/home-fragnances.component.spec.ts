import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFragnancesComponent } from './home-fragnances.component';

describe('HomeFragnancesComponent', () => {
  let component: HomeFragnancesComponent;
  let fixture: ComponentFixture<HomeFragnancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeFragnancesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeFragnancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
