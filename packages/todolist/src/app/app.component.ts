import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent, CardComponent, InputComponent } from '@components';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { TodoComponent } from './todo/todo.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    ButtonComponent,
    CardComponent,
    FormsModule,
    InputComponent,
    NgFor,
    NgIf,
    TodoComponent,
  ],
  template: `
    <cmp-card class="max-w-xl">
      <div class="flex gap-x-3">
        <cmp-input
          class="flex-1"
          placeholder="Ajouter une todo..."
          [ngModel]="todoInput()"
          (ngModelChange)="todoInput.set($event)"
          (keydown.enter)="addOne()"
        />

        <cmp-button iconOnly icon="plus" (click)="addOne()" />
      </div>

      <div *ngIf="todos().length" class="flex flex-col gap-y-3">
        <app-todo
          *ngFor="let todo of todos(); let index = index"
          [todo]="todo"
          (remove)="removeOne(index)"
        />
      </div>
    </cmp-card>
  `,
  styles: [
    ':host { @apply flex justify-center items-center min-h-screen bg-slate-50 }',
  ],
})
export class AppComponent {
  protected readonly todoInput = signal('');

  todos = signal<string[]>([]);

  constructor() {
    inject(FaIconLibrary).addIconPacks(fas);
  }

  addOne(): void {
    if (this.todoInput()) {
      this.todos.update((todos) => [this.todoInput(), ...todos]);
      this.todoInput.set('');
    }
  }

  removeOne(index: number): void {
    this.todos.update((todos) => todos.filter((_, i) => i !== index));
  }
}
