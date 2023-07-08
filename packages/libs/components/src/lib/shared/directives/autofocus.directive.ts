import { AfterViewInit, Directive, Input } from '@angular/core';

export interface Focusable {
  focus: () => void;
}

@Directive({
  selector: '[cmpAutofocus]',
  standalone: true,
})
export class AutofocusDirective implements AfterViewInit {
  @Input({ required: true }) cmpAutofocus!: Focusable;

  ngAfterViewInit(): void {
    this.cmpAutofocus.focus();
  }
}
