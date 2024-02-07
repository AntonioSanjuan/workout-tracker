import { TestBed } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { Observable, filter, firstValueFrom, of } from 'rxjs';
import { LayoutEffects } from './layout.effects';
import { routerNavigationAction } from '@ngrx/router-store';
import { closeNavBar } from './layout.actions';
import { provideMockActions } from '@ngrx/effects/testing';
import { Actions } from '@ngrx/effects';

describe('PokemonListEffects', () => {
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

  describe('routerNavigationAction$', () => {
    describe('when routerNavigationAction is dispatched', () => {

      beforeEach(() => { 
        actions = of(routerNavigationAction({} as any))
      })

      it('should call getNextPokemonListPageRequestError', async () => {
        const result = await firstValueFrom(effects.routerNavigationAction$)
        expect(result).toEqual(closeNavBar())
      })
    });
  });
})
