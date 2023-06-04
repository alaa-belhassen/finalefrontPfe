import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreeUtilisateurComponent } from './cree-utilisateur.component';

describe('CreeUtilisateurComponent', () => {
  let component: CreeUtilisateurComponent;
  let fixture: ComponentFixture<CreeUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreeUtilisateurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreeUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
