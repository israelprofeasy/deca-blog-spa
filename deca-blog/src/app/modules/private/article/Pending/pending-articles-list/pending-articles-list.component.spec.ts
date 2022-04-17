/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PendingArticlesListComponent } from './pending-articles-list.component';

describe('PendingArticlesListComponent', () => {
  let component: PendingArticlesListComponent;
  let fixture: ComponentFixture<PendingArticlesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingArticlesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingArticlesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
