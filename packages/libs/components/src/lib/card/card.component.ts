import { Component } from '@angular/core';

@Component({
  selector: 'cmp-card',
  standalone: true,
  template: '<ng-content />',
  styles: [':host { @apply flex flex-col gap-y-3 p-4 rounded-xl bg-gray-200 }'],
})
export class CardComponent {}
