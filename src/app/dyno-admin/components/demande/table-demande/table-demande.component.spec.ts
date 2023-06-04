import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDemandeComponent } from './table-demande.component';

describe('TableDemandeComponent', () => {
  let component: TableDemandeComponent;
  let fixture: ComponentFixture<TableDemandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableDemandeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
