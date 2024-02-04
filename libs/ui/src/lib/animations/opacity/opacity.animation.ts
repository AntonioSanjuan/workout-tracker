import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

const DEFAULT_DURATION = 200;

export const opacityAnimation = trigger('opacity', [
  state('false', style({ filter: 'opacity(1)' })),
  state('true', style({ filter: 'opacity(0.5)' })),
  transition('false => true', animate(`${DEFAULT_DURATION}ms ease-in`)),
  transition('true => false', animate(`${DEFAULT_DURATION}ms ease-out`))
])
