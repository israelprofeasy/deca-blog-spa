import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateContributionsComponent } from './create-contributions.component';

describe('CreateContributionsComponent', () => {
  let component: CreateContributionsComponent;
  let fixture: ComponentFixture<CreateContributionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateContributionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateContributionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
