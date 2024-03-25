import { TestBed } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { Observable, firstValueFrom, of, throwError } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { Actions } from '@ngrx/effects';
import firebase from 'firebase/compat/app';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { userStateMock } from '@workout-tracker/test';
import { Exercise, Training, TrainingExercise } from '@workout-tracker/models';
import { getUser } from '../user';
import { TrainingsEffects } from './trainings.effects'
import { getTrainingsList } from './trainings.selectors';
import { AppInit, loadedApp } from '../ui';
import { TrainingsService, trainingsServiceMock } from '@workout-tracker/services/trainings';
import { addAnonymousUserTrainingRequest, addAnonymousUserTrainingRequestSuccess, addAuthenticatedUserTrainingRequest, addAuthenticatedUserTrainingRequestError, addAuthenticatedUserTrainingRequestSuccess, addUserTrainingRequest, getAnonymousUserTrainingsRequest, getAnonymousUserTrainingsRequestSuccess, getAuthenticatedUserTrainingsRequest, getAuthenticatedUserTrainingsRequestError, getAuthenticatedUserTrainingsRequestSuccess, getUserTrainingsRequest } from './trainings.actions';

const trainingSut = {
  id: 'trainingIdTest',
  observations: undefined,
  creationDate: new Date(),
  finishDate: undefined,
  trainingExercises: [
    { exerciseTemplate: { name: ''} as Exercise} as TrainingExercise
  ]
} as Training

describe('TrainingsEffects', () => {
  let actions: Observable<Action>;
  let effects: TrainingsEffects
  let trainingService: TrainingsService
  let store: MockStore

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      providers: [ 
        { provide: TrainingsService, useValue: trainingsServiceMock },
        TrainingsEffects,
        provideMockStore({
          initialState: userStateMock
        }),
        provideMockActions(() => actions),
      ],
    });

    effects = TestBed.inject(TrainingsEffects);
    actions = TestBed.inject(Actions)
    store = TestBed.inject(MockStore)
    trainingService = TestBed.inject(TrainingsService)
  });

  describe('getUserTrainingsRequest$', () => {    
    describe('when getUserTrainingsRequest is dispatched', () => {
      beforeEach(() => {
        store.resetSelectors()
      })

      describe('if user', () => {
        const user =  { uid: 'testUID'} as firebase.User

        beforeEach(() => {
          store.overrideSelector(getUser, user);
          store.refreshState()

          actions = of(getUserTrainingsRequest())
        })
        it('should return getAuthenticatedUserTrainingsRequest', async () => {
          const result = await firstValueFrom(effects.getUserTrainingsRequest$)
          expect(result).toEqual(getAuthenticatedUserTrainingsRequest())
        })
      })

      describe('if non user', () => {
        beforeEach(() => {
          store.overrideSelector(getUser, undefined);
          store.refreshState()

          actions = of(getUserTrainingsRequest())
        })
        it('should return getAnonymousUserTrainingsRequest', async () => {
          const result = await firstValueFrom(effects.getUserTrainingsRequest$)
          expect(result).toEqual(getAnonymousUserTrainingsRequest())
        })
      })

    })
  });

  describe('getAuthenticatedUserTrainingsRequest$', () => {
    const trainingSut = [{ id: 'trainingIdTest0' }, { id: 'trainingIdTest1' }] as Training[]

    const user =  { uid: 'testUID'} as firebase.User

    describe('when getAuthenticatedUserTrainingsRequest is dispatched', () => {
      beforeEach(() => {
        jest.spyOn(trainingService, 'getTrainings').mockClear()

        store.resetSelectors()
        
        store.overrideSelector(getUser, user);
        store.refreshState()
      })
      describe('when trainingService.getTrainings throws error', () => {
        const errorCodeMock = 'testing error code'
        const errorMock = { message: 'testing error message', code: errorCodeMock } as firebase.FirebaseError
        const errorResp = throwError(() => errorMock )

        beforeEach(() => {
          jest.spyOn(trainingService, 'getTrainings').mockReturnValue(errorResp)
          actions = of(getAuthenticatedUserTrainingsRequest())
        })

        it('should request getTrainings', async () => {
          const getTrainingsSpy = jest.spyOn(trainingService, 'getTrainings')
          await firstValueFrom(effects.getAuthenticatedUserTrainingsRequest$)
          expect(getTrainingsSpy).toHaveBeenCalledWith(user.uid)
        })
        it('should return getAuthenticatedUserTrainingsRequestError', async () => {
          const result = await firstValueFrom(effects.getAuthenticatedUserTrainingsRequest$)
          expect(result).toEqual(getAuthenticatedUserTrainingsRequestError({ error: errorMock}))
        })
      })

      describe('when trainingService.getTrainings success', () => {
        beforeEach(() => {
          jest.spyOn(trainingService, 'getTrainings').mockReturnValue(of(trainingSut))
          actions = of(getAuthenticatedUserTrainingsRequest())
        })
        it('should request getTrainings', async () => {
          const getTrainingsSpy = jest.spyOn(trainingService, 'getTrainings')
          await firstValueFrom(effects.getAuthenticatedUserTrainingsRequest$)
          expect(getTrainingsSpy).toHaveBeenCalledWith(user.uid)
        })
        it('should return getAuthenticatedUserTrainingsRequestSuccess', async () => {
          const result = await firstValueFrom(effects.getAuthenticatedUserTrainingsRequest$)
          expect(result).toEqual(getAuthenticatedUserTrainingsRequestSuccess({ trainings: trainingSut}))
        })
      })

    })
  });

  describe('getAnonymousUserTrainingsRequest$', () => {
    describe('when getAnonymousUserTrainingsRequest is dispatched', () => {
      const trainingSut = [{ id: 'trainingIdTest0' }, { id: 'trainingIdTest1' }] as Training[]

  
      beforeEach(() => { 
        store.resetSelectors()
        
        store.overrideSelector(getTrainingsList, trainingSut);
        store.refreshState()
      
        actions = of(getAnonymousUserTrainingsRequest())

      })
      it('should return getAnonymousUserTrainingsRequestSuccess', async () => {
        const result = await firstValueFrom(effects.getAnonymousUserTrainingsRequest$)
        expect(result).toEqual(getAnonymousUserTrainingsRequestSuccess({ trainings: trainingSut}))
      })
    })
  })
  
  describe('getUserTrainingsSuccess$', () => {
    describe('when getAuthenticatedUserTrainingsRequestSuccess is dispatched', () => {
      beforeEach(() => { 
        actions = of(getAuthenticatedUserTrainingsRequestSuccess({ trainings: []}))
      })

      it('should return loadedApp', async () => {
        const result = await firstValueFrom(effects.getUserTrainingsSuccess$)
        expect(result).toEqual(loadedApp({initialized: AppInit.TRAININGS}))
      })
    })

    describe('when getAnonymousUserTrainingsRequestSuccess is dispatched', () => {
      beforeEach(() => { 
        actions = of(getAnonymousUserTrainingsRequestSuccess({ trainings: []}))
      })

      it('should return loadedApp', async () => {
        const result = await firstValueFrom(effects.getUserTrainingsSuccess$)
        expect(result).toEqual(loadedApp({initialized: AppInit.TRAININGS}))
      })
    })
  });

  describe('addUserTrainingRequest$', () => {
    describe('when addUserTrainingRequest is dispatched', () => {
      const user =  { uid: 'testUID'} as firebase.User
  
      describe('if user', () => {

        beforeEach(() => { 
          store.overrideSelector(getUser, user);
          actions = of(addUserTrainingRequest({
            training: trainingSut
          }))
          
        })

        it('should return addAuthenticatedUserTrainingRequest', async () => {
          const result = await firstValueFrom(effects.addUserTrainingRequest$)
          expect(result).toEqual(addAuthenticatedUserTrainingRequest({ training: trainingSut}))
        })


      })
  
      describe('if its not user stored', () => {
        beforeEach(() => { 
          store.overrideSelector(getUser, undefined);
          actions = of(addUserTrainingRequest({
            training: trainingSut
          }))
        })
        it('should return addAnonymousUserTrainingRequest', async () => {
          const result = await firstValueFrom(effects.addUserTrainingRequest$)
          expect(result).toEqual(addAnonymousUserTrainingRequest({ training: trainingSut}))
        })
      })
    })
  })
  describe('addAuthenticatedUserTrainingRequest$', () => {
    const user =  { uid: 'testUID'} as firebase.User
    
    beforeEach(() => { 
      jest.spyOn(trainingService, 'setTraining').mockReset()
      store.overrideSelector(getUser, user);
      jest.spyOn(trainingService, 'setTraining').mockReturnValue(of(trainingSut))
      actions = of(addAuthenticatedUserTrainingRequest({
        training: trainingSut
      }))
      
    })
    describe('when trainingService.setTraining success', () => {
      beforeEach(() => {
        jest.spyOn(trainingService, 'setTraining').mockReturnValue(of(trainingSut))
      })
      it('should request setExercises', async () => {
        const setExerciseSpy = jest.spyOn(trainingService, 'setTraining')
        await firstValueFrom(effects.addAuthenticatedUserTrainingRequest$)
        expect(setExerciseSpy).toHaveBeenCalledWith(user.uid, trainingSut)
      })
      it('should return addAuthenticatedUserTrainingRequestSuccess', async () => {
        const result = await firstValueFrom(effects.addAuthenticatedUserTrainingRequest$)
        expect(result).toEqual(addAuthenticatedUserTrainingRequestSuccess({ training: trainingSut}))
      })
    })

    describe('when trainingService.setTraining throws error', () => {
      const errorCodeMock = 'testing error code'
      const errorMock = { message: 'testing error message', code: errorCodeMock } as firebase.FirebaseError
      const errorResp = throwError(() => errorMock )

      beforeEach(() => {
        jest.spyOn(trainingService, 'setTraining').mockReturnValue(errorResp)
      })

      it('should request setTraining', async () => {
        const setExerciseSpy = jest.spyOn(trainingService, 'setTraining')
        await firstValueFrom(effects.addAuthenticatedUserTrainingRequest$)
        expect(setExerciseSpy).toHaveBeenCalledWith(user.uid, trainingSut)
      })
      
      it('should return addAuthenticatedUserTrainingRequestError', async () => {
        const result = await firstValueFrom(effects.addAuthenticatedUserTrainingRequest$)
        expect(result).toEqual(addAuthenticatedUserTrainingRequestError({ error: errorMock}))
      })
    })
  })

  describe('addAnonymousUserTrainingRequest$', () => {
    const exerciseListSut = [{}, {}, {}]
    beforeEach(() => { 
      jest.spyOn(trainingService, 'setTraining').mockReset()
      store.overrideSelector(getTrainingsList, exerciseListSut as Exercise[]);
      jest.spyOn(trainingService, 'setTraining').mockReturnValue(of(trainingSut))
      actions = of(addAnonymousUserTrainingRequest({
        training: trainingSut
      }))
    })
    it('should not request setTraining', async () => {
      const setExerciseSpy = jest.spyOn(trainingService, 'setTraining')
      await firstValueFrom(effects.addAnonymousUserTrainingRequest$)
      expect(setExerciseSpy).not.toHaveBeenCalled()
    })
    it('should return addAnonymousUserTrainingRequestSuccess', async () => {
      const result = await firstValueFrom(effects.addAnonymousUserTrainingRequest$)
      expect(result).toEqual(addAnonymousUserTrainingRequestSuccess({ training: {...trainingSut, id: (exerciseListSut.length + 1).toString()}}))
    })
  })
});
