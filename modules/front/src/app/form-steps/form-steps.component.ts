import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-form-steps',
  templateUrl: './form-steps.component.html',
  styleUrls: ['./form-steps.component.scss']
})
export class FormStepsComponent implements OnInit {
  @Input() steps: Array<object>
  @Input() step: number

  constructor(commonModule: CommonModule) {
  }

  ngOnInit(): void {
  }
}
