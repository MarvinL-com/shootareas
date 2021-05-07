import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-form-steps',
  templateUrl: './form-steps.component.html',
  styleUrls: ['./form-steps.component.scss']
})
export class FormStepsComponent implements OnInit {
  @Input() steps: Array<object>
  @Input() step: number
  @Output() setStep = new EventEmitter<number>()

  constructor(commonModule: CommonModule) {
  }

  ngOnInit(): void {
  }

  handleClick = (step: number): void => this.setStep.emit(step)
}
