import { TestBed } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { Observable, firstValueFrom, of, throwError } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { Actions } from '@ngrx/effects';
import firebase from 'firebase/compat/app';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { userStateMock } from '@workout-tracker/test';
import { Exercise } from '@workout-tracker/models';
import { getUser } from '../user';
import { ExercisesService, exercisesServiceMock } from '@workout-tracker/services/exercises';
import { ExercisesEffects } from './exercises.effects'
import { getExercisesList } from './exercises.selectors';
import { getAnonymousUserExercisesRequest, getAnonymousUserExercisesRequestSuccess, getAuthenticatedUserExercisesRequest, getAuthenticatedUserExercisesRequestError, getAuthenticatedUserExercisesRequestSuccess } from './exercises.actions';
describe('ExercisesEffects', () => {
  let actions: Observable<Action>;
  let effects: ExercisesEffects
  let exerciseService: ExercisesService
  let store: MockStore

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      providers: [
        { provide: ExercisesService, useValue: exercisesServiceMock },
        ExercisesEffects,
        provideMockStore({
          initialState: userStateMock
        }),
        provideMockActions(() => actions),
      ],
    });

    effects = TestBed.inject(ExercisesEffects);
    actions = TestBed.inject(Actions)
    store = TestBed.inject(MockStore)
    exerciseService = TestBed.inject(ExercisesService)
  });

  describe('getAuthenticatedUserExercisesRequest$', () => {
    const exercisesSut = [{ name: 'exerciseNameTest0' }, { name: 'exerciseNameTest1' }] as Exercise[]

    const user =  { uid: 'testUID'} as firebase.User

    describe('when getAuthenticatedUserExercisesRequest is dispatched', () => {
      beforeEach(() => {
        jest.spyOn(exerciseService, 'getExercises').mockClear()

        store.resetSelectors()
        
        store.overrideSelector(getUser, user);
        store.refreshState()
      })
      describe('when exerciseService.getExercises throws error', () => {
        const errorCodeMock = 'testing error code'
        const errorMock = { message: 'testing error message', code: errorCodeMock } as firebase.FirebaseError
        const errorResp = throwError(() => errorMock )

        beforeEach(() => {
          jest.spyOn(exerciseService, 'getExercises').mockReturnValue(errorResp)
          actions = of(getAuthenticatedUserExercisesRequest())
        })

        it('should request getExercises', async () => {
          const getExercisesSpy = jest.spyOn(exerciseService, 'getExercises')
          await firstValueFrom(effects.getAuthenticatedUserExercisesRequest$)
          expect(getExercisesSpy).toHaveBeenCalledWith(user.uid)
        })
        it('should return getAuthenticatedUserExercisesRequestError', async () => {
          const result = await firstValueFrom(effects.getAuthenticatedUserExercisesRequest$)
          expect(result).toEqual(getAuthenticatedUserExercisesRequestError({ error: errorMock}))
        })
      })

      describe('when exerciseService.getExercises success', () => {
        beforeEach(() => {
          jest.spyOn(exerciseService, 'getExercises').mockReturnValue(of(exercisesSut))
          actions = of(getAuthenticatedUserExercisesRequest())
        })
        it('should request getExercises', async () => {
          const getExercisesSpy = jest.spyOn(exerciseService, 'getExercises')
          await firstValueFrom(effects.getAuthenticatedUserExercisesRequest$)
          expect(getExercisesSpy).toHaveBeenCalledWith(user.uid)
        })
        it('should return getAuthenticatedUserExercisesRequestSuccess', async () => {
          const result = await firstValueFrom(effects.getAuthenticatedUserExercisesRequest$)
          expect(result).toEqual(getAuthenticatedUserExercisesRequestSuccess({ exercises: exercisesSut}))
        })
      })

    })
  });

  describe('getAnonymousUserExercisesRequest$', () => {
    describe('when getAnonymousUserExercisesRequest is dispatched', () => {
      const exercisesSut = [{ name: 'exerciseNameTest0' }, { name: 'exerciseNameTest1' }] as Exercise[]

  
      beforeEach(() => { 
        store.resetSelectors()
        
        store.overrideSelector(getExercisesList, exercisesSut);
        store.refreshState()
      
        actions = of(getAnonymousUserExercisesRequest())

      })
      it('should return getAnonymousUserExercisesRequestSuccess', async () => {
        const result = await firstValueFrom(effects.getAnonymousUserExercisesRequest$)
        expect(result).toEqual(getAnonymousUserExercisesRequestSuccess({ exercises: exercisesSut}))
      })
    })
  })
});
