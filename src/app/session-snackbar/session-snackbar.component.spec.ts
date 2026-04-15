import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionSnackbarComponent } from './session-snackbar.component';

describe('SessionSnackbarComponent', () => {
  let component: SessionSnackbarComponent;
  let fixture: ComponentFixture<SessionSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionSnackbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
