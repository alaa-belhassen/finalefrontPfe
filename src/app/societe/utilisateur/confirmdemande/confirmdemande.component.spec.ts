import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmdemandeComponent } from './confirmdemande.component';

describe('ConfirmdemandeComponent', () => {
  let component: ConfirmdemandeComponent;
  let fixture: ComponentFixture<ConfirmdemandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmdemandeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmdemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
