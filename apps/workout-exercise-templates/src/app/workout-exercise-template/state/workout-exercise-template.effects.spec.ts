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
import { ExerciseTemplatesListState, TrainingsListState, getExerciseTemplatesListState, getTrainingsListState, getUser } from '@workout-tracker/shared-store';
import { getAnonymousUserExerciseTemplateDetailsRequest, getAnonymousUserExerciseTemplateDetailsRequestError, getAnonymousUserExerciseTemplateDetailsRequestSuccess, getAnonymousUserExerciseTemplateTrainingsDetailsRequest, getAnonymousUserExerciseTemplateTrainingsDetailsRequestError, getAnonymousUserExerciseTemplateTrainingsDetailsRequestSuccess, getAuthenticatedUserExerciseTemplateDetailsRequest, getAuthenticatedUserExerciseTemplateDetailsRequestError, getAuthenticatedUserExerciseTemplateDetailsRequestSuccess, getAuthenticatedUserExerciseTemplateTrainingsDetailsRequest, getAuthenticatedUserExerciseTemplateTrainingsDetailsRequestError, getAuthenticatedUserExerciseTemplateTrainingsDetailsRequestSuccess, getUserExerciseTemplateDetailsRequest } from './workout-exercise-template.actions';
import { ExerciseTemplate, Training, TrainingExercise } from '@workout-tracker/models';
import { workoutExerciseTemplatesAppStateMock } from '../../+state/test/workoutExercisesStateMock/workoutExerciseTemplatesStateMock.mock';
import { TrainingsService, trainingsServiceMock } from '@workout-tracker/services/trainings';
import { trainingsListStateMock } from '@workout-tracker/test';

describe('WorkoutExerciseTemplatesEffects', () => {
  let actions: Observable<Action>;
  let effects: WorkoutExerciseTemplatesEffects;
  let exerciseService: ExerciseTemplatesService
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
        WorkoutExerciseTemplatesEffects,
        { provide: ExerciseTemplatesService, useValue: exerciseTemplatesServiceMock },
        { provide: TrainingsService, useValue: trainingsServiceMock },
        provideMockActions(() => actions),
        provideMockStore({
          initialState: {
            ...workoutExerciseTemplatesAppStateMock,
            ...trainingsListStateMock
          }
        }),
      ],
    });

    effects = TestBed.inject(WorkoutExerciseTemplatesEffects);
    exerciseService = TestBed.inject(ExerciseTemplatesService)
    trainingService = TestBed.inject(TrainingsService)
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

  describe('getExerciseTemplateTrainingsDetailsRequest$', () => {    
    const exerciseIdSut = 'exerciseId test'
    describe('when getUserExerciseTemplateDetailsRequest is dispatched', () => {
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
        it('should return getAuthenticatedUserExerciseTemplateTrainingsDetailsRequest', async () => {
          const result = await firstValueFrom(effects.getExerciseTemplateTrainingsDetailsRequest$)
          expect(result).toEqual(getAuthenticatedUserExerciseTemplateTrainingsDetailsRequest({ exerciseTemplateId: exerciseIdSut}))
        })
      })

      describe('if non user', () => {
        beforeEach(() => {
          store.overrideSelector(getUser, undefined);
          store.refreshState()

          actions = of(getUserExerciseTemplateDetailsRequest({ exerciseId: exerciseIdSut}))
        })
        it('should return getAnonymousUserExerciseTemplateTrainingsDetailsRequest', async () => {
          const result = await firstValueFrom(effects.getExerciseTemplateTrainingsDetailsRequest$)
          expect(result).toEqual(getAnonymousUserExerciseTemplateTrainingsDetailsRequest({ exerciseTemplateId: exerciseIdSut }))
        })
      })

    })
  });

  describe('getAuthenticatedUserExerciseTemplateTrainingsDetailsRequest$', () => {
    const exerciseTemplateIdSut = 'exerciseTemplateId test'
    const trainingsSut = [ { trainingExercises: [ { id: '', exerciseTemplate: { id: exerciseTemplateIdSut } as ExerciseTemplate, series: []} ] as TrainingExercise[] } as Training]

    const user =  { uid: 'testUID'} as firebase.User

    describe('when getAuthenticatedUserExerciseTemplateTrainingsDetailsRequest is dispatched', () => {
      beforeEach(() => {
        jest.spyOn(trainingService, 'getExerciseTemplateTrainingExercises').mockClear()

        store.resetSelectors()
        
        store.overrideSelector(getUser, user);
        store.refreshState()
      })
      describe('when trainingService.getExerciseTemplateTrainingExercises throws error', () => {
        const errorCodeMock = 'testing error code'
        const errorMock = { message: 'testing error message', code: errorCodeMock } as firebase.FirebaseError
        const errorResp = throwError(() => errorMock )

        beforeEach(() => {
          jest.spyOn(trainingService, 'getExerciseTemplateTrainingExercises').mockReturnValue(errorResp)
          actions = of(getAuthenticatedUserExerciseTemplateTrainingsDetailsRequest( { exerciseTemplateId: exerciseTemplateIdSut}))
        })

        it('should request getExerciseTemplateTrainingExercises', async () => {
          const getExerciseSpy = jest.spyOn(trainingService, 'getExerciseTemplateTrainingExercises')
          await firstValueFrom(effects.getAuthenticatedUserExerciseTemplateTrainingsDetailsRequest$)
          expect(getExerciseSpy).toHaveBeenCalledWith(user.uid, exerciseTemplateIdSut)
        })
        it('should return getAuthenticatedUserExerciseTemplateTrainingsDetailsRequestError', async () => {
          const result = await firstValueFrom(effects.getAuthenticatedUserExerciseTemplateTrainingsDetailsRequest$)
          expect(result).toEqual(getAuthenticatedUserExerciseTemplateTrainingsDetailsRequestError({ exerciseTemplateId: exerciseTemplateIdSut}))
        })
      })

      describe('when trainingService.getExerciseTemplateTrainingExercises success', () => {
        beforeEach(() => {
          jest.spyOn(trainingService, 'getExerciseTemplateTrainingExercises').mockReturnValue(of(trainingsSut))
          actions = of(getAuthenticatedUserExerciseTemplateTrainingsDetailsRequest({exerciseTemplateId: exerciseTemplateIdSut}))
        })
        it('should request getExerciseTemplates', async () => {
          const getExercisesSpy = jest.spyOn(trainingService, 'getExerciseTemplateTrainingExercises')
          await firstValueFrom(effects.getAuthenticatedUserExerciseTemplateTrainingsDetailsRequest$)
          expect(getExercisesSpy).toHaveBeenCalledWith(user.uid, exerciseTemplateIdSut)
        })
        it('should return getAuthenticatedUserExerciseTemplateTrainingsDetailsRequestSuccess', async () => {
          const result = await firstValueFrom(effects.getAuthenticatedUserExerciseTemplateTrainingsDetailsRequest$)
          expect(result).toEqual(getAuthenticatedUserExerciseTemplateTrainingsDetailsRequestSuccess({ trainings: trainingsSut}))
        })
      })

    })
  });

  describe('getAnonymousUserExerciseTemplateTrainingsDetailsRequest$', () => {
    describe('when getAnonymousUserExerciseTemplateTrainingsDetailsRequest is dispatched', () => {
      const exerciseTemplateIdSut = 'exerciseTemplateId test'
      beforeEach(() => { 
        store.resetSelectors()
        store.refreshState()
        actions = of(getAnonymousUserExerciseTemplateTrainingsDetailsRequest({ exerciseTemplateId: exerciseTemplateIdSut}))
      })

      describe('if some trainings with defined trainingExercises has as exerciseTemplate the requested exerciseTemplate details', () => {
        const trainingsSut =  [ { id: '', trainingExercises: [ { id: '', exerciseTemplate: { id: exerciseTemplateIdSut } as ExerciseTemplate, series: []} ] as TrainingExercise[] } as Training]
        
        beforeEach(() => { 
          store.overrideSelector(getTrainingsListState, {
            list: trainingsSut
          } as TrainingsListState);
          store.refreshState()
        })

        it('should return getAnonymousUserExerciseTemplateTrainingsDetailsRequestSuccess', async () => {
          const result = await firstValueFrom(effects.getAnonymousUserExerciseTemplateTrainingsDetailsRequest$)
          expect(result).toEqual(getAnonymousUserExerciseTemplateTrainingsDetailsRequestSuccess({ trainings: trainingsSut}))
        })
      })
      describe('if no one trainings with defined trainingExercises has as exerciseTemplate the requested exerciseTemplate details', () => {
        const trainingsSut =  [] as Training[]
        
        beforeEach(() => { 
          store.overrideSelector(getTrainingsListState, {
            list: trainingsSut
          } as TrainingsListState);
          store.refreshState()
        })

        it('should return getAnonymousUserExerciseTemplateTrainingsDetailsRequestSuccess', async () => {
          const result = await firstValueFrom(effects.getAnonymousUserExerciseTemplateTrainingsDetailsRequest$)
          expect(result).toEqual(getAnonymousUserExerciseTemplateTrainingsDetailsRequestSuccess({ trainings: trainingsSut}))
        })
      })
    })
  })
});
