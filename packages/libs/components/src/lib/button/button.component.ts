import { NgIf } from '@angular/common';
import { Component, Input, booleanAttribute } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export type ButtonKind = 'basic' | 'flat';

export type ButtonSeverity =
  | 'primary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger';

@Component({
  selector: 'cmp-button',
  standalone: true,
  imports: [FontAwesomeModule, NgIf],
  template: `
    <button
      class="flex-1 flex justify-center items-center h-11 rounded-md"
      [class.kind--basic]="kind === 'basic'"
      [class.kind--flat]="kind === 'flat'"
      [class.kind--icon-only]="iconOnly"
      [class.rounded-full]="rounded"
      [class.severity--primary]="severity === 'primary'"
      [class.severity--success]="severity === 'success'"
      [class.severity--info]="severity === 'info'"
      [class.severity--warning]="severity === 'warning'"
      [class.severity--danger]="severity === 'danger'"
    >
      <fa-icon *ngIf="icon" [icon]="icon" />
    </button>
  `,
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() icon?: IconProp;
  @Input({ transform: booleanAttribute }) iconOnly = false;
  @Input() kind: ButtonKind = 'flat';
  @Input({ transform: booleanAttribute }) rounded = false;
  @Input() severity: ButtonSeverity = 'primary';
}
