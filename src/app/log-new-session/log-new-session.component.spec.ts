import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogNewSessionComponent } from './log-new-session.component';

describe('LogNewSessionComponent', () => {
  let component: LogNewSessionComponent;
  let fixture: ComponentFixture<LogNewSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogNewSessionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogNewSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
