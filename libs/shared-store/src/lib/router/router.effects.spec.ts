import { TestBed } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { Observable, filter, firstValueFrom, of } from 'rxjs';
import { RouterNavigationPayload, SerializedRouterStateSnapshot, routerNavigationAction } from '@ngrx/router-store';
import { provideMockActions } from '@ngrx/effects/testing';
import { Actions } from '@ngrx/effects';
import { setCurrentRoute } from './router.actions';
import { RouterEffects } from './router.effects';

describe('RouterEffects', () => {
  let actions: Observable<Action>;
  let effects: RouterEffects

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      providers: [
        RouterEffects,
        provideMockActions(() => actions),
      ],
    });

    effects = TestBed.inject(RouterEffects);
    actions = TestBed.inject(Actions)
  });

  describe('routerNavigationAction$', () => {
    describe('when routerNavigationAction is dispatched', () => {
      const urlSut = 'testUrl'
      beforeEach(() => { 
        actions = of(routerNavigationAction({ payload: { event: { url: urlSut}} as RouterNavigationPayload<SerializedRouterStateSnapshot>} ))
      })

      it('should call setCurrentRoute', async () => {
        const result = await firstValueFrom(effects.routerNavigationAction$)
        expect(result).toEqual(setCurrentRoute({currentRoute: urlSut}))
      })
    });
  });
})
