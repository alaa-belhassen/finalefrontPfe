import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockuserComponent } from './blockuser.component';

describe('BlockuserComponent', () => {
  let component: BlockuserComponent;
  let fixture: ComponentFixture<BlockuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockuserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlockuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
