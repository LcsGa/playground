import { NgIf } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  signal,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import {
  AutofocusDirective,
  ButtonComponent,
  InputComponent,
} from '@components';
import { delay, filter, ignoreElements, pairwise, tap } from 'rxjs';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    AutofocusDirective,
    ButtonComponent,
    FormsModule,
    InputComponent,
    NgIf,
  ],
  template: `
    <p *ngIf="!editable(); else edition">{{ todoValue() }}</p>

    <ng-template #edition>
      <cmp-input
        #input
        [cmpAutofocus]="input"
        [ngModel]="todoEdit()"
        (ngModelChange)="todoEdit.set($event)"
        (keydown.enter)="registerTodoUpdate()"
        (keydown.escape)="cancelTodoUpdate()"
        (focusout)="cancelTodoUpdate()"
      />
    </ng-template>

    <div class="flex gap-2">
      <ng-container *ngIf="!editable(); else editableBtns">
        <cmp-button
          #edit
          kind="basic"
          iconOnly
          rounded
          icon="pencil"
          (click)="editable.set(true)"
        />

        <cmp-button
          kind="basic"
          iconOnly
          rounded
          icon="trash"
          severity="danger"
          (click)="remove.emit()"
        />
      </ng-container>

      <ng-template #editableBtns>
        <cmp-button
          kind="basic"
          iconOnly
          rounded
          icon="check"
          severity="success"
          (click)="registerTodoUpdate()"
        />

        <cmp-button
          kind="basic"
          iconOnly
          rounded
          icon="times"
          severity="danger"
          (click)="cancelTodoUpdate()"
        />
      </ng-template>
    </div>
  `,
  styles: [':host { @apply flex justify-between items-center gap-x-4 }'],
})
export class TodoComponent {
  @Input({ required: true }) set todo(todo: string) {
    this.todoValue.set(todo);
    this.todoEdit.set(todo);
  }

  protected readonly todoValue = signal('');
  protected readonly todoEdit = signal('');

  @Output()
  protected readonly remove = new EventEmitter<void>();

  protected readonly editable = signal(false);

  @ViewChild('edit', { read: ButtonComponent })
  private readonly editBtn?: ButtonComponent;

  readonly #focusEditBtn$ = toObservable(this.editable).pipe(
    pairwise(),
    filter(([prev, curr]) => prev === true && curr === false),
    delay(0),
    tap(() => this.editBtn?.focus()),
    ignoreElements()
  );

  constructor() {
    this.#focusEditBtn$.pipe(takeUntilDestroyed()).subscribe();
  }

  protected registerTodoUpdate(): void {
    if (this.todoEdit().length) {
      this.todoValue.set(this.todoEdit());
      this.editable.set(false);
    }
  }

  protected cancelTodoUpdate(): void {
    this.todoEdit.set(this.todoValue());
    this.editable.set(false);
  }
}
