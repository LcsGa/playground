import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { ButtonComponent, InputComponent } from '@components';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [ButtonComponent, InputComponent, NgIf],
  template: `
    <p *ngIf="!editable(); else edition">{{ todo }}</p>

    <ng-template #edition>
      <cmp-input />
    </ng-template>

    <div class="flex gap-2">
      <ng-container *ngIf="!editable(); else editableBtns">
        <cmp-button
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
          (click)="editable.set(true)"
        />

        <cmp-button
          kind="basic"
          iconOnly
          rounded
          icon="times"
          severity="danger"
          (click)="remove.emit()"
        />
      </ng-template>
    </div>
  `,
  styles: [':host { @apply flex justify-between items-center gap-x-4 }'],
})
export class TodoComponent {
  @Input({ required: true }) todo!: string;

  @Output()
  protected readonly remove = new EventEmitter<void>();

  protected readonly editable = signal(false);
}
