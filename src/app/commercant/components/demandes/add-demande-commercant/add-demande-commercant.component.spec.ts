import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDemandeCommercantComponent } from './add-demande-commercant.component';

describe('AddDemandeCommercantComponent', () => {
  let component: AddDemandeCommercantComponent;
  let fixture: ComponentFixture<AddDemandeCommercantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDemandeCommercantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDemandeCommercantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
