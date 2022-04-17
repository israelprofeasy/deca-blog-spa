import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteeInfoComponent } from './invitee-info.component';

describe('InviteeInfoComponent', () => {
  let component: InviteeInfoComponent;
  let fixture: ComponentFixture<InviteeInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InviteeInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
