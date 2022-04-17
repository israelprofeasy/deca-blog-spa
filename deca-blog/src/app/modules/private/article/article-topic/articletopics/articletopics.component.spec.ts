import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticletopicsComponent } from './articletopics.component';

describe('ArticletopicsComponent', () => {
  let component: ArticletopicsComponent;
  let fixture: ComponentFixture<ArticletopicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticletopicsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticletopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
