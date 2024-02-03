import {
    AUTO_STYLE,
    animate,
    state,
    style,
    transition,
    trigger,
  } from '@angular/animations';
  
  const DEFAULT_DURATION = 500;

  export const collapseAnimation = trigger('collapse', [
    state('false', style({ left: AUTO_STYLE })),
    state('true', style({ left: '-100%' })),
    transition('false => true', animate(`${DEFAULT_DURATION}ms ease-in`)),
    transition('true => false', animate(`${DEFAULT_DURATION}ms ease-out`))
  ])