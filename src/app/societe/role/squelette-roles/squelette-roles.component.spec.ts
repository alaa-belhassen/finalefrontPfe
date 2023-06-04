import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SqueletteRolesComponent } from './squelette-roles.component';

describe('SqueletteRolesComponent', () => {
  let component: SqueletteRolesComponent;
  let fixture: ComponentFixture<SqueletteRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SqueletteRolesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SqueletteRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
