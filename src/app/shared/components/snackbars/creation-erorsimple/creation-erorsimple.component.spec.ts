import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationErorsimpleComponent } from './creation-erorsimple.component';

describe('CreationErorsimpleComponent', () => {
  let component: CreationErorsimpleComponent;
  let fixture: ComponentFixture<CreationErorsimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreationErorsimpleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreationErorsimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
