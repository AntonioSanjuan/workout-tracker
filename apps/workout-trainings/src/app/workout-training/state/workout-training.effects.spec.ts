import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable, firstValueFrom, of, throwError} from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TrainingEffects } from './workout-training.effects';
import firebase from 'firebase/compat/app';
import { Training, TrainingExercise } from '@workout-tracker/models';
import { addAnonymousUserTrainingExerciseRequest, addAnonymousUserTrainingExerciseRequestSuccess, addAuthenticatedUserTrainingExerciseRequest, addAuthenticatedUserTrainingExerciseRequestError, addAuthenticatedUserTrainingExerciseRequestSuccess, addUserTrainingExerciseRequest, getAnonymousUserTrainingRequest, getAnonymousUserTrainingRequestError, getAnonymousUserTrainingRequestSuccess, getAuthenticatedUserTrainingRequest, getAuthenticatedUserTrainingRequestError, getAuthenticatedUserTrainingRequestSuccess, getUserTrainingRequest } from './workout-training.actions';
import { TrainingsService, trainingsServiceMock } from '@workout-tracker/services/trainings';
import { TrainingsListState, getTrainingsListState, getUser, showError } from '@workout-tracker/shared-store';
import { workoutTrainingsAppStateMock } from '../../+state/test/workoutTrainingsStateMock/workoutTrainingsStateMock.mock';
import { selectWorkoutTraining } from './workout-training.selectors';
import { WorkoutTrainingExerciseState } from '../../workout-training-exercise/state/workout-training-exercise.reducer';
import { Router } from '@angular/router';
import { appRoutes } from '../../app.routes';
import { RouterTestingModule } from '@angular/router/testing';

describe('TrainingDetailsEffects', () => {
  let actions: Observable<Action>;
  let effects: TrainingEffects;
  let trainingService: TrainingsService
  let store: MockStore;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
        RouterTestingModule.withRoutes(appRoutes)
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
    router = TestBed.inject(Router);
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

          actions = of(getUserTrainingRequest({ trainingId: trainingIdSut}))
        })
        it('should return getAuthenticatedUserTrainingDetailsRequest', async () => {
          const result = await firstValueFrom(effects.getUserTrainingDetailsRequest$)
          expect(result).toEqual(getAuthenticatedUserTrainingRequest({ trainingId: trainingIdSut}))
        })
      })

      describe('if non user', () => {
        beforeEach(() => {
          store.overrideSelector(getUser, undefined);
          store.refreshState()

          actions = of(getUserTrainingRequest({ trainingId: trainingIdSut}))
        })
        it('should return getAnonymousUserTrainingDetailsRequest', async () => {
          const result = await firstValueFrom(effects.getUserTrainingDetailsRequest$)
          expect(result).toEqual(getAnonymousUserTrainingRequest({ trainingId: trainingIdSut }))
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
          actions = of(getAuthenticatedUserTrainingRequest( { trainingId: trainingIdSut}))
        })

        it('should request getTraining', async () => {
          const getTrainingSpy = jest.spyOn(trainingService, 'getTraining')
          await firstValueFrom(effects.getAuthenticatedUserTrainingDetailsRequest$)
          expect(getTrainingSpy).toHaveBeenCalledWith(user.uid, trainingIdSut)
        })
        it('should return getAuthenticatedUserTrainingDetailsRequestError', async () => {
          const result = await firstValueFrom(effects.getAuthenticatedUserTrainingDetailsRequest$)
          expect(result).toEqual(getAuthenticatedUserTrainingRequestError({ trainingId: trainingIdSut}))
        })
      })

      describe('when trainingService.getTraining success', () => {
        beforeEach(() => {
          jest.spyOn(trainingService, 'getTraining').mockReturnValue(of(trainingSut))
          actions = of(getAuthenticatedUserTrainingRequest({trainingId: trainingIdSut}))
        })
        it('should request getTraining', async () => {
          const getTrainingsSpy = jest.spyOn(trainingService, 'getTraining')
          await firstValueFrom(effects.getAuthenticatedUserTrainingDetailsRequest$)
          expect(getTrainingsSpy).toHaveBeenCalledWith(user.uid, trainingIdSut)
        })
        it('should return getAuthenticatedUserTrainingDetailsRequestSuccess', async () => {
          const result = await firstValueFrom(effects.getAuthenticatedUserTrainingDetailsRequest$)
          expect(result).toEqual(getAuthenticatedUserTrainingRequestSuccess({ training: trainingSut}))
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
        actions = of(getAnonymousUserTrainingRequest({ trainingId: trainingIdSut}))
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
          expect(result).toEqual(getAnonymousUserTrainingRequestSuccess({ training: trainingSut}))
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
          expect(result).toEqual(getAnonymousUserTrainingRequestError({ trainingId: trainingIdSut}))
        })
      })
    })
  })

  //
  describe('addUserTrainingExerciseTrainingRequest$', () => {    
    const trainingExerciseSut = { id: 'trainingExercise id test'} as TrainingExercise
    describe('when addUserTrainingExerciseRequest is dispatched', () => {
      beforeEach(() => {
        store.resetSelectors()
      })

      describe('if user', () => {
        const user =  { uid: 'testUID'} as firebase.User

        beforeEach(() => {
          store.overrideSelector(getUser, user);
          store.refreshState()

          actions = of(addUserTrainingExerciseRequest({ trainingExercise: trainingExerciseSut }))
        })
        it('should return addAuthenticatedUserTrainingExerciseRequest', async () => {
          const result = await firstValueFrom(effects.addUserTrainingExerciseTrainingRequest$)
          expect(result).toEqual(addAuthenticatedUserTrainingExerciseRequest({ trainingExercise: trainingExerciseSut }))
        })
      })

      describe('if non user', () => {
        beforeEach(() => {
          store.overrideSelector(getUser, undefined);
          store.refreshState()

          actions = of(addUserTrainingExerciseRequest({ trainingExercise: trainingExerciseSut }))
        })
        it('should return addAnonymousUserTrainingExerciseRequest', async () => {
          const result = await firstValueFrom(effects.addUserTrainingExerciseTrainingRequest$)
          expect(result).toEqual(addAnonymousUserTrainingExerciseRequest({ trainingExercise: trainingExerciseSut }))
        })
      })

    })
  });
  describe('addAuthenticatedUserTrainingExerciseRequest$', () => {
    const trainingExerciseSerieSut = { id: 'trainingExercise id test'} as TrainingExercise

    const user =  { uid: 'testUID'} as firebase.User
    const workoutTrainingState = { id: 'training id test' } as Training
    describe('when addAuthenticatedUserTrainingExerciseRequest is dispatched', () => {
      beforeEach(() => {
        jest.spyOn(trainingService, 'setTrainingExercise').mockClear()

        store.resetSelectors()
        
        store.overrideSelector(getUser, user);
        store.overrideSelector(selectWorkoutTraining, workoutTrainingState)
        store.refreshState()
      })
      describe('when trainingService.setTrainingExercise throws error', () => {
        const errorCodeMock = 'testing error code'
        const errorMock = { message: 'testing error message', code: errorCodeMock } as firebase.FirebaseError
        const errorResp = throwError(() => errorMock )

        beforeEach(() => {
          jest.spyOn(trainingService, 'setTrainingExercise').mockReturnValue(errorResp)
          actions = of(addAuthenticatedUserTrainingExerciseRequest( { trainingExercise: trainingExerciseSerieSut }))
        })

        it('should request setTrainingExerciseSerie', async () => {
          const setTrainingExerciseSpy = jest.spyOn(trainingService, 'setTrainingExercise')
          await firstValueFrom(effects.addAuthenticatedUserTrainingExerciseRequest$)
          expect(setTrainingExerciseSpy).toHaveBeenCalledWith(user.uid, workoutTrainingState.id, trainingExerciseSerieSut)
        })
        it('should return addAuthenticatedUserTrainingExerciseRequestError', async () => {
          const result = await firstValueFrom(effects.addAuthenticatedUserTrainingExerciseRequest$)
          expect(result).toEqual(addAuthenticatedUserTrainingExerciseRequestError())
        })
      })

      describe('when trainingService.setTrainingExercise success', () => {
        beforeEach(() => {
          jest.spyOn(trainingService, 'setTrainingExercise').mockReturnValue(of(trainingExerciseSerieSut))
          actions = of(addAuthenticatedUserTrainingExerciseRequest({trainingExercise: trainingExerciseSerieSut}))
        })
        it('should request setTrainingExercise', async () => {
          const setTrainingExerciseSpy = jest.spyOn(trainingService, 'setTrainingExercise')
          await firstValueFrom(effects.addAuthenticatedUserTrainingExerciseRequest$)
          expect(setTrainingExerciseSpy).toHaveBeenCalledWith(user.uid, workoutTrainingState.id, trainingExerciseSerieSut)
        })
        it('should return addAuthenticatedUserTrainingExerciseRequestSuccess', async () => {
          const result = await firstValueFrom(effects.addAuthenticatedUserTrainingExerciseRequest$)
          expect(result).toEqual(addAuthenticatedUserTrainingExerciseRequestSuccess({ trainingExercise: trainingExerciseSerieSut }))
        })
      })

    })
  });

  describe('addAnonymousUserTrainingExerciseRequest$', () => {
    describe('when addAnonymousUserTrainingExerciseRequest is dispatched', () => {
      const trainingExerciseSut = { id: 'trainingExercise id test'} as TrainingExercise

      describe('should return addAnonymousUserTrainingExerciseRequestSuccess', () => {
        beforeEach(() => {
          actions = of(addAnonymousUserTrainingExerciseRequest({ trainingExercise: trainingExerciseSut }))
        })

        it('should return addAnonymousUserTrainingExerciseRequestSuccess', async () => {
          const result = await firstValueFrom(effects.addAnonymousUserTrainingExerciseRequest$)
          expect(result).toEqual(addAnonymousUserTrainingExerciseRequestSuccess({ trainingExercise: trainingExerciseSut }))
        })
      })
    })
  })

  describe('addUserTrainingExerciseRequestSuccess$', () => {
    const trainingIdSut = 'trainingId test'
    const trainingSut = { id: trainingIdSut } as Training

    const trainingExerciseSut = { id: 'trainingExerciseId test'} as TrainingExercise

    describe('when addAuthenticatedUserTrainingExerciseRequestSuccess is dispatched', () => {
      beforeEach(() => {
        store.resetSelectors()
        store.overrideSelector(selectWorkoutTraining, trainingSut);
        store.refreshState()

        actions = of(addAuthenticatedUserTrainingExerciseRequestSuccess({ trainingExercise: trainingExerciseSut }))
      })
      it('should navigate to new trainingExercise', async () => {
        const navigateSpy = jest.spyOn(router, 'navigate')
        await firstValueFrom(effects.addUserTrainingExerciseRequestSuccess$)
        expect(navigateSpy).toHaveBeenCalledWith([`/trainings/${trainingIdSut}/exercise/${trainingExerciseSut.id}`])
      })
    })

    describe('when addAnonymousUserTrainingExerciseRequestSuccess is dispatched', () => {
      beforeEach(() => {
        store.resetSelectors()
        store.overrideSelector(selectWorkoutTraining, trainingSut);
        store.refreshState()

        actions = of(addAnonymousUserTrainingExerciseRequestSuccess({ trainingExercise: trainingExerciseSut }))
      })
      it('should navigate to new trainingExercise', async () => {
        const navigateSpy = jest.spyOn(router, 'navigate')
        await firstValueFrom(effects.addUserTrainingExerciseRequestSuccess$)
        expect(navigateSpy).toHaveBeenCalledWith([`/trainings/${trainingIdSut}/exercise/${trainingExerciseSut.id}`])
      })
    })

  })

  describe('addUserTrainingExerciseRequestError$', () => {
    describe('when addAuthenticatedUserTrainingExerciseRequestError is dispatched', () => {
      beforeEach(() => {
        actions = of(addAuthenticatedUserTrainingExerciseRequestError())
      })

      it('should return showError', async () => {
        const result = await firstValueFrom(effects.addUserTrainingExerciseRequestError$)
        expect(result).toEqual(showError({ errorMessage: expect.anything()}))
      })
    })
  })
});
