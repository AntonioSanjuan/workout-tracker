import { TestBed } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { Observable, firstValueFrom, of, throwError } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { Actions } from '@ngrx/effects';
import firebase from 'firebase/compat/app';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { userStateMock } from '@workout-tracker/test';
import { ExerciseTemplate, MusclesInvolved } from '@workout-tracker/models';
import { getUser } from '../user';
import { ExerciseTemplatesService, exerciseTemplatesServiceMock } from '@workout-tracker/services/exercise-templates';
import { ExerciseTemplatesEffects } from './exercise-templates.effects'
import { getExerciseTemplatesList } from './exercise-templates.selectors';
import { addAnonymousUserExerciseTemplateRequest, addAnonymousUserExerciseTemplateRequestSuccess, addAuthenticatedUserExerciseTemplateRequest, addAuthenticatedUserExerciseTemplateRequestError, addAuthenticatedUserExerciseTemplateRequestSuccess, addUserExerciseTemplateRequest, getAnonymousUserExerciseTemplatesRequest, getAnonymousUserExerciseTemplatesRequestSuccess, getAuthenticatedUserExerciseTemplatesRequest, getAuthenticatedUserExerciseTemplatesRequestError, getAuthenticatedUserExerciseTemplatesRequestSuccess, getUserExerciseTemplatesRequest } from './exercise-templates.actions';
import { AppInit, loadedApp } from '../ui';

const exerciseSut = {
  name: 'exercise test name',
  musclesInvolved: [MusclesInvolved.Abdominals, MusclesInvolved.Adductors]
} as ExerciseTemplate

describe('ExerciseTemplatesEffects', () => {
  let actions: Observable<Action>;
  let effects: ExerciseTemplatesEffects
  let exerciseTemplatesService: ExerciseTemplatesService
  let store: MockStore

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      providers: [ 
        { provide: ExerciseTemplatesService, useValue: exerciseTemplatesServiceMock },
        ExerciseTemplatesEffects,
        provideMockStore({
          initialState: userStateMock
        }),
        provideMockActions(() => actions),
      ],
    });

    effects = TestBed.inject(ExerciseTemplatesEffects);
    actions = TestBed.inject(Actions)
    store = TestBed.inject(MockStore)
    exerciseTemplatesService = TestBed.inject(ExerciseTemplatesService)
  });

  describe('getUserExerciseTemplatesRequest$', () => {    
    describe('when getUserExerciseTemplatesRequest is dispatched', () => {
      beforeEach(() => {
        store.resetSelectors()
      })

      describe('if user', () => {
        const user =  { uid: 'testUID'} as firebase.User

        beforeEach(() => {
          store.overrideSelector(getUser, user);
          store.refreshState()

          actions = of(getUserExerciseTemplatesRequest())
        })
        it('should return getAuthenticatedUserExerciseTemplatesRequest', async () => {
          const result = await firstValueFrom(effects.getUserExerciseTemplatesRequest$)
          expect(result).toEqual(getAuthenticatedUserExerciseTemplatesRequest())
        })
      })

      describe('if non user', () => {
        beforeEach(() => {
          store.overrideSelector(getUser, undefined);
          store.refreshState()

          actions = of(getUserExerciseTemplatesRequest())
        })
        it('should return getAnonymousUserExerciseTemplatesRequest', async () => {
          const result = await firstValueFrom(effects.getUserExerciseTemplatesRequest$)
          expect(result).toEqual(getAnonymousUserExerciseTemplatesRequest())
        })
      })

    })
  });

  describe('getAuthenticatedUserExerciseTemplatesRequest$', () => {
    const exercisesSut = [{ name: 'exerciseNameTest0' }, { name: 'exerciseNameTest1' }] as ExerciseTemplate[]

    const user =  { uid: 'testUID'} as firebase.User

    describe('when getAuthenticatedUserExerciseTemplatesRequest is dispatched', () => {
      beforeEach(() => {
        jest.spyOn(exerciseTemplatesService, 'getExerciseTemplates').mockClear()

        store.resetSelectors()
        
        store.overrideSelector(getUser, user);
        store.refreshState()
      })
      describe('when exerciseService.getExerciseTemplates throws error', () => {
        const errorCodeMock = 'testing error code'
        const errorMock = { message: 'testing error message', code: errorCodeMock } as firebase.FirebaseError
        const errorResp = throwError(() => errorMock )

        beforeEach(() => {
          jest.spyOn(exerciseTemplatesService, 'getExerciseTemplates').mockReturnValue(errorResp)
          actions = of(getAuthenticatedUserExerciseTemplatesRequest())
        })

        it('should request getExerciseTemplates', async () => {
          const getExercisesSpy = jest.spyOn(exerciseTemplatesService, 'getExerciseTemplates')
          await firstValueFrom(effects.getAuthenticatedUserExerciseTemplatesRequest$)
          expect(getExercisesSpy).toHaveBeenCalledWith(user.uid)
        })
        it('should return getAuthenticatedUserExerciseTemplatesRequestError', async () => {
          const result = await firstValueFrom(effects.getAuthenticatedUserExerciseTemplatesRequest$)
          expect(result).toEqual(getAuthenticatedUserExerciseTemplatesRequestError({ error: errorMock}))
        })
      })

      describe('when exerciseService.getExerciseTemplates success', () => {
        beforeEach(() => {
          jest.spyOn(exerciseTemplatesService, 'getExerciseTemplates').mockReturnValue(of(exercisesSut))
          actions = of(getAuthenticatedUserExerciseTemplatesRequest())
        })
        it('should request getExerciseTemplates', async () => {
          const getExercisesSpy = jest.spyOn(exerciseTemplatesService, 'getExerciseTemplates')
          await firstValueFrom(effects.getAuthenticatedUserExerciseTemplatesRequest$)
          expect(getExercisesSpy).toHaveBeenCalledWith(user.uid)
        })
        it('should return getAuthenticatedUserExerciseTemplatesRequestSuccess', async () => {
          const result = await firstValueFrom(effects.getAuthenticatedUserExerciseTemplatesRequest$)
          expect(result).toEqual(getAuthenticatedUserExerciseTemplatesRequestSuccess({ exercises: exercisesSut}))
        })
      })

    })
  });

  describe('getAnonymousUserExerciseTemplatesRequest$', () => {
    describe('when getAnonymousUserExerciseTemplatesRequest is dispatched', () => {
      const exercisesSut = [{ name: 'exerciseNameTest0' }, { name: 'exerciseNameTest1' }] as ExerciseTemplate[]

  
      beforeEach(() => { 
        store.resetSelectors()
        
        store.overrideSelector(getExerciseTemplatesList, exercisesSut);
        store.refreshState()
      
        actions = of(getAnonymousUserExerciseTemplatesRequest())

      })
      it('should return getAnonymousUserExerciseTemplatesRequestSuccess', async () => {
        const result = await firstValueFrom(effects.getAnonymousUserExerciseTemplatesRequest$)
        expect(result).toEqual(getAnonymousUserExerciseTemplatesRequestSuccess({ exercises: exercisesSut}))
      })
    })
  })
  
  describe('getUserExercisesSuccess$$', () => {
    describe('when getAuthenticatedUserExerciseTemplatesRequestSuccess is dispatched', () => {
      beforeEach(() => { 
        actions = of(getAuthenticatedUserExerciseTemplatesRequestSuccess({ exercises: []}))
      })

      it('should return loadedApp', async () => {
        const result = await firstValueFrom(effects.getUserExercisesSuccess$)
        expect(result).toEqual(loadedApp({initialized: AppInit.EXERCISES}))
      })
    })

    describe('when getAnonymousUserExerciseTemplatesRequestSuccess is dispatched', () => {
      beforeEach(() => { 
        actions = of(getAnonymousUserExerciseTemplatesRequestSuccess({ exercises: []}))
      })

      it('should return loadedApp', async () => {
        const result = await firstValueFrom(effects.getUserExercisesSuccess$)
        expect(result).toEqual(loadedApp({initialized: AppInit.EXERCISES}))
      })
    })
  });

  describe('addUserExerciseTemplateRequest$', () => {
    describe('when addUserExerciseTemplateRequest is dispatched', () => {
      const user =  { uid: 'testUID'} as firebase.User
  
      describe('if user', () => {

        beforeEach(() => { 
          // jest.spyOn(exerciseService, 'setExerciseTemplate').mockReset()
          store.overrideSelector(getUser, user);
          // jest.spyOn(exerciseService, 'setExerciseTemplate').mockReturnValue(of(exerciseSut))
          actions = of(addUserExerciseTemplateRequest({
            exercise: exerciseSut
          }))
          
        })

        it('should return addAuthenticatedUserExerciseTemplateRequest', async () => {
          const result = await firstValueFrom(effects.addUserExerciseTemplateRequest$)
          expect(result).toEqual(addAuthenticatedUserExerciseTemplateRequest({ exercise: exerciseSut}))
        })


      })
  
      describe('if its not user stored', () => {
        beforeEach(() => { 
          // jest.spyOn(exerciseService, 'setExerciseTemplate').mockReset()
          store.overrideSelector(getUser, undefined);
          // jest.spyOn(exerciseService, 'setExerciseTemplate').mockReturnValue(of(exerciseSut))
          actions = of(addUserExerciseTemplateRequest({
            exercise: exerciseSut
          }))
        })
        // it('should not request setExerciseTemplate', async () => {
        //   const setExerciseSpy = jest.spyOn(exerciseService, 'setExerciseTemplate')
        //   await firstValueFrom(effects.addUserExerciseTemplateRequest$)
        //   expect(setExerciseSpy).not.toHaveBeenCalled()
        // })
        it('should return addAnonymousUserExerciseTemplateRequest', async () => {
          const result = await firstValueFrom(effects.addUserExerciseTemplateRequest$)
          expect(result).toEqual(addAnonymousUserExerciseTemplateRequest({ exercise: exerciseSut}))
        })
      })
    })
  })
  describe('addAuthenticatedUserExerciseTemplateRequest$', () => {
    const user =  { uid: 'testUID'} as firebase.User
    
    beforeEach(() => { 
      jest.spyOn(exerciseTemplatesService, 'setExerciseTemplate').mockReset()
      store.overrideSelector(getUser, user);
      jest.spyOn(exerciseTemplatesService, 'setExerciseTemplate').mockReturnValue(of(exerciseSut))
      actions = of(addAuthenticatedUserExerciseTemplateRequest({
        exercise: exerciseSut
      }))
      
    })
    describe('when exerciseService.setExerciseTemplate success', () => {
      beforeEach(() => {
        jest.spyOn(exerciseTemplatesService, 'setExerciseTemplate').mockReturnValue(of(exerciseSut))
      })
      it('should request setExerciseTemplate', async () => {
        const setExerciseSpy = jest.spyOn(exerciseTemplatesService, 'setExerciseTemplate')
        await firstValueFrom(effects.addAuthenticatedUserExerciseTemplateRequest$)
        expect(setExerciseSpy).toHaveBeenCalledWith(user.uid, exerciseSut)
      })
      it('should return addAuthenticatedUserExerciseTemplateRequestSuccess', async () => {
        const result = await firstValueFrom(effects.addAuthenticatedUserExerciseTemplateRequest$)
        expect(result).toEqual(addAuthenticatedUserExerciseTemplateRequestSuccess({ exercise: exerciseSut}))
      })
    })

    describe('when exerciseService.setExerciseTemplate throws error', () => {
      const errorCodeMock = 'testing error code'
      const errorMock = { message: 'testing error message', code: errorCodeMock } as firebase.FirebaseError
      const errorResp = throwError(() => errorMock )

      beforeEach(() => {
        jest.spyOn(exerciseTemplatesService, 'setExerciseTemplate').mockReturnValue(errorResp)
      })

      it('should request setExerciseTemplate', async () => {
        const setExerciseSpy = jest.spyOn(exerciseTemplatesService, 'setExerciseTemplate')
        await firstValueFrom(effects.addAuthenticatedUserExerciseTemplateRequest$)
        expect(setExerciseSpy).toHaveBeenCalledWith(user.uid, exerciseSut)
      })
      
      it('should return addAuthenticatedUserExerciseTemplateRequestError', async () => {
        const result = await firstValueFrom(effects.addAuthenticatedUserExerciseTemplateRequest$)
        expect(result).toEqual(addAuthenticatedUserExerciseTemplateRequestError({ error: errorMock}))
      })
    })
  })

  describe('addAnonymousUserExerciseTemplateRequest$', () => {
    const exerciseListSut = [{}, {}, {}]
    beforeEach(() => { 
      jest.spyOn(exerciseTemplatesService, 'setExerciseTemplate').mockReset()
      store.overrideSelector(getExerciseTemplatesList, exerciseListSut as ExerciseTemplate[]);
      jest.spyOn(exerciseTemplatesService, 'setExerciseTemplate').mockReturnValue(of(exerciseSut))
      actions = of(addAnonymousUserExerciseTemplateRequest({
        exercise: exerciseSut
      }))
    })
    it('should not request setExerciseTemplate', async () => {
      const setExerciseSpy = jest.spyOn(exerciseTemplatesService, 'setExerciseTemplate')
      await firstValueFrom(effects.addAnonymousUserExerciseTemplateRequest$)
      expect(setExerciseSpy).not.toHaveBeenCalled()
    })
    it('should return addAnonymousUserExerciseTemplateRequestSuccess', async () => {
      const result = await firstValueFrom(effects.addAnonymousUserExerciseTemplateRequest$)
      expect(result).toEqual(addAnonymousUserExerciseTemplateRequestSuccess({ exercise: {...exerciseSut, id: (exerciseListSut.length + 1).toString()}}))
    })
  })
});
