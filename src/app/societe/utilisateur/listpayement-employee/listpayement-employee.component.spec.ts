import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListpayementEmployeeComponent } from './listpayement-employee.component';

describe('ListpayementEmployeeComponent', () => {
  let component: ListpayementEmployeeComponent;
  let fixture: ComponentFixture<ListpayementEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListpayementEmployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListpayementEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
