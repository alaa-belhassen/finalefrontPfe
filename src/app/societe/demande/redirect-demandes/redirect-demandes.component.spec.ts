import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectDemandesComponent } from './redirect-demandes.component';

describe('RedirectDemandesComponent', () => {
  let component: RedirectDemandesComponent;
  let fixture: ComponentFixture<RedirectDemandesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedirectDemandesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedirectDemandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
