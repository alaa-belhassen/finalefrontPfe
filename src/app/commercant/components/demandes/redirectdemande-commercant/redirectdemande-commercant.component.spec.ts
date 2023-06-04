import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectdemandeCommercantComponent } from './redirectdemande-commercant.component';

describe('RedirectdemandeCommercantComponent', () => {
  let component: RedirectdemandeCommercantComponent;
  let fixture: ComponentFixture<RedirectdemandeCommercantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedirectdemandeCommercantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedirectdemandeCommercantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
