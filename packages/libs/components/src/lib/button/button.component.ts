import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'cmp-button',
  standalone: true,
  imports: [FontAwesomeModule, NgIf],
  template: `
    <button
      class="flex-1 flex items-center rounded-md px-4 py-2 bg-blue-500 text-slate-50"
    >
      <fa-icon *ngIf="icon" [icon]="icon" />
    </button>
  `,
  styles: [
    ':host { @apply inline-flex }',
    // 'button { @apply flex-1 flex items-center rounded-md px-4 py-2 bg-blue-500 text-slate-50 }',
  ],
})
export class ButtonComponent {
  @Input() icon?: IconProp;
}
