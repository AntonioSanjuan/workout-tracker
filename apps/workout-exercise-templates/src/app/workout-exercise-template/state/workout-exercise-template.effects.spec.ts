import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable, firstValueFrom, of, throwError} from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { WorkoutExerciseTemplatesEffects } from './workout-exercise-template.effects';
import { ExerciseTemplatesService, exerciseTemplatesServiceMock } from '@workout-tracker/services/exercise-templates';
import firebase from 'firebase/compat/app';
import { ExerciseTemplatesListState, getExerciseTemplatesListState, getUser } from '@workout-tracker/shared-store';
import { getAnonymousUserExerciseTemplateDetailsRequest, getAnonymousUserExerciseTemplateDetailsRequestError, getAnonymousUserExerciseTemplateDetailsRequestSuccess, getAuthenticatedUserExerciseTemplateDetailsRequest, getAuthenticatedUserExerciseTemplateDetailsRequestError, getAuthenticatedUserExerciseTemplateDetailsRequestSuccess, getUserExerciseTemplateDetailsRequest } from './workout-exercise-template.actions';
import { ExerciseTemplate } from '@workout-tracker/models';
import { workoutExerciseTemplatesAppStateMock } from '../../+state/test/workoutExercisesStateMock/workoutExerciseTemplatesStateMock.mock';

describe('WorkoutExerciseTemplatesEffects', () => {
  let actions: Observable<Action>;
  let effects: WorkoutExerciseTemplatesEffects;
  let exerciseService: ExerciseTemplatesService
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
        WorkoutExerciseTemplatesEffects,
        { provide: ExerciseTemplatesService, useValue: exerciseTemplatesServiceMock },
        provideMockActions(() => actions),
        provideMockStore({
          initialState: {
            ...workoutExerciseTemplatesAppStateMock
          }
        }),
      ],
    });

    effects = TestBed.inject(WorkoutExerciseTemplatesEffects);
    exerciseService = TestBed.inject(ExerciseTemplatesService)
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

          actions = of(getUserExerciseTemplateDetailsRequest({ exerciseId: exerciseIdSut}))
        })
        it('should return getAuthenticatedUserExerciseDetailsRequest', async () => {
          const result = await firstValueFrom(effects.getUserExerciseTemplateDetailsRequest$)
          expect(result).toEqual(getAuthenticatedUserExerciseTemplateDetailsRequest({ exerciseId: exerciseIdSut}))
        })
      })

      describe('if non user', () => {
        beforeEach(() => {
          store.overrideSelector(getUser, undefined);
          store.refreshState()

          actions = of(getUserExerciseTemplateDetailsRequest({ exerciseId: exerciseIdSut}))
        })
        it('should return getAnonymousUserExerciseTemplatesRequest', async () => {
          const result = await firstValueFrom(effects.getUserExerciseTemplateDetailsRequest$)
          expect(result).toEqual(getAnonymousUserExerciseTemplateDetailsRequest({ exerciseId: exerciseIdSut }))
        })
      })

    })
  });

  describe('getAuthenticatedUserExerciseDetailsRequest$', () => {
    const exerciseIdSut = 'exerciseId test'
    const exerciseSut = { id: exerciseIdSut, name: 'exerciseNameTest0' } as ExerciseTemplate

    const user =  { uid: 'testUID'} as firebase.User

    describe('when getAuthenticatedUserExerciseDetailsRequest is dispatched', () => {
      beforeEach(() => {
        jest.spyOn(exerciseService, 'getExerciseTemplate').mockClear()

        store.resetSelectors()
        
        store.overrideSelector(getUser, user);
        store.refreshState()
      })
      describe('when exerciseService.getExerciseTemplate throws error', () => {
        const errorCodeMock = 'testing error code'
        const errorMock = { message: 'testing error message', code: errorCodeMock } as firebase.FirebaseError
        const errorResp = throwError(() => errorMock )

        beforeEach(() => {
          jest.spyOn(exerciseService, 'getExerciseTemplate').mockReturnValue(errorResp)
          actions = of(getAuthenticatedUserExerciseTemplateDetailsRequest( { exerciseId: exerciseIdSut}))
        })

        it('should request getExerciseTemplate', async () => {
          const getExerciseSpy = jest.spyOn(exerciseService, 'getExerciseTemplate')
          await firstValueFrom(effects.getAuthenticatedUserExerciseTemplateDetailsRequest$)
          expect(getExerciseSpy).toHaveBeenCalledWith(user.uid, exerciseIdSut)
        })
        it('should return getAuthenticatedUserExerciseDetailsRequestError', async () => {
          const result = await firstValueFrom(effects.getAuthenticatedUserExerciseTemplateDetailsRequest$)
          expect(result).toEqual(getAuthenticatedUserExerciseTemplateDetailsRequestError({ exerciseId: exerciseIdSut}))
        })
      })

      describe('when exercisesService.getExerciseTemplate success', () => {
        beforeEach(() => {
          jest.spyOn(exerciseService, 'getExerciseTemplate').mockReturnValue(of(exerciseSut))
          actions = of(getAuthenticatedUserExerciseTemplateDetailsRequest({exerciseId: exerciseIdSut}))
        })
        it('should request getExerciseTemplates', async () => {
          const getExercisesSpy = jest.spyOn(exerciseService, 'getExerciseTemplate')
          await firstValueFrom(effects.getAuthenticatedUserExerciseTemplateDetailsRequest$)
          expect(getExercisesSpy).toHaveBeenCalledWith(user.uid, exerciseIdSut)
        })
        it('should return getAuthenticatedUserExerciseDetailsRequestSuccess', async () => {
          const result = await firstValueFrom(effects.getAuthenticatedUserExerciseTemplateDetailsRequest$)
          expect(result).toEqual(getAuthenticatedUserExerciseTemplateDetailsRequestSuccess({ exercise: exerciseSut}))
        })
      })

    })
  });

  describe('getAnonymousUserExerciseDetailsRequest$', () => {
    describe('when getAnonymousUserExerciseDetailsRequest is dispatched', () => {
      const exerciseIdSut = 'exerciseId test'
      const exerciseSut = { id: exerciseIdSut, name: 'exerciseNameTest0' } as ExerciseTemplate  
      beforeEach(() => { 
        store.resetSelectors()
        store.refreshState()
        actions = of(getAnonymousUserExerciseTemplateDetailsRequest({ exerciseId: exerciseIdSut}))
      })

      describe('if exercise its stored into the created exercises (list)', () => {
        beforeEach(() => { 
          store.overrideSelector(getExerciseTemplatesListState, {
            list: [exerciseSut]
          } as ExerciseTemplatesListState);
          store.refreshState()
        })

        it('should return getAnonymousUserExerciseDetailsRequestSuccess', async () => {
          const result = await firstValueFrom(effects.getAnonymousUserExerciseTemplateDetailsRequest$)
          expect(result).toEqual(getAnonymousUserExerciseTemplateDetailsRequestSuccess({ exercise: exerciseSut}))
        })
      })
      describe('if exercise its not stored into  the created exercises (list)', () => {
        beforeEach(() => { 
          store.overrideSelector(getExerciseTemplatesListState, {
            list: [] as ExerciseTemplate[]
          } as ExerciseTemplatesListState);
          store.refreshState()
        })

        it('should return getAnonymousUserExerciseDetailsRequestError', async () => {
          const result = await firstValueFrom(effects.getAnonymousUserExerciseTemplateDetailsRequest$)
          expect(result).toEqual(getAnonymousUserExerciseTemplateDetailsRequestError({ exerciseId: exerciseIdSut}))
        })
      })
    })
  })
});
