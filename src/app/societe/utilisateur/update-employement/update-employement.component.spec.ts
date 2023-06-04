import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEmployementComponent } from './update-employement.component';

describe('UpdateEmployementComponent', () => {
  let component: UpdateEmployementComponent;
  let fixture: ComponentFixture<UpdateEmployementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateEmployementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateEmployementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
