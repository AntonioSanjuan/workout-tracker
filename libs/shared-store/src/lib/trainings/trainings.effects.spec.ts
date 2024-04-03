import { TestBed } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { EMPTY, Observable, firstValueFrom, of, throwError } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { Actions } from '@ngrx/effects';
import firebase from 'firebase/compat/app';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { userStateMock, trainingsStateMock } from '@workout-tracker/test';
import { Exercise, Training, TrainingExercise, TrainingQueryFilters } from '@workout-tracker/models';
import { getUser } from '../user';
import { TrainingsEffects } from './trainings.effects'
import { getTrainingOngoing, getTrainingsList } from './trainings.selectors';
import { AppInit, loadedApp } from '../ui';
import { TrainingsService, trainingsServiceMock } from '@workout-tracker/services/trainings';
import { addAnonymousUserTrainingRequest, addAnonymousUserTrainingRequestSuccess, addAuthenticatedUserTrainingRequest, addAuthenticatedUserTrainingRequestError, addAuthenticatedUserTrainingRequestSuccess, addUserTrainingRequest, getAnonymousUserTrainingsRequest, getAnonymousUserTrainingsRequestSuccess, getAuthenticatedUserTrainingsRequest, getAuthenticatedUserTrainingsRequestError, getAuthenticatedUserTrainingsRequestSuccess, getUserTrainingsRequest, setTrainingQueryFilter, updateAnonymousUserTrainingRequest, updateAnonymousUserTrainingRequestSuccess, updateAuthenticatedUserTrainingRequest, updateAuthenticatedUserTrainingRequestError, updateAuthenticatedUserTrainingRequestSuccess, updateUserTrainingRequest } from './trainings.actions';

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
          initialState: {
            ...userStateMock,
            ...trainingsStateMock
          }
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

    //
    describe('when setTrainingQueryFilter is dispatched', () => {
      const filters = {
        betweenDates: {
          fromDate: new Date(),
          toDate: new Date()
        }
      } as TrainingQueryFilters
      beforeEach(() => {
        store.resetSelectors()
      })

      describe('if user', () => {
        const user =  { uid: 'testUID'} as firebase.User

        beforeEach(() => {
          store.overrideSelector(getUser, user);
          store.refreshState()

          actions = of(setTrainingQueryFilter({ filters: filters}))
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

          actions = of(setTrainingQueryFilter({ filters: filters}))
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
          expect(getTrainingsSpy).toHaveBeenCalledWith(user.uid, expect.anything())
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
          expect(getTrainingsSpy).toHaveBeenCalledWith(user.uid, expect.anything())
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

  describe('finishUserTrainingOnGoingRequest$', () => {
    describe('when addUserTrainingRequest is dispatched', () => {
      const trainingOnGoint =  { id: 'trainingOnGoingId', finishDate: undefined} as Training
  
      describe('if training on going (not finished)', () => {

        beforeEach(() => { 
          store.overrideSelector(getTrainingOngoing, trainingOnGoint);
          actions = of(addUserTrainingRequest({
            training: trainingSut
          }))
          
        })

        it('should return updateAuthenticatedUserTrainingRequest', async () => {
          const result = await firstValueFrom(effects.finishUserTrainingOnGoingRequest$)
          expect(result).toEqual(updateAuthenticatedUserTrainingRequest({ training: {...trainingOnGoint, finishDate: new Date()}}))
        })


      })
  
      describe('if its not training on going (not finished)', () => {
        beforeEach(() => { 
          store.overrideSelector(getTrainingOngoing, undefined);
          actions = of(addUserTrainingRequest({
            training: trainingSut
          }))
        })
        it('should return nothing', async () => {
          effects.finishUserTrainingOnGoingRequest$.subscribe(result => {
            expect(result).toBeUndefined();
          });
        })
      })
    })
  })

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
      store.overrideSelector(getTrainingsList, exerciseListSut as Training[]);
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

  //
  describe('updateUserTrainingRequest$', () => {
    describe('when updateUserTrainingRequest is dispatched', () => {
      const user =  { uid: 'testUID'} as firebase.User
  
      describe('if user', () => {

        beforeEach(() => { 
          store.overrideSelector(getUser, user);
          actions = of(updateUserTrainingRequest({
            training: trainingSut
          }))
          
        })

        it('should return updateAuthenticatedUserTrainingRequest', async () => {
          const result = await firstValueFrom(effects.updateUserTrainingRequest$)
          expect(result).toEqual(updateAuthenticatedUserTrainingRequest({ training: trainingSut}))
        })


      })
  
      describe('if its not user stored', () => {
        beforeEach(() => { 
          store.overrideSelector(getUser, undefined);
          actions = of(updateUserTrainingRequest({
            training: trainingSut
          }))
        })
        it('should return updateAnonymousUserTrainingRequest', async () => {
          const result = await firstValueFrom(effects.updateUserTrainingRequest$)
          expect(result).toEqual(updateAnonymousUserTrainingRequest({ training: trainingSut}))
        })
      })
    })
  })
  describe('updateAuthenticatedUserTrainingRequest$', () => {
    const user =  { uid: 'testUID'} as firebase.User
    
    beforeEach(() => { 
      jest.spyOn(trainingService, 'setTraining').mockReset()
      store.overrideSelector(getUser, user);
      jest.spyOn(trainingService, 'setTraining').mockReturnValue(of(trainingSut))
      actions = of(updateAuthenticatedUserTrainingRequest({
        training: trainingSut
      }))
      
    })
    describe('when trainingService.updateTraining success', () => {
      beforeEach(() => {
        jest.spyOn(trainingService, 'updateTraining').mockReturnValue(of(trainingSut))
      })
      it('should request updateTraining', async () => {
        const updateExerciseSpy = jest.spyOn(trainingService, 'updateTraining')
        await firstValueFrom(effects.updateAuthenticatedUserTrainingRequest$)
        expect(updateExerciseSpy).toHaveBeenCalledWith(user.uid, trainingSut)
      })
      it('should return updateAuthenticatedUserTrainingRequestSuccess', async () => {
        const result = await firstValueFrom(effects.updateAuthenticatedUserTrainingRequest$)
        expect(result).toEqual(updateAuthenticatedUserTrainingRequestSuccess({ training: trainingSut}))
      })
    })

    describe('when trainingService.updateTraining throws error', () => {
      const errorCodeMock = 'testing error code'
      const errorMock = { message: 'testing error message', code: errorCodeMock } as firebase.FirebaseError
      const errorResp = throwError(() => errorMock )

      beforeEach(() => {
        jest.spyOn(trainingService, 'updateTraining').mockReturnValue(errorResp)
      })

      it('should request updateTraining', async () => {
        const updateExerciseSpy = jest.spyOn(trainingService, 'updateTraining')
        await firstValueFrom(effects.updateAuthenticatedUserTrainingRequest$)
        expect(updateExerciseSpy).toHaveBeenCalledWith(user.uid, trainingSut)
      })
      
      it('should return updateAuthenticatedUserTrainingRequestError', async () => {
        const result = await firstValueFrom(effects.updateAuthenticatedUserTrainingRequest$)
        expect(result).toEqual(updateAuthenticatedUserTrainingRequestError({ error: errorMock}))
      })
    })
  })

  describe('updateAnonymousUserTrainingRequest$', () => {
    const exerciseListSut = [{}, {}, {}]
    beforeEach(() => { 
      jest.spyOn(trainingService, 'updateTraining').mockReset()
      store.overrideSelector(getTrainingsList, exerciseListSut as Training[]);
      jest.spyOn(trainingService, 'updateTraining').mockReturnValue(of(trainingSut))
      actions = of(updateAnonymousUserTrainingRequest({
        training: trainingSut
      }))
    })
    it('should not request updateTraining', async () => {
      const updateExerciseSpy = jest.spyOn(trainingService, 'updateTraining')
      await firstValueFrom(effects.updateAnonymousUserTrainingRequest$)
      expect(updateExerciseSpy).not.toHaveBeenCalled()
    })
    it('should return updateAnonymousUserTrainingRequestSuccess', async () => {
      const result = await firstValueFrom(effects.updateAnonymousUserTrainingRequest$)
      expect(result).toEqual(updateAnonymousUserTrainingRequestSuccess({ training: trainingSut }))
    })
  })
});
