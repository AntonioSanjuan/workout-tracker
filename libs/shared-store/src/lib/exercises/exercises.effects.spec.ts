import { TestBed } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { Observable, firstValueFrom, of, throwError } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { Actions } from '@ngrx/effects';
import { AuthService, authServiceMock } from '@workout-tracker/services/auth';
import firebase from 'firebase/compat/app';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { userStateMock } from '@workout-tracker/test';
import { Exercise } from '@workout-tracker/models';
import { getUser } from '../user';
import { ExercisesService, exercisesServiceMock } from '@workout-tracker/services/exercises';
import { ExercisesEffects } from './exercises.effects'
import { getExercisesRequest, getExercisesRequestError, getExercisesRequestSuccess } from './exercises.actions';
import { getExercisesList } from './exercises.selectors';
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

  describe('getExercisesRequest$', () => {
    const exercisesSut = [{ name: 'exerciseNameTest0' }, { name: 'exerciseNameTest1' }] as Exercise[]

    const user =  { uid: 'testUID'} as firebase.User

    describe('when getExercisesRequest is dispatched', () => {
      beforeEach(() => {
        jest.spyOn(exerciseService, 'getExercises').mockClear()

        store.resetSelectors()
        store.refreshState()
      })

      describe('if user stored', () => {
        beforeEach(() => { 
          store.overrideSelector(getUser, user);
          store.refreshState()
        })
        describe('when exerciseService.getExercises throws error', () => {
        const errorCodeMock = 'testing error code'
        const errorMock = { message: 'testing error message', code: errorCodeMock } as firebase.FirebaseError
        const errorResp = throwError(() => errorMock )

          beforeEach(() => {
            jest.spyOn(exerciseService, 'getExercises').mockReturnValue(errorResp)
            actions = of(getExercisesRequest())
          })

          it('should request getExercises', async () => {
            const getExercisesSpy = jest.spyOn(exerciseService, 'getExercises')
            await firstValueFrom(effects.getExercisesRequest$)
            expect(getExercisesSpy).toHaveBeenCalledWith(user.uid)
          })
          it('should return getExercisesRequestError', async () => {
            const result = await firstValueFrom(effects.getExercisesRequest$)
            expect(result).toEqual(getExercisesRequestError({ error: errorMock}))
          })
        })

        describe('when exerciseService.getExercises success', () => {
          beforeEach(() => {
            jest.spyOn(exerciseService, 'getExercises').mockReturnValue(of(exercisesSut))
            actions = of(getExercisesRequest())
          })
          it('should request getExercises', async () => {
            const getExercisesSpy = jest.spyOn(exerciseService, 'getExercises')
            await firstValueFrom(effects.getExercisesRequest$)
            expect(getExercisesSpy).toHaveBeenCalledWith(user.uid)
          })
          it('should return getExercisesRequestSuccess', async () => {
            const result = await firstValueFrom(effects.getExercisesRequest$)
            expect(result).toEqual(getExercisesRequestSuccess({ exercises: exercisesSut}))
          })
        })

      })
  
      describe('if its not user stored', () => {
        const alreadyStoredExercises: Exercise[] = [{ id: '0', name: 'testName'} as Exercise]
        beforeEach(() => { 
          store.overrideSelector(getUser, undefined);
          store.overrideSelector(getExercisesList, alreadyStoredExercises);
          store.refreshState()
          
          actions = of(getExercisesRequest())
        })
        it('should not request getExercises', async () => {
          const getExercisesSpy = jest.spyOn(exerciseService, 'getExercises')
          await firstValueFrom(effects.getExercisesRequest$)
          expect(getExercisesSpy).not.toHaveBeenCalled()
        })
        it('should return updateUserDataRequestSuccess with stored data', async () => {
          const result = await firstValueFrom(effects.getExercisesRequest$)
          expect(result).toEqual(getExercisesRequestSuccess({ exercises: alreadyStoredExercises}))
        })
      })
    })
  });
});
