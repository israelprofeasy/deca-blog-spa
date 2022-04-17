import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionDropDownComponent } from './action-drop-down.component';

describe('DropDownMenuComponent', () => {
  let component: ActionDropDownComponent;
  let fixture: ComponentFixture<ActionDropDownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionDropDownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionDropDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
