import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable, firstValueFrom, of } from 'rxjs';
import { ErrorMessageEffects } from './error-messages.effects';
import { showError } from './error-messages.actions';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LibsServicesMessageModule, MessageService } from '@workout-tracker/services/message';
import { MessageTypes } from '@workout-tracker/models';

describe('ErrorMessageEffects', () => {
  let actions: Observable<Action>;
  let effects: ErrorMessageEffects;
  let messageService: MessageService
  let store:  MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        LibsServicesMessageModule
      ],
      providers: [
        ErrorMessageEffects,
        MessageService,
        provideMockActions(() => actions),
        provideMockStore({
          initialState: {}
        }),
      ],
    });

    effects = TestBed.inject(ErrorMessageEffects);
    store = TestBed.inject(MockStore);
    messageService = TestBed.inject(MessageService)
  });

  describe('showError$', () => {
    describe('when showError is dispatched', () => {
      const errorMessageSut = 'test error msg'
      let showAlertSpy: any;
      beforeEach(() => {
        actions = of(showError({ errorMessage: errorMessageSut }))
      })
      it('should call messageService.showAlertMessage', async () => {
        showAlertSpy = jest.spyOn(messageService, 'showAlertMessage')
        store.dispatch(showError({ errorMessage: errorMessageSut }))

        await firstValueFrom(effects.showError$)
        expect(showAlertSpy).toHaveBeenCalledWith(MessageTypes.Error, errorMessageSut)
      })
    })
  });
});
