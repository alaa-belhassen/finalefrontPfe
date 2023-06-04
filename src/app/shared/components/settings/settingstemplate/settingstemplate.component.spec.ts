import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingstemplateComponent } from './settingstemplate.component';

describe('SettingstemplateComponent', () => {
  let component: SettingstemplateComponent;
  let fixture: ComponentFixture<SettingstemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingstemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingstemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
