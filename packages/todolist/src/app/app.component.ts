import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent, CardComponent, InputComponent } from '@components';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [ButtonComponent, CardComponent, FormsModule, InputComponent],
  template: `
    <cmp-card>
      <div class="flex gap-x-3">
        <cmp-input
          placeholder="Ajouter une todo..."
          [ngModel]="todo()"
          (ngModelChange)="todo.set($event)"
        />

        <cmp-button icon="plus" />
      </div>
    </cmp-card>
  `,
  styles: [
    `
      :host {
        @apply flex justify-center items-center min-h-screen bg-slate-50;
      }
    `,
  ],
})
export class AppComponent {
  protected readonly todo = signal('');

  constructor() {
    inject(FaIconLibrary).addIconPacks(fas);
  }
}
