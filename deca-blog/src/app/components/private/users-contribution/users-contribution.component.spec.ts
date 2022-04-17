import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersContributionComponent } from './users-contribution.component';

describe('UsersContributionComponent', () => {
  let component: UsersContributionComponent;
  let fixture: ComponentFixture<UsersContributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersContributionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersContributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
