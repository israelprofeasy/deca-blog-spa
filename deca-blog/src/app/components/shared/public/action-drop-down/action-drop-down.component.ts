import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionDropdownData } from '../../../../_models/action-dropdown-data';

@Component({
  selector: 'action-drop-down',
  templateUrl: './action-drop-down.component.html',
  styleUrls: ['./action-drop-down.component.css']
})
export class ActionDropDownComponent implements OnInit {
  @Input() dropdownData: ActionDropdownData[]
  @Input() actionData: any;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
}
