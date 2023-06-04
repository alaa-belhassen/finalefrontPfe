import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreeCategorieComponent } from './cree-categorie.component';

describe('CreeCategorieComponent', () => {
  let component: CreeCategorieComponent;
  let fixture: ComponentFixture<CreeCategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreeCategorieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreeCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
