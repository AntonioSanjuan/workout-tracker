import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable, firstValueFrom, of, throwError} from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import firebase from 'firebase/compat/app';
import { Training, TrainingExercise } from '@workout-tracker/models';
import { TrainingsService, trainingsServiceMock } from '@workout-tracker/services/trainings';
import { getUser } from '@workout-tracker/shared-store';
import { workoutTrainingsAppStateMock } from '../../+state/test/workoutTrainingsStateMock/workoutTrainingsStateMock.mock';
import { TrainingExerciseEffects } from './workout-training-exercise.effects';
import { getAnonymousUserTrainingExerciseRequest, getAnonymousUserTrainingExerciseRequestError, getAnonymousUserTrainingExerciseRequestSuccess, getAuthenticatedUserTrainingExerciseRequest, getAuthenticatedUserTrainingExerciseRequestError, getAuthenticatedUserTrainingExerciseRequestSuccess, getUserTrainingExerciseRequest } from './workout-training-exercise.actions';
import { selectWorkoutTraining, selectWorkoutTrainingState } from '../../workout-training/state/workout-training.selectors';

describe('TrainingExerciseEffects', () => {
  let actions: Observable<Action>;
  let effects: TrainingExerciseEffects;
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
        TrainingExerciseEffects,
        { provide: TrainingsService, useValue: trainingsServiceMock },
        provideMockActions(() => actions),
        provideMockStore({
          initialState: {
            ...workoutTrainingsAppStateMock
          }
        }),
      ],
    });

    effects = TestBed.inject(TrainingExerciseEffects);
    trainingService = TestBed.inject(TrainingsService)
    store = TestBed.inject(MockStore)
  });

  describe('getUserTrainingExerciseRequest$', () => {    
    const trainingIdSut = 'trainingId test'
    const trainingExerciseIdSut = 'trainingExerciseId test'
    describe('when getUserTrainingExerciseRequest is dispatched', () => {
      beforeEach(() => {
        store.resetSelectors()
      })

      describe('if user', () => {
        const user =  { uid: 'testUID'} as firebase.User

        beforeEach(() => {
          store.overrideSelector(getUser, user);
          store.refreshState()

          actions = of(getUserTrainingExerciseRequest({ trainingId: trainingIdSut, trainingExerciseId: trainingExerciseIdSut}))
        })
        it('should return getAuthenticatedUserTrainingExerciseRequest', async () => {
          const result = await firstValueFrom(effects.getUserTrainingExerciseRequest$)
          expect(result).toEqual(getAuthenticatedUserTrainingExerciseRequest({ trainingId: trainingIdSut, trainingExerciseId: trainingExerciseIdSut }))
        })
      })

      describe('if non user', () => {
        beforeEach(() => {
          store.overrideSelector(getUser, undefined);
          store.refreshState()

          actions = of(getUserTrainingExerciseRequest({ trainingId: trainingIdSut, trainingExerciseId: trainingExerciseIdSut}))
        })
        it('should return getAnonymousUserTrainingExerciseRequest', async () => {
          const result = await firstValueFrom(effects.getUserTrainingExerciseRequest$)
          expect(result).toEqual(getAnonymousUserTrainingExerciseRequest({ trainingId: trainingIdSut, trainingExerciseId: trainingExerciseIdSut }))
        })
      })

    })
  });

  describe('getAuthenticatedUserTrainingExerciseRequest$', () => {
    const trainingIdSut = 'trainingId test'
    const trainingExerciseIdSut = 'trainingExerciseId test'

    const trainingExerciseSut = { id: trainingExerciseIdSut } as TrainingExercise

    const user =  { uid: 'testUID'} as firebase.User

    describe('when getAuthenticatedUserTrainingExerciseRequest is dispatched', () => {
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
          jest.spyOn(trainingService, 'getTrainingExercise').mockReturnValue(errorResp)
          actions = of(getAuthenticatedUserTrainingExerciseRequest( { trainingId: trainingIdSut, trainingExerciseId: trainingExerciseIdSut }))
        })

        it('should request getTrainingExercise', async () => {
          const getTrainingExerciseSpy = jest.spyOn(trainingService, 'getTrainingExercise')
          await firstValueFrom(effects.getAuthenticatedUserTrainingExerciseRequest$)
          expect(getTrainingExerciseSpy).toHaveBeenCalledWith(user.uid, trainingIdSut, trainingExerciseIdSut)
        })
        it('should return getAuthenticatedUserTrainingExerciseRequestError', async () => {
          const result = await firstValueFrom(effects.getAuthenticatedUserTrainingExerciseRequest$)
          expect(result).toEqual(getAuthenticatedUserTrainingExerciseRequestError({ trainingExerciseId: trainingExerciseIdSut }))
        })
      })

      describe('when trainingService.getTrainingExercise success', () => {
        beforeEach(() => {
          jest.spyOn(trainingService, 'getTrainingExercise').mockReturnValue(of(trainingExerciseSut))
          actions = of(getAuthenticatedUserTrainingExerciseRequest({trainingId: trainingIdSut, trainingExerciseId: trainingExerciseIdSut}))
        })
        it('should request getTrainingExercise', async () => {
          const getTrainingExerciseSpy = jest.spyOn(trainingService, 'getTrainingExercise')
          await firstValueFrom(effects.getAuthenticatedUserTrainingExerciseRequest$)
          expect(getTrainingExerciseSpy).toHaveBeenCalledWith(user.uid, trainingIdSut, trainingExerciseIdSut)
        })
        it('should return getAuthenticatedUserTrainingExerciseRequestSuccess', async () => {
          const result = await firstValueFrom(effects.getAuthenticatedUserTrainingExerciseRequest$)
          expect(result).toEqual(getAuthenticatedUserTrainingExerciseRequestSuccess({ trainingExercise: trainingExerciseSut, trainingId: trainingIdSut}))
        })
      })

    })
  });

  describe('getAnonymousUserTrainingExerciseRequest$', () => {
    describe('when getAnonymousUserTrainingExerciseRequest is dispatched', () => {
      const trainingIdSut = 'trainingId test'
      const trainingExerciseIdSut = 'trainingExerciseId test'
  
      const trainingExerciseSut = { id: trainingExerciseIdSut } as TrainingExercise
      beforeEach(() => { 
        store.resetSelectors()
        store.refreshState()
        actions = of(getAnonymousUserTrainingExerciseRequest({ trainingExerciseId: trainingExerciseIdSut, trainingId: trainingIdSut}))
      })

      describe('if training its stored into the created training trainingExercises (list)', () => {
        beforeEach(() => { 
          store.overrideSelector(selectWorkoutTrainingState, {
            training: {
              id: trainingIdSut,
              creationDate: new Date(),
              muscleGroups: [],
              trainingExercises: [trainingExerciseSut]
            } as Training
          });
          store.refreshState()
        })

        it('should return getAnonymousUserTrainingExerciseRequestSuccess', async () => {
          const result = await firstValueFrom(effects.getAnonymousUserTrainingExerciseRequest$)
          expect(result).toEqual(getAnonymousUserTrainingExerciseRequestSuccess({ trainingId: trainingIdSut, trainingExercise: trainingExerciseSut}))
        })
      })
      describe('if training its not stored into the created trainings trainingExercises (list)', () => {
        beforeEach(() => { 
          store.overrideSelector(selectWorkoutTrainingState, {
            training: {
              id: trainingIdSut,
              creationDate: new Date(),
              muscleGroups: [],
              trainingExercises: []
            } as Training
          });
          store.refreshState()
        })

        it('should return getAnonymousUserTrainingExerciseRequestError', async () => {
          const result = await firstValueFrom(effects.getAnonymousUserTrainingExerciseRequest$)
          expect(result).toEqual(getAnonymousUserTrainingExerciseRequestError({ trainingExerciseId: trainingExerciseIdSut}))
        })
      })
    })
  })
});
