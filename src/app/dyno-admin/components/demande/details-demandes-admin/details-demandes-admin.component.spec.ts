import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDemandesAdminComponent } from './details-demandes-admin.component';

describe('DetailsDemandesAdminComponent', () => {
  let component: DetailsDemandesAdminComponent;
  let fixture: ComponentFixture<DetailsDemandesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsDemandesAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsDemandesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
