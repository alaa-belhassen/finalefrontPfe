import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynoAdminComponent } from './dyno-admin.component';

describe('DynoAdminComponent', () => {
  let component: DynoAdminComponent;
  let fixture: ComponentFixture<DynoAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynoAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
