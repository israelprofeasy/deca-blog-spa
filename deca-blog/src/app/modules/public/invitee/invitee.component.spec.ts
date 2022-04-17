import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteeComponent } from './invitee.component';

describe('InviteeComponent', () => {
  let component: InviteeComponent;
  let fixture: ComponentFixture<InviteeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InviteeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
