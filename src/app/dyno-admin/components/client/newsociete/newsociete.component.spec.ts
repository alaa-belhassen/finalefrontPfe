import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsocieteComponent } from './newsociete.component';

describe('NewsocieteComponent', () => {
  let component: NewsocieteComponent;
  let fixture: ComponentFixture<NewsocieteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsocieteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsocieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
