import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoisirCreationTypeComponent } from './choisir-creation-type.component';

describe('ChoisirCreationTypeComponent', () => {
  let component: ChoisirCreationTypeComponent;
  let fixture: ComponentFixture<ChoisirCreationTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChoisirCreationTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoisirCreationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
