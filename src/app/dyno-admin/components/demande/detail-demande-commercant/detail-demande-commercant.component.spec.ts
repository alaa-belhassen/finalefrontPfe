import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDemandeCommercantComponent } from './detail-demande-commercant.component';

describe('DetailDemandeCommercantComponent', () => {
  let component: DetailDemandeCommercantComponent;
  let fixture: ComponentFixture<DetailDemandeCommercantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailDemandeCommercantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailDemandeCommercantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
