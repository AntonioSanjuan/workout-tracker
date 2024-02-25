import { TestBed } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { Observable, filter, firstValueFrom, of } from 'rxjs';
import { LayoutEffects } from './layout.effects';
import { routerNavigationAction } from '@ngrx/router-store';
import { closeNavBar } from './layout.actions';
import { provideMockActions } from '@ngrx/effects/testing';
import { Actions } from '@ngrx/effects';
import { setCurrentRoute } from '../router/router.actions';

describe('LayoutEffects', () => {
  let actions: Observable<Action>;
  let effects: LayoutEffects

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      providers: [
        LayoutEffects,
        provideMockActions(() => actions),
      ],
    });

    effects = TestBed.inject(LayoutEffects);
    actions = TestBed.inject(Actions)
  });

  describe('setCurrentRoute$', () => {
    describe('when setCurrentRoute is dispatched', () => {

      beforeEach(() => { 
        actions = of(setCurrentRoute({} as any))
      })

      it('should call closeNavBar', async () => {
        const result = await firstValueFrom(effects.setCurrentRoute$)
        expect(result).toEqual(closeNavBar())
      })
    });
  });
})
