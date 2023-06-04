import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDemandeAccepterComponent } from './details-demande-accepter.component';

describe('DetailsDemandeAccepterComponent', () => {
  let component: DetailsDemandeAccepterComponent;
  let fixture: ComponentFixture<DetailsDemandeAccepterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsDemandeAccepterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsDemandeAccepterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
