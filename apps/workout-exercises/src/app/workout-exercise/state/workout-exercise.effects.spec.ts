import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable, firstValueFrom, of, throwError} from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ExerciseEffects } from './workout-exercise.effects';
import { ExercisesService, exercisesServiceMock } from '@workout-tracker/services/exercises';
import { initialWorkoutExercisesState } from '../../+state/models/workoutExercisesState.initialState';
import firebase from 'firebase/compat/app';
import { ExercisesState, getExerciseById, getExercisesState, getUser } from '@workout-tracker/shared-store';
import { getAnonymousUserExerciseDetailsRequest, getAnonymousUserExerciseDetailsRequestError, getAnonymousUserExerciseDetailsRequestSuccess, getAuthenticatedUserExerciseDetailsRequest, getAuthenticatedUserExerciseDetailsRequestError, getAuthenticatedUserExerciseDetailsRequestSuccess, getUserExerciseDetailsRequest } from './workout-exercise.actions';
import { Exercise } from '@workout-tracker/models';
import { exercisesStateMock } from "@workout-tracker/test"

describe('ExerciseDetailsEffects', () => {
  let actions: Observable<Action>;
  let effects: ExerciseEffects;
  let exerciseService: ExercisesService
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
        ExerciseEffects,
        { provide: ExercisesService, useValue: exercisesServiceMock },
        provideMockActions(() => actions),
        provideMockStore({
          initialState: {
            ...initialWorkoutExercisesState,
            ...exercisesStateMock
          }
        }),
      ],
    });

    effects = TestBed.inject(ExerciseEffects);
    exerciseService = TestBed.inject(ExercisesService)
    store = TestBed.inject(MockStore)
  });

  describe('getUserExerciseDetailsRequest$', () => {    
    const exerciseIdSut = 'exerciseId test'
    describe('when getUserExerciseDetailsRequest is dispatched', () => {
      beforeEach(() => {
        store.resetSelectors()
      })

      describe('if user', () => {
        const user =  { uid: 'testUID'} as firebase.User

        beforeEach(() => {
          store.overrideSelector(getUser, user);
          store.refreshState()

          actions = of(getUserExerciseDetailsRequest({ exerciseId: exerciseIdSut}))
        })
        it('should return getAuthenticatedUserExerciseDetailsRequest', async () => {
          const result = await firstValueFrom(effects.getExerciseDetailsRequest$)
          expect(result).toEqual(getAuthenticatedUserExerciseDetailsRequest({ exerciseId: exerciseIdSut}))
        })
      })

      describe('if non user', () => {
        beforeEach(() => {
          store.overrideSelector(getUser, undefined);
          store.refreshState()

          actions = of(getUserExerciseDetailsRequest({ exerciseId: exerciseIdSut}))
        })
        it('should return getAnonymousUserExercisesRequest', async () => {
          const result = await firstValueFrom(effects.getExerciseDetailsRequest$)
          expect(result).toEqual(getAnonymousUserExerciseDetailsRequest({ exerciseId: exerciseIdSut }))
        })
      })

    })
  });

  describe('getAuthenticatedUserExerciseDetailsRequest$', () => {
    const exerciseIdSut = 'exerciseId test'
    const exerciseSut = { id: exerciseIdSut, name: 'exerciseNameTest0' } as Exercise

    const user =  { uid: 'testUID'} as firebase.User

    describe('when getAuthenticatedUserExerciseDetailsRequest is dispatched', () => {
      beforeEach(() => {
        jest.spyOn(exerciseService, 'getExercise').mockClear()

        store.resetSelectors()
        
        store.overrideSelector(getUser, user);
        store.refreshState()
      })
      describe('when exerciseService.getExercise throws error', () => {
        const errorCodeMock = 'testing error code'
        const errorMock = { message: 'testing error message', code: errorCodeMock } as firebase.FirebaseError
        const errorResp = throwError(() => errorMock )

        beforeEach(() => {
          jest.spyOn(exerciseService, 'getExercise').mockReturnValue(errorResp)
          actions = of(getAuthenticatedUserExerciseDetailsRequest( { exerciseId: exerciseIdSut}))
        })

        it('should request getExercise', async () => {
          const getExerciseSpy = jest.spyOn(exerciseService, 'getExercise')
          await firstValueFrom(effects.getAuthenticatedUserExerciseDetailsRequest$)
          expect(getExerciseSpy).toHaveBeenCalledWith(user.uid, exerciseIdSut)
        })
        it('should return getAuthenticatedUserExerciseDetailsRequestError', async () => {
          const result = await firstValueFrom(effects.getAuthenticatedUserExerciseDetailsRequest$)
          expect(result).toEqual(getAuthenticatedUserExerciseDetailsRequestError({ exerciseId: exerciseIdSut}))
        })
      })

      describe('when exercisesService.getExercise success', () => {
        beforeEach(() => {
          jest.spyOn(exerciseService, 'getExercise').mockReturnValue(of(exerciseSut))
          actions = of(getAuthenticatedUserExerciseDetailsRequest({exerciseId: exerciseIdSut}))
        })
        it('should request getExercises', async () => {
          const getExercisesSpy = jest.spyOn(exerciseService, 'getExercise')
          await firstValueFrom(effects.getAuthenticatedUserExerciseDetailsRequest$)
          expect(getExercisesSpy).toHaveBeenCalledWith(user.uid, exerciseIdSut)
        })
        it('should return getAuthenticatedUserExerciseDetailsRequestSuccess', async () => {
          const result = await firstValueFrom(effects.getAuthenticatedUserExerciseDetailsRequest$)
          expect(result).toEqual(getAuthenticatedUserExerciseDetailsRequestSuccess({ exercise: exerciseSut}))
        })
      })

    })
  });

  describe('getAnonymousUserExerciseDetailsRequest$', () => {
    describe('when getAnonymousUserExerciseDetailsRequest is dispatched', () => {
      const exerciseIdSut = 'exerciseId test'
      const exerciseSut = { id: exerciseIdSut, name: 'exerciseNameTest0' } as Exercise  
      beforeEach(() => { 
        store.resetSelectors()
        store.refreshState()
        actions = of(getAnonymousUserExerciseDetailsRequest({ exerciseId: exerciseIdSut}))
      })

      describe('if exercise its stored into the created exercises (list)', () => {
        beforeEach(() => { 
          store.overrideSelector(getExercisesState, {
            list: [exerciseSut]
          } as ExercisesState);
          store.refreshState()
        })

        it('should return getAnonymousUserExerciseDetailsRequestSuccess', async () => {
          const result = await firstValueFrom(effects.getAnonymousUserExerciseDetailsRequest$)
          expect(result).toEqual(getAnonymousUserExerciseDetailsRequestSuccess({ exercise: exerciseSut}))
        })
      })
      describe('if exercise its not stored into  the created exercises (list)', () => {
        beforeEach(() => { 
          store.overrideSelector(getExercisesState, {
            list: [] as Exercise[]
          } as ExercisesState);
          store.refreshState()
        })

        it('should return getAnonymousUserExerciseDetailsRequestError', async () => {
          const result = await firstValueFrom(effects.getAnonymousUserExerciseDetailsRequest$)
          expect(result).toEqual(getAnonymousUserExerciseDetailsRequestError({ exerciseId: exerciseIdSut}))
        })
      })
    })
  })
});
