/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  signal,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'cmp-input',
  standalone: true,
  imports: [FormsModule],
  template: `
    <input
      class="rounded-md px-3 py-2 border-2 border-solid border-gray-300"
      type="text"
      placeholder="{{ placeholder }}"
      [ngModel]="value()"
      (ngModelChange)="writeValue($event)"
    />
  `,
  styles: [
    // 'input { @apply rounded-lg px-3 py-2 border-2 border-solid border-gray-300 }',
  ],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: InputComponent, multi: true },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements ControlValueAccessor {
  @Input() placeholder = '';

  protected readonly value = signal('');

  writeValue(value: string): void {
    this.value.set(value);
    this.#onChange(value);
  }

  #onChange = (value: string) => {};

  registerOnChange(fn: (value: string) => void): void {
    this.#onChange = fn;
  }

  #onTouched = () => {};

  registerOnTouched(fn: () => void): void {
    this.#onTouched = fn;
  }
}
