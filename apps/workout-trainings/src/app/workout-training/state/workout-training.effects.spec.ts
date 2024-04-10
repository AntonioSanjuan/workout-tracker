import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable, firstValueFrom, of, throwError} from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TrainingEffects } from './workout-training.effects';
import firebase from 'firebase/compat/app';
import { Training } from '@workout-tracker/models';
import { getAnonymousUserTrainingDetailsRequest, getAnonymousUserTrainingDetailsRequestError, getAnonymousUserTrainingDetailsRequestSuccess, getAuthenticatedUserTrainingDetailsRequest, getAuthenticatedUserTrainingDetailsRequestError, getAuthenticatedUserTrainingDetailsRequestSuccess, getUserTrainingDetailsRequest } from './workout-training.actions';
import { TrainingsService, trainingsServiceMock } from '@workout-tracker/services/trainings';
import { TrainingsListState, getTrainingsListState, getUser } from '@workout-tracker/shared-store';
import { workoutTrainingsAppStateMock } from '../../+state/test/workoutTrainingsStateMock/workoutTrainingsStateMock.mock';

describe('TrainingDetailsEffects', () => {
  let actions: Observable<Action>;
  let effects: TrainingEffects;
  let trainingService: TrainingsService
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ],
      providers: [
        TrainingEffects,
        { provide: TrainingsService, useValue: trainingsServiceMock },
        provideMockActions(() => actions),
        provideMockStore({
          initialState: {
            ...workoutTrainingsAppStateMock
          }
        }),
      ],
    });

    effects = TestBed.inject(TrainingEffects);
    trainingService = TestBed.inject(TrainingsService)
    store = TestBed.inject(MockStore)
  });

  describe('getUserTrainingDetailsRequest$', () => {    
    const trainingIdSut = 'trainingId test'
    describe('when getUserTrainingDetailsRequest is dispatched', () => {
      beforeEach(() => {
        store.resetSelectors()
      })

      describe('if user', () => {
        const user =  { uid: 'testUID'} as firebase.User

        beforeEach(() => {
          store.overrideSelector(getUser, user);
          store.refreshState()

          actions = of(getUserTrainingDetailsRequest({ trainingId: trainingIdSut}))
        })
        it('should return getAuthenticatedUserTrainingDetailsRequest', async () => {
          const result = await firstValueFrom(effects.getUserTrainingDetailsRequest$)
          expect(result).toEqual(getAuthenticatedUserTrainingDetailsRequest({ trainingId: trainingIdSut}))
        })
      })

      describe('if non user', () => {
        beforeEach(() => {
          store.overrideSelector(getUser, undefined);
          store.refreshState()

          actions = of(getUserTrainingDetailsRequest({ trainingId: trainingIdSut}))
        })
        it('should return getAnonymousUserTrainingDetailsRequest', async () => {
          const result = await firstValueFrom(effects.getUserTrainingDetailsRequest$)
          expect(result).toEqual(getAnonymousUserTrainingDetailsRequest({ trainingId: trainingIdSut }))
        })
      })

    })
  });

  describe('getAuthenticatedUserTrainingDetailsRequest$', () => {
    const trainingIdSut = 'trainingId test'
    const trainingSut = { id: trainingIdSut } as Training

    const user =  { uid: 'testUID'} as firebase.User

    describe('when getAuthenticatedUserTrainingDetailsRequest is dispatched', () => {
      beforeEach(() => {
        jest.spyOn(trainingService, 'getTraining').mockClear()

        store.resetSelectors()
        
        store.overrideSelector(getUser, user);
        store.refreshState()
      })
      describe('when trainingService.getTraining throws error', () => {
        const errorCodeMock = 'testing error code'
        const errorMock = { message: 'testing error message', code: errorCodeMock } as firebase.FirebaseError
        const errorResp = throwError(() => errorMock )

        beforeEach(() => {
          jest.spyOn(trainingService, 'getTraining').mockReturnValue(errorResp)
          actions = of(getAuthenticatedUserTrainingDetailsRequest( { trainingId: trainingIdSut}))
        })

        it('should request getTraining', async () => {
          const getTrainingSpy = jest.spyOn(trainingService, 'getTraining')
          await firstValueFrom(effects.getAuthenticatedUserTrainingDetailsRequest$)
          expect(getTrainingSpy).toHaveBeenCalledWith(user.uid, trainingIdSut)
        })
        it('should return getAuthenticatedUserTrainingDetailsRequestError', async () => {
          const result = await firstValueFrom(effects.getAuthenticatedUserTrainingDetailsRequest$)
          expect(result).toEqual(getAuthenticatedUserTrainingDetailsRequestError({ trainingId: trainingIdSut}))
        })
      })

      describe('when trainingService.getTraining success', () => {
        beforeEach(() => {
          jest.spyOn(trainingService, 'getTraining').mockReturnValue(of(trainingSut))
          actions = of(getAuthenticatedUserTrainingDetailsRequest({trainingId: trainingIdSut}))
        })
        it('should request getTraining', async () => {
          const getTrainingsSpy = jest.spyOn(trainingService, 'getTraining')
          await firstValueFrom(effects.getAuthenticatedUserTrainingDetailsRequest$)
          expect(getTrainingsSpy).toHaveBeenCalledWith(user.uid, trainingIdSut)
        })
        it('should return getAuthenticatedUserTrainingDetailsRequestSuccess', async () => {
          const result = await firstValueFrom(effects.getAuthenticatedUserTrainingDetailsRequest$)
          expect(result).toEqual(getAuthenticatedUserTrainingDetailsRequestSuccess({ training: trainingSut}))
        })
      })

    })
  });

  describe('getAnonymousUserTrainingDetailsRequest$', () => {
    describe('when getAnonymousUserTrainingDetailsRequest is dispatched', () => {
      const trainingIdSut = 'trainingId test'
      const trainingSut = { id: trainingIdSut } as Training 
      beforeEach(() => { 
        store.resetSelectors()
        store.refreshState()
        actions = of(getAnonymousUserTrainingDetailsRequest({ trainingId: trainingIdSut}))
      })

      describe('if training its stored into the created trainings (list)', () => {
        beforeEach(() => { 
          store.overrideSelector(getTrainingsListState, {
            list: [trainingSut]
          } as TrainingsListState);
          store.refreshState()
        })

        it('should return getAnonymousUserTrainingDetailsRequestSuccess', async () => {
          const result = await firstValueFrom(effects.getAnonymousUserTrainingDetailsRequest$)
          expect(result).toEqual(getAnonymousUserTrainingDetailsRequestSuccess({ training: trainingSut}))
        })
      })
      describe('if training its not stored into  the created trainings (list)', () => {
        beforeEach(() => { 
          store.overrideSelector(getTrainingsListState, {
            list: [] as Training[]
          } as TrainingsListState);
          store.refreshState()
        })

        it('should return getAnonymousUserTrainingDetailsRequestError', async () => {
          const result = await firstValueFrom(effects.getAnonymousUserTrainingDetailsRequest$)
          expect(result).toEqual(getAnonymousUserTrainingDetailsRequestError({ trainingId: trainingIdSut}))
        })
      })
    })
  })
});
