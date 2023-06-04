import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationErrorComponent } from './creation-error.component';

describe('CreationErrorComponent', () => {
  let component: CreationErrorComponent;
  let fixture: ComponentFixture<CreationErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreationErrorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreationErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
