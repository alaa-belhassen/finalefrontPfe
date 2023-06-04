import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectCategorieComponent } from './redirect-categorie.component';

describe('RedirectCategorieComponent', () => {
  let component: RedirectCategorieComponent;
  let fixture: ComponentFixture<RedirectCategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedirectCategorieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedirectCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
