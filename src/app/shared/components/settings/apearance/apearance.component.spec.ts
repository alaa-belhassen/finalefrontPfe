import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApearanceComponent } from './apearance.component';

describe('ApearanceComponent', () => {
  let component: ApearanceComponent;
  let fixture: ComponentFixture<ApearanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApearanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApearanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
