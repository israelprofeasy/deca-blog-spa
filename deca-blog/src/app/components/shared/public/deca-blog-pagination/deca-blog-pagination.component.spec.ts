import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecaBlogPaginationComponent } from './deca-blog-pagination.component';

describe('BottombarComponent', () => {
  let component: DecaBlogPaginationComponent;
  let fixture: ComponentFixture<DecaBlogPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DecaBlogPaginationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DecaBlogPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
