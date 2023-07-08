import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
  booleanAttribute,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Focusable } from '../shared/directives/autofocus.directive';

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
      #button
      class="flex-1 flex justify-center items-center h-11 rounded-md"
      [class.kind--basic]="kind === 'basic'"
      [class.kind--flat]="kind === 'flat'"
      [class.kind--icon-only]="iconOnly"
      [class.severity--primary]="severity === 'primary'"
      [class.severity--success]="severity === 'success'"
      [class.severity--info]="severity === 'info'"
      [class.severity--warning]="severity === 'warning'"
      [class.severity--danger]="severity === 'danger'"
      [class.shape--rounded]="rounded"
    >
      <fa-icon *ngIf="icon" [icon]="icon" />
    </button>
  `,
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements Focusable {
  @Input() icon?: IconProp;
  @Input({ transform: booleanAttribute }) iconOnly = false;
  @Input() kind: ButtonKind = 'flat';
  @Input({ transform: booleanAttribute }) rounded = false;
  @Input() severity: ButtonSeverity = 'primary';

  @ViewChild('button')
  private readonly button?: ElementRef<HTMLButtonElement>;

  focus(): void {
    this.button?.nativeElement.focus();
  }
}
