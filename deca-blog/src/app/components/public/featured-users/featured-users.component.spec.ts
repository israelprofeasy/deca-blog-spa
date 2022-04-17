import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedUsersComponent } from './featured-users.component';

describe('FeaturedUsersComponent', () => {
  let component: FeaturedUsersComponent;
  let fixture: ComponentFixture<FeaturedUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturedUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
