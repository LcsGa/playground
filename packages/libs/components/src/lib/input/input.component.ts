/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
  signal,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { Focusable } from '../shared/directives/autofocus.directive';

@Component({
  selector: 'cmp-input',
  standalone: true,
  imports: [FormsModule],
  template: `
    <input
      #input
      class="w-full h-11 rounded-md px-3 py-2 border-2 border-solid border-gray-300"
      type="text"
      placeholder="{{ placeholder }}"
      [ngModel]="value()"
      (ngModelChange)="writeValue($event)"
    />
  `,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: InputComponent, multi: true },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements ControlValueAccessor, Focusable {
  @Input() placeholder = '';

  @ViewChild('input')
  private readonly input?: ElementRef<HTMLInputElement>;

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

  focus(): void {
    this.input?.nativeElement.focus();
  }
}
