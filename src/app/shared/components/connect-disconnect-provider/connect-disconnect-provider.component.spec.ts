import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectDisconnectProviderComponent } from './connect-disconnect-provider.component';

describe('ConnectDisconnectProviderComponent', () => {
  let component: ConnectDisconnectProviderComponent;
  let fixture: ComponentFixture<ConnectDisconnectProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectDisconnectProviderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectDisconnectProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
