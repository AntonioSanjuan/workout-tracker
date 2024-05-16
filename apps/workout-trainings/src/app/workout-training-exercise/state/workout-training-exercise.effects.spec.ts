import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable, firstValueFrom, of, throwError} from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import firebase from 'firebase/compat/app';
import { Training, TrainingExercise, TrainingExerciseSerie } from '@workout-tracker/models';
import { TrainingsService, trainingsServiceMock } from '@workout-tracker/services/trainings';
import { getUser, showError } from '@workout-tracker/shared-store';
import { workoutTrainingsAppStateMock } from '../../+state/test/workoutTrainingsStateMock/workoutTrainingsStateMock.mock';
import { TrainingExerciseEffects } from './workout-training-exercise.effects';
import { addAnonymousUserTrainingExerciseSerieRequest, addAnonymousUserTrainingExerciseSerieRequestSuccess, addAuthenticatedUserTrainingExerciseSerieRequest, addAuthenticatedUserTrainingExerciseSerieRequestError, addAuthenticatedUserTrainingExerciseSerieRequestSuccess, addUserTrainingExerciseSerieRequest, deleteAnonymousUserTrainingExerciseSerieRequest, deleteAnonymousUserTrainingExerciseSerieRequestSuccess, deleteAuthenticatedUserTrainingExerciseSerieRequest, deleteAuthenticatedUserTrainingExerciseSerieRequestError, deleteAuthenticatedUserTrainingExerciseSerieRequestSuccess, deleteUserTrainingExerciseSerieRequest, getAnonymousUserTrainingExerciseRequest, getAnonymousUserTrainingExerciseRequestError, getAnonymousUserTrainingExerciseRequestSuccess, getAuthenticatedUserTrainingExerciseRequest, getAuthenticatedUserTrainingExerciseRequestError, getAuthenticatedUserTrainingExerciseRequestSuccess, getUserTrainingExerciseRequest } from './workout-training-exercise.actions';
import { selectWorkoutTraining, selectWorkoutTrainingState } from '../../workout-training/state/workout-training.selectors';
import { selectWorkoutTrainingExerciseParentId, selectWorkoutTrainingExerciseState } from './workout-training-exercise.selectors';
import { WorkoutTrainingExerciseState } from './workout-training-exercise.reducer';

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

  describe('getAnonymousUserTrainingExerciseRequestError$', () => {
    const trainingExerciseIdSut = 'trainingExercise id test'
    describe('when getAnonymousUserTrainingExerciseRequestError is dispatched', () => {
      beforeEach(() => {
        actions = of(getAnonymousUserTrainingExerciseRequestError({ trainingExerciseId: trainingExerciseIdSut }))
      })

      it('should return showError', async () => {
        const result = await firstValueFrom(effects.getTrainingExerciseRequestError$)
        expect(result).toEqual(showError({ errorMessage: expect.anything()}))
      })
    })

    describe('when getAuthenticatedUserTrainingExerciseRequestError is dispatched', () => {
      beforeEach(() => {
        actions = of(getAuthenticatedUserTrainingExerciseRequestError({ trainingExerciseId: trainingExerciseIdSut }))
      })

      it('should return showError', async () => {
        const result = await firstValueFrom(effects.getTrainingExerciseRequestError$)
        expect(result).toEqual(showError({ errorMessage: expect.anything()}))
      })
    })
  })

  describe('deleteUserTrainingExerciseSerieRequest$', () => {    
    const trainingExerciseSerieSut = { id: 'trainingExerciseSerie id test'} as TrainingExerciseSerie
    describe('when deleteUserTrainingExerciseSerieRequest is dispatched', () => {
      beforeEach(() => {
        store.resetSelectors()
      })

      describe('if user', () => {
        const user =  { uid: 'testUID'} as firebase.User

        beforeEach(() => {
          store.overrideSelector(getUser, user);
          store.refreshState()

          actions = of(deleteUserTrainingExerciseSerieRequest({ trainingExerciseSerie: trainingExerciseSerieSut }))
        })
        it('should return deleteAuthenticatedUserTrainingExerciseSerieRequest', async () => {
          const result = await firstValueFrom(effects.deleteUserTrainingExerciseSerieRequest$)
          expect(result).toEqual(deleteAuthenticatedUserTrainingExerciseSerieRequest({ trainingExerciseSerie: trainingExerciseSerieSut }))
        })
      })

      describe('if non user', () => {
        beforeEach(() => {
          store.overrideSelector(getUser, undefined);
          store.refreshState()

          actions = of(deleteUserTrainingExerciseSerieRequest({ trainingExerciseSerie: trainingExerciseSerieSut }))
        })
        it('should return deleteAnonymousUserTrainingExerciseSerieRequest', async () => {
          const result = await firstValueFrom(effects.deleteUserTrainingExerciseSerieRequest$)
          expect(result).toEqual(deleteAnonymousUserTrainingExerciseSerieRequest({ trainingExerciseSerie: trainingExerciseSerieSut }))
        })
      })

    })
  });
  describe('deleteAuthenticatedUserTrainingExerciseSerieRequest$', () => {
    const trainingExerciseSerieSut = { id: 'trainingExerciseSerie id test'} as TrainingExerciseSerie

    const user =  { uid: 'testUID'} as firebase.User
    const workoutTrainingExerciseState = { trainingId: 'trainingId test', trainingExercise: { id: 'trainingExercise id test' }} as WorkoutTrainingExerciseState
    describe('when deleteAuthenticatedUserTrainingExerciseSerieRequest is dispatched', () => {
      beforeEach(() => {
        jest.spyOn(trainingService, 'deleteTrainingExerciseSerie').mockClear()

        store.resetSelectors()
        
        store.overrideSelector(getUser, user);
        store.overrideSelector(selectWorkoutTrainingExerciseState, workoutTrainingExerciseState)
        store.refreshState()
      })
      describe('when trainingService.deleteTrainingExerciseSerie throws error', () => {
        const errorCodeMock = 'testing error code'
        const errorMock = { message: 'testing error message', code: errorCodeMock } as firebase.FirebaseError
        const errorResp = throwError(() => errorMock )

        beforeEach(() => {
          jest.spyOn(trainingService, 'deleteTrainingExerciseSerie').mockReturnValue(errorResp)
          actions = of(deleteAuthenticatedUserTrainingExerciseSerieRequest( { trainingExerciseSerie: trainingExerciseSerieSut }))
        })

        it('should request deleteTrainingExerciseSerie', async () => {
          const deleteTrainingExerciseSerieSpy = jest.spyOn(trainingService, 'deleteTrainingExerciseSerie')
          await firstValueFrom(effects.deleteAuthenticatedUserTrainingExerciseSerieRequest$)
          expect(deleteTrainingExerciseSerieSpy).toHaveBeenCalledWith(user.uid, workoutTrainingExerciseState.trainingId, workoutTrainingExerciseState.trainingExercise?.id, trainingExerciseSerieSut)
        })
        it('should return deleteAuthenticatedUserTrainingExerciseSerieRequestError', async () => {
          const result = await firstValueFrom(effects.deleteAuthenticatedUserTrainingExerciseSerieRequest$)
          expect(result).toEqual(deleteAuthenticatedUserTrainingExerciseSerieRequestError())
        })
      })

      describe('when trainingService.deleteTrainingExerciseSerie success', () => {
        beforeEach(() => {
          jest.spyOn(trainingService, 'deleteTrainingExerciseSerie').mockReturnValue(of(true))
          actions = of(deleteAuthenticatedUserTrainingExerciseSerieRequest({trainingExerciseSerie: trainingExerciseSerieSut}))
        })
        it('should request deleteTrainingExerciseSerie', async () => {
          const deleteTrainingExerciseSerieSpy = jest.spyOn(trainingService, 'deleteTrainingExerciseSerie')
          await firstValueFrom(effects.deleteAuthenticatedUserTrainingExerciseSerieRequest$)
          expect(deleteTrainingExerciseSerieSpy).toHaveBeenCalledWith(user.uid,  workoutTrainingExerciseState.trainingId, workoutTrainingExerciseState.trainingExercise?.id, trainingExerciseSerieSut)
        })
        it('should return deleteAuthenticatedUserTrainingExerciseSerieRequestSuccess', async () => {
          const result = await firstValueFrom(effects.deleteAuthenticatedUserTrainingExerciseSerieRequest$)
          expect(result).toEqual(deleteAuthenticatedUserTrainingExerciseSerieRequestSuccess({ trainingExerciseSerie: trainingExerciseSerieSut }))
        })
      })

    })
  });

  describe('deleteAnonymousUserTrainingExerciseSerieRequest$', () => {
    describe('when deleteAnonymousUserTrainingExerciseSerieRequest is dispatched', () => {
      const trainingExerciseSerieSut = { id: 'trainingExerciseSerie id test'} as TrainingExerciseSerie

      const workoutTrainingExerciseState = { trainingId: 'trainingId test', trainingExercise: { id: 'trainingExercise id test' }} as WorkoutTrainingExerciseState

      beforeEach(() => { 
        store.overrideSelector(selectWorkoutTrainingExerciseState, workoutTrainingExerciseState)

        store.refreshState()
      })

      describe('should return deleteAnonymousUserTrainingExerciseSerieRequestSuccess', () => {
        beforeEach(() => {
          actions = of(deleteAnonymousUserTrainingExerciseSerieRequest({ trainingExerciseSerie: trainingExerciseSerieSut }))
        })

        it('should return deleteAnonymousUserTrainingExerciseSerieRequest', async () => {
          const result = await firstValueFrom(effects.deleteAnonymousUserTrainingExerciseSerieRequest$)
          expect(result).toEqual(deleteAnonymousUserTrainingExerciseSerieRequestSuccess({ trainingExerciseSerie: trainingExerciseSerieSut }))
        })
      })
    })
  })

  describe('deletUserTrainingExerciseSerieRequestError$', () => {
    describe('when deleteAuthenticatedUserTrainingExerciseSerieRequestError is dispatched', () => {
      beforeEach(() => {
        actions = of(deleteAuthenticatedUserTrainingExerciseSerieRequestError())
      })

      it('should return showError', async () => {
        const result = await firstValueFrom(effects.deletUserTrainingExerciseSerieRequestError$)
        expect(result).toEqual(showError({ errorMessage: expect.anything()}))
      })
    })
  })

  describe('addUserTrainingExerciseSerieRequest$', () => {    
    const trainingExerciseSerieSut = { id: 'trainingExerciseSerie id test'} as TrainingExerciseSerie
    describe('when addUserTrainingExerciseSerieRequest is dispatched', () => {
      beforeEach(() => {
        store.resetSelectors()
      })

      describe('if user', () => {
        const user =  { uid: 'testUID'} as firebase.User

        beforeEach(() => {
          store.overrideSelector(getUser, user);
          store.refreshState()

          actions = of(addUserTrainingExerciseSerieRequest({ trainingExerciseSerie: trainingExerciseSerieSut }))
        })
        it('should return addAuthenticatedUserTrainingExerciseSerieRequest', async () => {
          const result = await firstValueFrom(effects.addUserTrainingExerciseSerieRequest$)
          expect(result).toEqual(addAuthenticatedUserTrainingExerciseSerieRequest({ trainingExerciseSerie: trainingExerciseSerieSut }))
        })
      })

      describe('if non user', () => {
        beforeEach(() => {
          store.overrideSelector(getUser, undefined);
          store.refreshState()

          actions = of(addUserTrainingExerciseSerieRequest({ trainingExerciseSerie: trainingExerciseSerieSut }))
        })
        it('should return addAnonymousUserTrainingExerciseSerieRequest', async () => {
          const result = await firstValueFrom(effects.addUserTrainingExerciseSerieRequest$)
          expect(result).toEqual(addAnonymousUserTrainingExerciseSerieRequest({ trainingExerciseSerie: trainingExerciseSerieSut }))
        })
      })

    })
  });
  describe('addAuthenticatedUserTrainingExerciseSerieRequest$', () => {
    const trainingExerciseSerieSut = { id: 'trainingExerciseSerie id test'} as TrainingExerciseSerie

    const user =  { uid: 'testUID'} as firebase.User
    const workoutTrainingExerciseState = { trainingId: 'trainingId test', trainingExercise: { id: 'trainingExercise id test' }} as WorkoutTrainingExerciseState
    describe('when addAuthenticatedUserTrainingExerciseSerieRequest is dispatched', () => {
      beforeEach(() => {
        jest.spyOn(trainingService, 'setTrainingExerciseSerie').mockClear()

        store.resetSelectors()
        
        store.overrideSelector(getUser, user);
        store.overrideSelector(selectWorkoutTrainingExerciseState, workoutTrainingExerciseState)
        store.refreshState()
      })
      describe('when trainingService.setTrainingExerciseSerie throws error', () => {
        const errorCodeMock = 'testing error code'
        const errorMock = { message: 'testing error message', code: errorCodeMock } as firebase.FirebaseError
        const errorResp = throwError(() => errorMock )

        beforeEach(() => {
          jest.spyOn(trainingService, 'setTrainingExerciseSerie').mockReturnValue(errorResp)
          actions = of(addAuthenticatedUserTrainingExerciseSerieRequest( { trainingExerciseSerie: trainingExerciseSerieSut }))
        })

        it('should request setTrainingExerciseSerie', async () => {
          const setTrainingExerciseSerieSpy = jest.spyOn(trainingService, 'setTrainingExerciseSerie')
          await firstValueFrom(effects.addAuthenticatedUserTrainingExerciseSerieRequest$)
          expect(setTrainingExerciseSerieSpy).toHaveBeenCalledWith(user.uid, workoutTrainingExerciseState.trainingId, workoutTrainingExerciseState.trainingExercise?.id, trainingExerciseSerieSut)
        })
        it('should return addAuthenticatedUserTrainingExerciseSerieRequestError', async () => {
          const result = await firstValueFrom(effects.addAuthenticatedUserTrainingExerciseSerieRequest$)
          expect(result).toEqual(addAuthenticatedUserTrainingExerciseSerieRequestError())
        })
      })

      describe('when trainingService.setTrainingExerciseSerie success', () => {
        beforeEach(() => {
          jest.spyOn(trainingService, 'setTrainingExerciseSerie').mockReturnValue(of(trainingExerciseSerieSut))
          actions = of(addAuthenticatedUserTrainingExerciseSerieRequest({trainingExerciseSerie: trainingExerciseSerieSut}))
        })
        it('should request deleteTrainingExerciseSerie', async () => {
          const deleteTrainingExerciseSerieSpy = jest.spyOn(trainingService, 'deleteTrainingExerciseSerie')
          await firstValueFrom(effects.addAuthenticatedUserTrainingExerciseSerieRequest$)
          expect(deleteTrainingExerciseSerieSpy).toHaveBeenCalledWith(user.uid,  workoutTrainingExerciseState.trainingId, workoutTrainingExerciseState.trainingExercise?.id, trainingExerciseSerieSut)
        })
        it('should return addAuthenticatedUserTrainingExerciseSerieRequestSuccess', async () => {
          const result = await firstValueFrom(effects.addAuthenticatedUserTrainingExerciseSerieRequest$)
          expect(result).toEqual(addAuthenticatedUserTrainingExerciseSerieRequestSuccess({ trainingExerciseSerie: trainingExerciseSerieSut }))
        })
      })

    })
  });

  describe('addAnonymousUserTrainingExerciseSerieRequest$', () => {
    describe('when addAnonymousUserTrainingExerciseSerieRequest is dispatched', () => {
      const trainingExerciseSerieSut = { id: 'trainingExerciseSerie id test'} as TrainingExerciseSerie

      const workoutTrainingExerciseState = { trainingId: 'trainingId test', trainingExercise: { id: 'trainingExercise id test' }} as WorkoutTrainingExerciseState

      beforeEach(() => { 
        store.overrideSelector(selectWorkoutTrainingExerciseState, workoutTrainingExerciseState)

        store.refreshState()
      })

      describe('should return addAnonymousUserTrainingExerciseSerieRequestSuccess', () => {
        beforeEach(() => {
          actions = of(addAnonymousUserTrainingExerciseSerieRequest({ trainingExerciseSerie: trainingExerciseSerieSut }))
        })

        it('should return addAnonymousUserTrainingExerciseSerieRequestSuccess', async () => {
          const result = await firstValueFrom(effects.addAnonymousUserTrainingExerciseSerieRequest$)
          expect(result).toEqual(addAnonymousUserTrainingExerciseSerieRequestSuccess({ trainingExerciseSerie: trainingExerciseSerieSut }))
        })
      })
    })
  })

  describe('addUserTrainingExerciseSerieRequestError$', () => {
    describe('when addUserTrainingExerciseSerieRequestError is dispatched', () => {
      beforeEach(() => {
        actions = of(addAuthenticatedUserTrainingExerciseSerieRequestError())
      })

      it('should return showError', async () => {
        const result = await firstValueFrom(effects.addUserTrainingExerciseSerieRequestError$)
        expect(result).toEqual(showError({ errorMessage: expect.anything()}))
      })
    })
  })
});
