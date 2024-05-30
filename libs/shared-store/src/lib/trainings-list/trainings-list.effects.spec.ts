import { TestBed } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { Observable, firstValueFrom, of, throwError } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { Actions } from '@ngrx/effects';
import firebase from 'firebase/compat/app';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { trainingsListStateMock, userStateMock } from '@workout-tracker/test';
import { AppRoutes, ExerciseTemplate, Training, TrainingExercise, TrainingQueryFilters } from '@workout-tracker/models';
import { getUser } from '../user';
import { TrainingsListEffects } from './trainings-list.effects'
import { getTrainingListOngoing, getTrainingsList } from './trainings-list.selectors';
import { AppInit, loadedApp } from '../ui';
import { TrainingsService, trainingsServiceMock } from '@workout-tracker/services/trainings';
import { addAnonymousUserTrainingListRequest, addAnonymousUserTrainingListRequestSuccess, addAuthenticatedUserTrainingListRequest, addAuthenticatedUserTrainingListRequestError, addAuthenticatedUserTrainingListRequestSuccess, addUserTrainingListRequest, copyAnonymousUserTrainingListRequest, copyAnonymousUserTrainingListRequestSuccess, copyAuthenticatedUserTrainingListRequest, copyAuthenticatedUserTrainingListRequestError, copyAuthenticatedUserTrainingListRequestSuccess, copyUserTrainingListRequest, getAnonymousUserTrainingsListRequest, getAnonymousUserTrainingsListRequestSuccess, getAuthenticatedUserTrainingsListRequest, getAuthenticatedUserTrainingsListRequestError, getAuthenticatedUserTrainingsListRequestSuccess, getUserTrainingsListRequest, setTrainingListQueryFilter, updateAnonymousUserTrainingListRequest, updateAnonymousUserTrainingListRequestSuccess, updateAuthenticatedUserTrainingListRequest, updateAuthenticatedUserTrainingListRequestError, updateAuthenticatedUserTrainingListRequestSuccess, updateUserTrainingListRequest } from './trainings-list.actions';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

const trainingSut = {
  id: 'trainingIdTest',
  observations: undefined,
  creationDate: new Date(),
  finishDate: undefined,
  trainingExercises: [
    { exerciseTemplate: { name: ''} as ExerciseTemplate} as TrainingExercise
  ]
} as Training

describe('TrainingsListEffects', () => {
  let actions: Observable<Action>;
  let effects: TrainingsListEffects
  let trainingService: TrainingsService
  let store: MockStore
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([])
      ],
      providers: [ 
        { provide: TrainingsService, useValue: trainingsServiceMock },
        TrainingsListEffects,
        provideMockStore({
          initialState: {
            ...userStateMock,
            ...trainingsListStateMock,
          }
        }),
        provideMockActions(() => actions),
      ],
    });

    effects = TestBed.inject(TrainingsListEffects);
    actions = TestBed.inject(Actions)
    store = TestBed.inject(MockStore)
    router = TestBed.inject(Router);
    trainingService = TestBed.inject(TrainingsService)
  });

  describe('getUserTrainingsListRequest$', () => {    
    describe('when getUserTrainingsListRequest is dispatched', () => {
      beforeEach(() => {
        store.resetSelectors()
      })

      describe('if user', () => {
        const user =  { uid: 'testUID'} as firebase.User

        beforeEach(() => {
          store.overrideSelector(getUser, user);
          store.refreshState()

          actions = of(getUserTrainingsListRequest())
        })
        it('should return getAuthenticatedUserTrainingsListRequest', async () => {
          const result = await firstValueFrom(effects.getUserTrainingsListRequest$)
          expect(result).toEqual(getAuthenticatedUserTrainingsListRequest())
        })
      })

      describe('if non user', () => {
        beforeEach(() => {
          store.overrideSelector(getUser, undefined);
          store.refreshState()

          actions = of(getUserTrainingsListRequest())
        })
        it('should return getAnonymousUserTrainingsListRequest', async () => {
          const result = await firstValueFrom(effects.getUserTrainingsListRequest$)
          expect(result).toEqual(getAnonymousUserTrainingsListRequest())
        })
      })

    })

    //
    describe('when setTrainingListQueryFilter is dispatched', () => {
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

          actions = of(setTrainingListQueryFilter({ filters: filters}))
        })
        it('should return getAuthenticatedUserTrainingsListRequest', async () => {
          const result = await firstValueFrom(effects.getUserTrainingsListRequest$)
          expect(result).toEqual(getAuthenticatedUserTrainingsListRequest())
        })
      })

      describe('if non user', () => {
        beforeEach(() => {
          store.overrideSelector(getUser, undefined);
          store.refreshState()

          actions = of(setTrainingListQueryFilter({ filters: filters}))
        })
        it('should return getAnonymousUserTrainingsListRequest', async () => {
          const result = await firstValueFrom(effects.getUserTrainingsListRequest$)
          expect(result).toEqual(getAnonymousUserTrainingsListRequest())
        })
      })

    })
  });

  describe('getAuthenticatedUserTrainingsListRequest$', () => {
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
          actions = of(getAuthenticatedUserTrainingsListRequest())
        })

        it('should request getTrainings', async () => {
          const getTrainingsSpy = jest.spyOn(trainingService, 'getTrainings')
          await firstValueFrom(effects.getAuthenticatedUserTrainingsListRequest$)
          expect(getTrainingsSpy).toHaveBeenCalledWith(user.uid, expect.anything())
        })
        it('should return getAuthenticatedUserTrainingsListRequestError', async () => {
          const result = await firstValueFrom(effects.getAuthenticatedUserTrainingsListRequest$)
          expect(result).toEqual(getAuthenticatedUserTrainingsListRequestError({ error: errorMock}))
        })
      })

      describe('when trainingService.getTrainings success', () => {
        beforeEach(() => {
          jest.spyOn(trainingService, 'getTrainings').mockReturnValue(of(trainingSut))
          actions = of(getAuthenticatedUserTrainingsListRequest())
        })
        it('should request getTrainings', async () => {
          const getTrainingsSpy = jest.spyOn(trainingService, 'getTrainings')
          await firstValueFrom(effects.getAuthenticatedUserTrainingsListRequest$)
          expect(getTrainingsSpy).toHaveBeenCalledWith(user.uid, expect.anything())
        })
        it('should return getAuthenticatedUserTrainingsListRequestSuccess', async () => {
          const result = await firstValueFrom(effects.getAuthenticatedUserTrainingsListRequest$)
          expect(result).toEqual(getAuthenticatedUserTrainingsListRequestSuccess({ trainings: trainingSut}))
        })
      })

    })
  });

  describe('getAnonymousUserTrainingsListRequest$', () => {
    describe('when getAnonymousUserTrainingsRequest is dispatched', () => {
      const trainingSut = [{ id: 'trainingIdTest0' }, { id: 'trainingIdTest1' }] as Training[]

  
      beforeEach(() => { 
        store.resetSelectors()
        
        store.overrideSelector(getTrainingsList, trainingSut);
        store.refreshState()
      
        actions = of(getAnonymousUserTrainingsListRequest())

      })
      it('should return getAnonymousUserTrainingsListRequestSuccess', async () => {
        const result = await firstValueFrom(effects.getAnonymousUserTrainingsListRequest$)
        expect(result).toEqual(getAnonymousUserTrainingsListRequestSuccess({ trainings: trainingSut}))
      })
    })
  })
  
  describe('getUserTrainingsSuccess$', () => {
    describe('when getAuthenticatedUserTrainingsListRequestSuccess is dispatched', () => {
      beforeEach(() => { 
        actions = of(getAuthenticatedUserTrainingsListRequestSuccess({ trainings: []}))
      })

      it('should return loadedApp', async () => {
        const result = await firstValueFrom(effects.getUserTrainingsListSuccess$)
        expect(result).toEqual(loadedApp({initialized: AppInit.TRAININGS}))
      })
    })

    describe('when getAnonymousUserTrainingsListRequestSuccess is dispatched', () => {
      beforeEach(() => { 
        actions = of(getAnonymousUserTrainingsListRequestSuccess({ trainings: []}))
      })

      it('should return loadedApp', async () => {
        const result = await firstValueFrom(effects.getUserTrainingsListSuccess$)
        expect(result).toEqual(loadedApp({initialized: AppInit.TRAININGS}))
      })
    })
  });

  describe('finishUserTrainingOnGoingRequest$', () => {
    describe('when addUserTrainingListRequest is dispatched', () => {
      const trainingOnGoint =  { id: 'trainingOnGoingId', finishDate: undefined} as Training
  
      describe('if training on going (not finished)', () => {
        const today = new Date()
        beforeEach(() => { 
          store.overrideSelector(getTrainingListOngoing, trainingOnGoint);
          actions = of(addUserTrainingListRequest({
            training: trainingSut
          }))
          
          jest.useFakeTimers();
          jest.setSystemTime(today);
        })        

        afterEach(() => {
          jest.useRealTimers();
        })

        it('should return updateAuthenticatedUserTrainingListRequest', async () => {
          const result = await firstValueFrom(effects.finishUserTrainingListOnGoingRequest$)
          expect(result).toEqual(updateAuthenticatedUserTrainingListRequest({ training: {...trainingOnGoint, finishDate: new Date()}}))
        })


      })
  
      describe('if its not training on going (not finished)', () => {
        beforeEach(() => { 
          store.overrideSelector(getTrainingListOngoing, undefined);
          actions = of(addUserTrainingListRequest({
            training: trainingSut
          }))
        })
        it('should return nothing', async () => {
          effects.finishUserTrainingListOnGoingRequest$.subscribe(result => {
            expect(result).toBeUndefined();
          });
        })
      })
    })

    describe('when copyUserTrainingListRequest is dispatched', () => {
      const trainingOnGoint =  { id: 'trainingOnGoingId', finishDate: undefined} as Training
  
      describe('if training on going (not finished)', () => {
        const today = new Date()
        beforeEach(() => { 
          store.overrideSelector(getTrainingListOngoing, trainingOnGoint);
          actions = of(copyUserTrainingListRequest({
            training: trainingSut
          }))
          
          jest.useFakeTimers();
          jest.setSystemTime(today);
        })        

        afterEach(() => {
          jest.useRealTimers();
        })

        it('should return updateAuthenticatedUserTrainingListRequest', async () => {
          const result = await firstValueFrom(effects.finishUserTrainingListOnGoingRequest$)
          expect(result).toEqual(updateAuthenticatedUserTrainingListRequest({ training: {...trainingOnGoint, finishDate: new Date()}}))
        })


      })
  
      describe('if its not training on going (not finished)', () => {
        beforeEach(() => { 
          store.overrideSelector(getTrainingListOngoing, undefined);
          actions = of(copyUserTrainingListRequest({
            training: trainingSut
          }))
        })
        it('should return nothing', async () => {
          effects.finishUserTrainingListOnGoingRequest$.subscribe(result => {
            expect(result).toBeUndefined();
          });
        })
      })
    })
  })

  describe('addUserTrainingListRequest$', () => {
    describe('when addUserTrainingListRequest is dispatched', () => {
      const user =  { uid: 'testUID'} as firebase.User
  
      describe('if user', () => {

        beforeEach(() => { 
          store.overrideSelector(getUser, user);
          actions = of(addUserTrainingListRequest({
            training: trainingSut
          }))
          
        })

        it('should return addAuthenticatedUserTrainingListRequest', async () => {
          const result = await firstValueFrom(effects.addUserTrainingListRequest$)
          expect(result).toEqual(addAuthenticatedUserTrainingListRequest({ training: trainingSut}))
        })


      })
  
      describe('if its not user stored', () => {
        beforeEach(() => { 
          store.overrideSelector(getUser, undefined);
          actions = of(addUserTrainingListRequest({
            training: trainingSut
          }))
        })
        it('should return addAnonymousUserTrainingListRequest', async () => {
          const result = await firstValueFrom(effects.addUserTrainingListRequest$)
          expect(result).toEqual(addAnonymousUserTrainingListRequest({ training: trainingSut}))
        })
      })
    })
  })
  describe('addAuthenticatedUserTrainingListRequest$', () => {
    const user =  { uid: 'testUID'} as firebase.User
    
    beforeEach(() => { 
      jest.spyOn(trainingService, 'setTraining').mockReset()
      store.overrideSelector(getUser, user);
      jest.spyOn(trainingService, 'setTraining').mockReturnValue(of(trainingSut))
      actions = of(addAuthenticatedUserTrainingListRequest({
        training: trainingSut
      }))
      
    })
    describe('when trainingService.setTraining success', () => {
      beforeEach(() => {
        jest.spyOn(trainingService, 'setTraining').mockReturnValue(of(trainingSut))
      })
      it('should request setExerciseTemplate', async () => {
        const setExerciseSpy = jest.spyOn(trainingService, 'setTraining')
        await firstValueFrom(effects.addAuthenticatedUserTrainingListRequest$)
        expect(setExerciseSpy).toHaveBeenCalledWith(user.uid, trainingSut)
      })
      it('should return addAuthenticatedUserTrainingListRequestSuccess', async () => {
        const result = await firstValueFrom(effects.addAuthenticatedUserTrainingListRequest$)
        expect(result).toEqual(addAuthenticatedUserTrainingListRequestSuccess({ training: trainingSut}))
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
        await firstValueFrom(effects.addAuthenticatedUserTrainingListRequest$)
        expect(setExerciseSpy).toHaveBeenCalledWith(user.uid, trainingSut)
      })
      
      it('should return addAuthenticatedUserTrainingListRequestError', async () => {
        const result = await firstValueFrom(effects.addAuthenticatedUserTrainingListRequest$)
        expect(result).toEqual(addAuthenticatedUserTrainingListRequestError({ error: errorMock}))
      })
    })
  })

  describe('addAnonymousUserTrainingListRequest$', () => {
    const exerciseListSut = [{}, {}, {}]
    beforeEach(() => { 
      jest.spyOn(trainingService, 'setTraining').mockReset()
      store.overrideSelector(getTrainingsList, exerciseListSut as Training[]);
      jest.spyOn(trainingService, 'setTraining').mockReturnValue(of(trainingSut))
      actions = of(addAnonymousUserTrainingListRequest({
        training: trainingSut
      }))
    })
    it('should not request setTraining', async () => {
      const setExerciseSpy = jest.spyOn(trainingService, 'setTraining')
      await firstValueFrom(effects.addAnonymousUserTrainingListRequest$)
      expect(setExerciseSpy).not.toHaveBeenCalled()
    })
    it('should return addAnonymousUserTrainingListRequestSuccess', async () => {
      const result = await firstValueFrom(effects.addAnonymousUserTrainingListRequest$)
      expect(result).toEqual(addAnonymousUserTrainingListRequestSuccess({ training: {...trainingSut, id: (exerciseListSut.length + 1).toString()}}))
    })
  })

  describe('addUserTrainingListRequestSuccess$', () => {
    const trainingIdSut = 'trainingId test'
    const trainingSut = { id: trainingIdSut } as Training

    describe('when addAuthenticatedUserTrainingListRequestSuccess is dispatched', () => {
      beforeEach(() => {
        store.resetSelectors()
        store.refreshState()

        actions = of(addAuthenticatedUserTrainingListRequestSuccess({ training: trainingSut }))
      })
      it('should navigate to new trainingExercise', async () => {
        const navigateSpy = jest.spyOn(router, 'navigate')
        await firstValueFrom(effects.addUserTrainingListRequestSuccess$)
        expect(navigateSpy).toHaveBeenCalledWith([`${AppRoutes.WorkoutTrainingsList}/${trainingSut.id}`])
      })
    })

    describe('when addAnonymousUserTrainingListRequestSuccess is dispatched', () => {
      beforeEach(() => {
        store.resetSelectors()
        store.refreshState()

        actions = of(addAnonymousUserTrainingListRequestSuccess({ training: trainingSut }))
      })
      it('should navigate to new trainingExercise', async () => {
        const navigateSpy = jest.spyOn(router, 'navigate')
        await firstValueFrom(effects.addUserTrainingListRequestSuccess$)
        expect(navigateSpy).toHaveBeenCalledWith([`${AppRoutes.WorkoutTrainingsList}/${trainingSut.id}`])
      })
    })

  })

  //
  describe('copyUserTrainingListRequest$', () => {
    describe('when copyUserTrainingListRequest is dispatched', () => {
      const user =  { uid: 'testUID'} as firebase.User
  
      describe('if user', () => {

        beforeEach(() => { 
          store.overrideSelector(getUser, user);
          actions = of(copyUserTrainingListRequest({
            training: trainingSut
          }))
          
        })

        it('should return copyAuthenticatedUserTrainingListRequest', async () => {
          const result = await firstValueFrom(effects.copyUserTrainingListRequest$)
          expect(result).toEqual(copyAuthenticatedUserTrainingListRequest({ training: trainingSut}))
        })


      })
  
      describe('if its not user stored', () => {
        beforeEach(() => { 
          store.overrideSelector(getUser, undefined);
          actions = of(copyUserTrainingListRequest({
            training: trainingSut
          }))
        })
        it('should return copyAnonymousUserTrainingListRequest', async () => {
          const result = await firstValueFrom(effects.copyUserTrainingListRequest$)
          expect(result).toEqual(copyAnonymousUserTrainingListRequest({ training: trainingSut}))
        })
      })
    })
  })
  describe('copyAuthenticatedUserTrainingListRequest$', () => {
    const user =  { uid: 'testUID'} as firebase.User
    const today = new Date(2020, 3, 1)
    
    let copiedTraining!: Training
    beforeEach(() => { 
      jest.useFakeTimers();
      jest.setSystemTime(today);

      copiedTraining = {
        ...trainingSut,
        creationDate: today
      }
      jest.spyOn(trainingService, 'copyTraining').mockReset()
      store.overrideSelector(getUser, user);
      jest.spyOn(trainingService, 'copyTraining').mockReturnValue(of(copiedTraining))
      actions = of(copyAuthenticatedUserTrainingListRequest({
        training: trainingSut
      }))
    })
    afterEach(() => {
      jest.useRealTimers();
    })
    describe('when trainingService.copyTraining success', () => {
      beforeEach(() => {
        jest.spyOn(trainingService, 'copyTraining').mockReturnValue(of(copiedTraining))
      })
      it('should request setExerciseTemplate', async () => {
        const copyTrainingSpy = jest.spyOn(trainingService, 'copyTraining')
        await firstValueFrom(effects.copyAuthenticatedUserTrainingListRequest$)
        expect(copyTrainingSpy).toHaveBeenCalledWith(user.uid, trainingSut)
      })
      it('should return copyAuthenticatedUserTrainingListRequestSuccess', async () => {
        const result = await firstValueFrom(effects.copyAuthenticatedUserTrainingListRequest$)
        expect(result).toEqual(copyAuthenticatedUserTrainingListRequestSuccess({ training: copiedTraining}))
      })
    })

    describe('when trainingService.copyTraining throws error', () => {
      const errorCodeMock = 'testing error code'
      const errorMock = { message: 'testing error message', code: errorCodeMock } as firebase.FirebaseError
      const errorResp = throwError(() => errorMock )

      beforeEach(() => {
        jest.spyOn(trainingService, 'copyTraining').mockReturnValue(errorResp)
      })

      it('should request copyTraining', async () => {
        const copyTrainingSpy = jest.spyOn(trainingService, 'copyTraining')
        await firstValueFrom(effects.copyAuthenticatedUserTrainingListRequest$)
        expect(copyTrainingSpy).toHaveBeenCalledWith(user.uid, trainingSut)
      })
      
      it('should return copyAuthenticatedUserTrainingListRequestError', async () => {
        const result = await firstValueFrom(effects.copyAuthenticatedUserTrainingListRequest$)
        expect(result).toEqual(copyAuthenticatedUserTrainingListRequestError({ error: errorMock}))
      })
    })
  })

  describe('copyAnonymousUserTrainingListRequest$', () => {
    const exerciseListSut = [{}, {}, {}]
    let copiedTraining!: Training
    const today = new Date(2020, 3, 1)

    beforeEach(() => {       
      jest.useFakeTimers();
      jest.setSystemTime(today);

      copiedTraining = {
        ...trainingSut,
        creationDate: today
      }
      jest.spyOn(trainingService, 'copyTraining').mockReset()
      store.overrideSelector(getTrainingsList, exerciseListSut as Training[]);
      jest.spyOn(trainingService, 'copyTraining').mockReturnValue(of(copiedTraining))
      actions = of(copyAnonymousUserTrainingListRequest({
        training: trainingSut
      }))
    })
    it('should not request copyTraining', async () => {
      const copyTrainingSpy = jest.spyOn(trainingService, 'copyTraining')
      await firstValueFrom(effects.copyAnonymousUserTrainingListRequest$)
      expect(copyTrainingSpy).not.toHaveBeenCalled()
    })
    it('should return copyAnonymousUserTrainingListRequestSuccess', async () => {
      const result = await firstValueFrom(effects.copyAnonymousUserTrainingListRequest$)
      expect(result).toEqual(copyAnonymousUserTrainingListRequestSuccess({ training: {...trainingSut, id: (exerciseListSut.length + 1).toString()}}))
    })
  })

  describe('copyUserTrainingListRequestSuccess$', () => {
    const trainingIdSut = 'trainingId test'
    const trainingSut = { id: trainingIdSut } as Training

    describe('when copyAuthenticatedUserTrainingListRequestSuccess is dispatched', () => {
      beforeEach(() => {
        store.resetSelectors()
        store.refreshState()

        actions = of(copyAuthenticatedUserTrainingListRequestSuccess({ training: trainingSut }))
      })
      it('should navigate to copied trainingExercise', async () => {
        const navigateSpy = jest.spyOn(router, 'navigate')
        await firstValueFrom(effects.copyUserTrainingListRequestSuccess$)
        expect(navigateSpy).toHaveBeenCalledWith([`${AppRoutes.WorkoutTrainingsList}/${trainingSut.id}`])
      })
    })

    describe('when copyAnonymousUserTrainingListRequestSuccess is dispatched', () => {
      beforeEach(() => {
        store.resetSelectors()
        store.refreshState()

        actions = of(copyAnonymousUserTrainingListRequestSuccess({ training: trainingSut }))
      })
      it('should navigate to copied trainingExercise', async () => {
        const navigateSpy = jest.spyOn(router, 'navigate')
        await firstValueFrom(effects.copyUserTrainingListRequestSuccess$)
        expect(navigateSpy).toHaveBeenCalledWith([`${AppRoutes.WorkoutTrainingsList}/${trainingSut.id}`])
      })
    })

  })

  //
  describe('updateUserTrainingListRequest$', () => {
    describe('when updateUserTrainingListRequest is dispatched', () => {
      const user =  { uid: 'testUID'} as firebase.User
  
      describe('if user', () => {

        beforeEach(() => { 
          store.overrideSelector(getUser, user);
          actions = of(updateUserTrainingListRequest({
            training: trainingSut
          }))
          
        })

        it('should return updateAuthenticatedUserTrainingListRequest', async () => {
          const result = await firstValueFrom(effects.updateUserTrainingListRequest$)
          expect(result).toEqual(updateAuthenticatedUserTrainingListRequest({ training: trainingSut}))
        })


      })
  
      describe('if its not user stored', () => {
        beforeEach(() => { 
          store.overrideSelector(getUser, undefined);
          actions = of(updateUserTrainingListRequest({
            training: trainingSut
          }))
        })
        it('should return updateAnonymousUserTrainingListRequest', async () => {
          const result = await firstValueFrom(effects.updateUserTrainingListRequest$)
          expect(result).toEqual(updateAnonymousUserTrainingListRequest({ training: trainingSut}))
        })
      })
    })
  })
  describe('updateAuthenticatedUserTrainingListRequest$', () => {
    const user =  { uid: 'testUID'} as firebase.User
    
    beforeEach(() => { 
      jest.spyOn(trainingService, 'setTraining').mockReset()
      store.overrideSelector(getUser, user);
      jest.spyOn(trainingService, 'setTraining').mockReturnValue(of(trainingSut))
      actions = of(updateAuthenticatedUserTrainingListRequest({
        training: trainingSut
      }))
      
    })
    describe('when trainingService.updateTraining success', () => {
      beforeEach(() => {
        jest.spyOn(trainingService, 'updateTraining').mockReturnValue(of(trainingSut))
      })
      it('should request updateTraining', async () => {
        const updateExerciseSpy = jest.spyOn(trainingService, 'updateTraining')
        await firstValueFrom(effects.updateAuthenticatedUserTrainingListRequest$)
        expect(updateExerciseSpy).toHaveBeenCalledWith(user.uid, trainingSut)
      })
      it('should return updateAuthenticatedUserTrainingListRequestSuccess', async () => {
        const result = await firstValueFrom(effects.updateAuthenticatedUserTrainingListRequest$)
        expect(result).toEqual(updateAuthenticatedUserTrainingListRequestSuccess({ training: trainingSut}))
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
        await firstValueFrom(effects.updateAuthenticatedUserTrainingListRequest$)
        expect(updateExerciseSpy).toHaveBeenCalledWith(user.uid, trainingSut)
      })
      
      it('should return updateAuthenticatedUserTrainingListRequestError', async () => {
        const result = await firstValueFrom(effects.updateAuthenticatedUserTrainingListRequest$)
        expect(result).toEqual(updateAuthenticatedUserTrainingListRequestError({ error: errorMock}))
      })
    })
  })

  describe('updateAnonymousUserTrainingListRequest$', () => {
    const exerciseListSut = [{}, {}, {}]
    beforeEach(() => { 
      jest.spyOn(trainingService, 'updateTraining').mockReset()
      store.overrideSelector(getTrainingsList, exerciseListSut as Training[]);
      jest.spyOn(trainingService, 'updateTraining').mockReturnValue(of(trainingSut))
      actions = of(updateAnonymousUserTrainingListRequest({
        training: trainingSut
      }))
    })
    it('should not request updateTraining', async () => {
      const updateExerciseSpy = jest.spyOn(trainingService, 'updateTraining')
      await firstValueFrom(effects.updateAnonymousUserTrainingListRequest$)
      expect(updateExerciseSpy).not.toHaveBeenCalled()
    })
    it('should return updateAnonymousUserTrainingListRequestSuccess', async () => {
      const result = await firstValueFrom(effects.updateAnonymousUserTrainingListRequest$)
      expect(result).toEqual(updateAnonymousUserTrainingListRequestSuccess({ training: trainingSut }))
    })
  })
});
