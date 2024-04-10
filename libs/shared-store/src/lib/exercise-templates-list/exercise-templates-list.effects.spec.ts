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
import { ExerciseTemplatesListEffects } from './exercise-templates-list.effects'
import { getExerciseTemplatesList } from './exercise-templates-list.selectors';
import { addAnonymousUserExerciseTemplateListRequest, addAnonymousUserExerciseTemplateListRequestSuccess, addAuthenticatedUserExerciseTemplateListRequest, addAuthenticatedUserExerciseTemplateListRequestError, addAuthenticatedUserExerciseTemplateListRequestSuccess, addUserExerciseTemplateListRequest, getAnonymousUserExerciseTemplatesListRequest, getAnonymousUserExerciseTemplatesListRequestSuccess, getAuthenticatedUserExerciseTemplatesListRequest, getAuthenticatedUserExerciseTemplatesListRequestError, getAuthenticatedUserExerciseTemplatesListRequestSuccess, getUserExerciseTemplatesListRequest } from './exercise-templates-list.actions';
import { AppInit, loadedApp } from '../ui';

const exerciseSut = {
  name: 'exercise test name',
  musclesInvolved: [MusclesInvolved.Abdominals, MusclesInvolved.Adductors]
} as ExerciseTemplate

describe('ExerciseTemplatesEffects', () => {
  let actions: Observable<Action>;
  let effects: ExerciseTemplatesListEffects
  let exerciseTemplatesService: ExerciseTemplatesService
  let store: MockStore

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      providers: [ 
        { provide: ExerciseTemplatesService, useValue: exerciseTemplatesServiceMock },
        ExerciseTemplatesListEffects,
        provideMockStore({
          initialState: userStateMock
        }),
        provideMockActions(() => actions),
      ],
    });

    effects = TestBed.inject(ExerciseTemplatesListEffects);
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

          actions = of(getUserExerciseTemplatesListRequest())
        })
        it('should return getAuthenticatedUserExerciseTemplatesListRequest', async () => {
          const result = await firstValueFrom(effects.getUserExerciseTemplatesListRequest$)
          expect(result).toEqual(getAuthenticatedUserExerciseTemplatesListRequest())
        })
      })

      describe('if non user', () => {
        beforeEach(() => {
          store.overrideSelector(getUser, undefined);
          store.refreshState()

          actions = of(getUserExerciseTemplatesListRequest())
        })
        it('should return getAnonymousUserExerciseTemplatesListRequest', async () => {
          const result = await firstValueFrom(effects.getUserExerciseTemplatesListRequest$)
          expect(result).toEqual(getAnonymousUserExerciseTemplatesListRequest())
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
          actions = of(getAuthenticatedUserExerciseTemplatesListRequest())
        })

        it('should request getExerciseTemplates', async () => {
          const getExercisesSpy = jest.spyOn(exerciseTemplatesService, 'getExerciseTemplates')
          await firstValueFrom(effects.getAuthenticatedUserExerciseTemplatesListRequest$)
          expect(getExercisesSpy).toHaveBeenCalledWith(user.uid)
        })
        it('should return getAuthenticatedUserExerciseTemplatesListRequestError', async () => {
          const result = await firstValueFrom(effects.getAuthenticatedUserExerciseTemplatesListRequest$)
          expect(result).toEqual(getAuthenticatedUserExerciseTemplatesListRequestError({ error: errorMock}))
        })
      })

      describe('when exerciseService.getExerciseTemplates success', () => {
        beforeEach(() => {
          jest.spyOn(exerciseTemplatesService, 'getExerciseTemplates').mockReturnValue(of(exercisesSut))
          actions = of(getAuthenticatedUserExerciseTemplatesListRequest())
        })
        it('should request getExerciseTemplates', async () => {
          const getExercisesSpy = jest.spyOn(exerciseTemplatesService, 'getExerciseTemplates')
          await firstValueFrom(effects.getAuthenticatedUserExerciseTemplatesListRequest$)
          expect(getExercisesSpy).toHaveBeenCalledWith(user.uid)
        })
        it('should return getAuthenticatedUserExerciseTemplatesListRequestSuccess', async () => {
          const result = await firstValueFrom(effects.getAuthenticatedUserExerciseTemplatesListRequest$)
          expect(result).toEqual(getAuthenticatedUserExerciseTemplatesListRequestSuccess({ exercises: exercisesSut}))
        })
      })

    })
  });

  describe('getAnonymousUserExerciseTemplatesListRequest$', () => {
    describe('when getAnonymousUserExerciseTemplatesListRequest is dispatched', () => {
      const exercisesSut = [{ name: 'exerciseNameTest0' }, { name: 'exerciseNameTest1' }] as ExerciseTemplate[]

  
      beforeEach(() => { 
        store.resetSelectors()
        
        store.overrideSelector(getExerciseTemplatesList, exercisesSut);
        store.refreshState()
      
        actions = of(getAnonymousUserExerciseTemplatesListRequest())

      })
      it('should return getAnonymousUserExerciseTemplatesListRequestSuccess', async () => {
        const result = await firstValueFrom(effects.getAnonymousUserExerciseTemplatesListRequest$)
        expect(result).toEqual(getAnonymousUserExerciseTemplatesListRequestSuccess({ exercises: exercisesSut}))
      })
    })
  })
  
  describe('getUserExerciseTemplatesListSuccess$$', () => {
    describe('when getAuthenticatedUserExerciseTemplatesListRequestSuccess is dispatched', () => {
      beforeEach(() => { 
        actions = of(getAuthenticatedUserExerciseTemplatesListRequestSuccess({ exercises: []}))
      })

      it('should return loadedApp', async () => {
        const result = await firstValueFrom(effects.getUserExerciseTemplatesListSuccess$)
        expect(result).toEqual(loadedApp({initialized: AppInit.EXERCISES_TEMPLATES}))
      })
    })

    describe('when getAnonymousUserExerciseTemplatesListRequestSuccess is dispatched', () => {
      beforeEach(() => { 
        actions = of(getAnonymousUserExerciseTemplatesListRequestSuccess({ exercises: []}))
      })

      it('should return loadedApp', async () => {
        const result = await firstValueFrom(effects.getUserExerciseTemplatesListSuccess$)
        expect(result).toEqual(loadedApp({initialized: AppInit.EXERCISES_TEMPLATES}))
      })
    })
  });

  describe('addUserExerciseTemplateListRequest$', () => {
    describe('when addUserExerciseTemplateListRequest is dispatched', () => {
      const user =  { uid: 'testUID'} as firebase.User
  
      describe('if user', () => {

        beforeEach(() => { 
          // jest.spyOn(exerciseService, 'setExerciseTemplate').mockReset()
          store.overrideSelector(getUser, user);
          // jest.spyOn(exerciseService, 'setExerciseTemplate').mockReturnValue(of(exerciseSut))
          actions = of(addUserExerciseTemplateListRequest({
            exercise: exerciseSut
          }))
          
        })

        it('should return addAuthenticatedUserExerciseTemplateListRequest', async () => {
          const result = await firstValueFrom(effects.addUserExerciseTemplateListRequest$)
          expect(result).toEqual(addAuthenticatedUserExerciseTemplateListRequest({ exercise: exerciseSut}))
        })


      })
  
      describe('if its not user stored', () => {
        beforeEach(() => { 
          // jest.spyOn(exerciseService, 'setExerciseTemplate').mockReset()
          store.overrideSelector(getUser, undefined);
          // jest.spyOn(exerciseService, 'setExerciseTemplate').mockReturnValue(of(exerciseSut))
          actions = of(addUserExerciseTemplateListRequest({
            exercise: exerciseSut
          }))
        })
        // it('should not request setExerciseTemplate', async () => {
        //   const setExerciseSpy = jest.spyOn(exerciseService, 'setExerciseTemplate')
        //   await firstValueFrom(effects.addUserExerciseTemplateRequest$)
        //   expect(setExerciseSpy).not.toHaveBeenCalled()
        // })
        it('should return addAnonymousUserExerciseTemplateListRequest', async () => {
          const result = await firstValueFrom(effects.addUserExerciseTemplateListRequest$)
          expect(result).toEqual(addAnonymousUserExerciseTemplateListRequest({ exercise: exerciseSut}))
        })
      })
    })
  })
  describe('addAuthenticatedUserExerciseTemplateListRequest$', () => {
    const user =  { uid: 'testUID'} as firebase.User
    
    beforeEach(() => { 
      jest.spyOn(exerciseTemplatesService, 'setExerciseTemplate').mockReset()
      store.overrideSelector(getUser, user);
      jest.spyOn(exerciseTemplatesService, 'setExerciseTemplate').mockReturnValue(of(exerciseSut))
      actions = of(addAuthenticatedUserExerciseTemplateListRequest({
        exercise: exerciseSut
      }))
      
    })
    describe('when exerciseService.setExerciseTemplate success', () => {
      beforeEach(() => {
        jest.spyOn(exerciseTemplatesService, 'setExerciseTemplate').mockReturnValue(of(exerciseSut))
      })
      it('should request setExerciseTemplate', async () => {
        const setExerciseSpy = jest.spyOn(exerciseTemplatesService, 'setExerciseTemplate')
        await firstValueFrom(effects.addAuthenticatedUserExerciseTemplateListRequest$)
        expect(setExerciseSpy).toHaveBeenCalledWith(user.uid, exerciseSut)
      })
      it('should return addAuthenticatedUserExerciseTemplateListRequestSuccess', async () => {
        const result = await firstValueFrom(effects.addAuthenticatedUserExerciseTemplateListRequest$)
        expect(result).toEqual(addAuthenticatedUserExerciseTemplateListRequestSuccess({ exercise: exerciseSut}))
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
        await firstValueFrom(effects.addAuthenticatedUserExerciseTemplateListRequest$)
        expect(setExerciseSpy).toHaveBeenCalledWith(user.uid, exerciseSut)
      })
      
      it('should return addAuthenticatedUserExerciseTemplateListRequestError', async () => {
        const result = await firstValueFrom(effects.addAuthenticatedUserExerciseTemplateListRequest$)
        expect(result).toEqual(addAuthenticatedUserExerciseTemplateListRequestError({ error: errorMock}))
      })
    })
  })

  describe('addAnonymousUserExerciseTemplateListRequest$', () => {
    const exerciseListSut = [{}, {}, {}]
    beforeEach(() => { 
      jest.spyOn(exerciseTemplatesService, 'setExerciseTemplate').mockReset()
      store.overrideSelector(getExerciseTemplatesList, exerciseListSut as ExerciseTemplate[]);
      jest.spyOn(exerciseTemplatesService, 'setExerciseTemplate').mockReturnValue(of(exerciseSut))
      actions = of(addAnonymousUserExerciseTemplateListRequest({
        exercise: exerciseSut
      }))
    })
    it('should not request setExerciseTemplate', async () => {
      const setExerciseSpy = jest.spyOn(exerciseTemplatesService, 'setExerciseTemplate')
      await firstValueFrom(effects.addAnonymousUserExerciseTemplateListRequest$)
      expect(setExerciseSpy).not.toHaveBeenCalled()
    })
    it('should return addAnonymousUserExerciseTemplateListRequestSuccess', async () => {
      const result = await firstValueFrom(effects.addAnonymousUserExerciseTemplateListRequest$)
      expect(result).toEqual(addAnonymousUserExerciseTemplateListRequestSuccess({ exercise: {...exerciseSut, id: (exerciseListSut.length + 1).toString()}}))
    })
  })
});
