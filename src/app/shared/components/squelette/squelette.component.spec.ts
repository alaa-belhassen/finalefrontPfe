import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SqueletteComponent } from './squelette.component';

describe('SqueletteComponent', () => {
  let component: SqueletteComponent;
  let fixture: ComponentFixture<SqueletteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SqueletteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SqueletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
