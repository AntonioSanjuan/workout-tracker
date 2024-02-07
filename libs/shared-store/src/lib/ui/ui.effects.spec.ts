import { TestBed } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { Observable, firstValueFrom, of } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { Actions } from '@ngrx/effects';
import { UiEffects } from './ui.effects'
import { endRequest, startRequest } from './ui.actions';

describe('UiEffects', () => {
  let actions: Observable<Action>;
  let effects: UiEffects

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      providers: [
        UiEffects,
        provideMockActions(() => actions),
      ],
    });

    effects = TestBed.inject(UiEffects);
    actions = TestBed.inject(Actions)
  });

  describe('initRequest$', () => {
    describe('requestOnGoing, initial status', () => {
      it('should be false', () => {
        effects.requestOnGoing.asObservable().subscribe((requestOnGoing: boolean) => {
          expect(requestOnGoing).toBeFalsy()
        })
      })
    })

    describe('when startRequest is dispatched', () => {
      describe('if previous startRequest was dispatched and requestOnGoing is true', () => {
        beforeEach(async () => {
          actions = of(startRequest())
          await firstValueFrom(effects.initRequest$)
          expect(effects.requestOnGoing.getValue()).toBeTruthy()
        })

        it('requestOnGoing shouldnt change', async () => {
          actions = of(startRequest())
          await firstValueFrom(effects.initRequest$)
          effects.requestOnGoing.asObservable().subscribe((requestOnGoing: boolean) => {
            expect(requestOnGoing).toBeTruthy()
          })
        })
      })

      describe('if previous startRequest was not dispatched', () => {
        it('requestOnGoing should change', async () => {
          expect(effects.requestOnGoing.getValue()).toBeFalsy()

          actions = of(startRequest())
          await firstValueFrom(effects.initRequest$)
          effects.requestOnGoing.asObservable().subscribe((requestOnGoing: boolean) => {
            expect(requestOnGoing).toBeTruthy()
          })
        })
      })
    });

    describe('when endRequest is dispatched', () => {
      describe('if previous startRequest was dispatched but no endRequest', () => {
        beforeEach(async () => {
          actions = of(startRequest())
          await firstValueFrom(effects.initRequest$)
          expect(effects.requestOnGoing.getValue()).toBeTruthy()
        })

        it('requestOnGoing should change', async () => {
          actions = of(endRequest())
          await firstValueFrom(effects.endRequest$)
          effects.requestOnGoing.asObservable().subscribe((requestOnGoing: boolean) => {
            expect(requestOnGoing).toBeFalsy()
          })
        })
      })

      describe('if previous startRequest was not dispatched', () => {
        it('requestOnGoing should change', async () => {
          expect(effects.requestOnGoing.getValue()).toBeFalsy()

          actions = of(endRequest())
          await firstValueFrom(effects.endRequest$)
          effects.requestOnGoing.asObservable().subscribe((requestOnGoing: boolean) => {
            expect(requestOnGoing).toBeFalsy()
          })
        })
      })
    });
  });
})
