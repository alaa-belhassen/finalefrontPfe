import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreatingComponent } from './greating.component';

describe('GreatingComponent', () => {
  let component: GreatingComponent;
  let fixture: ComponentFixture<GreatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GreatingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GreatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
