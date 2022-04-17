import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterInviteeComponent } from './register-invitee.component';

describe('RegisterInviteeComponent', () => {
  let component: RegisterInviteeComponent;
  let fixture: ComponentFixture<RegisterInviteeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterInviteeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterInviteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
