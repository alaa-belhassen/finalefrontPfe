import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewUtilisateurComponent } from './create-new-utilisateur.component';

describe('CreateNewUtilisateurComponent', () => {
  let component: CreateNewUtilisateurComponent;
  let fixture: ComponentFixture<CreateNewUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewUtilisateurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
