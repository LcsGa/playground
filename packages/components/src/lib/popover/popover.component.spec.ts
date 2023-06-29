import { TestBed } from '@angular/core/testing';
import { SubscriberSpy, subscribeSpyTo } from '@hirez_io/observer-spy';
import { ObservedValueOf } from 'rxjs';
import { PopoverComponent } from './popover.component';

describe('PopoverComponent', () => {
  let component: PopoverComponent;
  let openedSpy: SubscriberSpy<ObservedValueOf<PopoverComponent['opened$']>>;

  beforeEach(() => {
    const fixture = TestBed.createComponent(PopoverComponent);
    component = fixture.componentInstance;
    openedSpy = subscribeSpyTo(component.opened$);
    fixture.detectChanges();
  });

  it('should be closed by default', () => {
    expect(openedSpy.getFirstValue()).toEqual(false);
  });

  it('should toggle the popover', () => {
    // when
    component.toggle();
    component.toggle();
    component.toggle();

    // then
    expect(openedSpy.getValues()).toEqual([false, true, false, true]);
  });

  it('should open the popover regardless of the previous value', () => {
    // when
    component.open();
    component.open();

    // then
    expect(openedSpy.getValues()).toEqual([false, true, true]);
  });

  it('should close the popover regardless of the previous value', () => {
    // when
    component.close();

    // then
    expect(openedSpy.getValues()).toEqual([false, false]);
  });
});
