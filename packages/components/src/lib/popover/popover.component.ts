import { ConnectedPosition, OverlayModule } from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  signal,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'lib-popover',
  standalone: true,
  imports: [OverlayModule],
  template: `
    <div
      (click)="toggle(); $event.stopPropagation()"
      cdkOverlayOrigin
      #trigger="cdkOverlayOrigin"
    >
      <ng-content select="[kwPopoverTrigger]" />
    </div>

    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="trigger"
      [cdkConnectedOverlayOpen]="opened()"
      [cdkConnectedOverlayHasBackdrop]="true"
      cdkConnectedOverlayBackdropClass="cdk-overlay-transparent-backdrop"
      [cdkConnectedOverlayPositions]="[_position()]"
      (backdropClick)="close()"
    >
      <div class="p-4 rounded-lg bg-white shadow-lg max-w-sm">
        <ng-content select="[kwPopoverContent]" />
      </div>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'kwPopover',
})
export class PopoverComponent {
  protected readonly _position = signal<ConnectedPosition>({
    originX: 'center',
    overlayX: 'center',
    originY: 'bottom',
    overlayY: 'top',
  });
  @Input() set position(position: Partial<ConnectedPosition>) {
    this._position.update((currPos) => ({ ...currPos, position }));
  }

  protected readonly opened = signal(false);
  readonly opened$ = toObservable(this.opened);

  toggle(): void {
    this.opened.update((opened) => !opened);
  }

  open(): void {
    this.opened.set(true);
  }

  close(): void {
    this.opened.set(false);
  }
}
