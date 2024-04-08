import { TestBed } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { Observable, firstValueFrom, isEmpty, of, throwError } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { Actions } from '@ngrx/effects';
import { AuthService, authServiceMock } from '@workout-tracker/services/auth';
import firebase from 'firebase/compat/app';
import { UserSettingsService, userSettingsServiceMock } from '@workout-tracker/services/user-settings';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { userStateMock } from '@workout-tracker/test';
import { SettingsEffects } from './settings.effects';
import { UserSettings } from '@workout-tracker/models'
import { getAnonymousUserSettingsRequest, getAnonymousUserSettingsRequestSuccess, getAuthenticatedUserSettingsRequest, getAuthenticatedUserSettingsRequestError, getAuthenticatedUserSettingsRequestSuccess, getUserSettingsRequest, updateUserSettingsRequest, updateUserSettingsRequestSuccess } from './settings.actions';
import { getIsNewUser, getUser } from '../user';
import { AppInit, getIsUILoadedApp, loadedApp } from '../ui';
describe('SettingsEffects', () => {
  let actions: Observable<Action>;
  let effects: SettingsEffects
  let authService: AuthService
  let userSettingsService: UserSettingsService
  let store: MockStore

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: UserSettingsService, useValue: userSettingsServiceMock },
        SettingsEffects,
        provideMockStore({
          initialState: userStateMock
        }),
        provideMockActions(() => actions),
      ],
    });

    effects = TestBed.inject(SettingsEffects);
    actions = TestBed.inject(Actions)
    authService = TestBed.inject(AuthService)
    store = TestBed.inject(MockStore)
    userSettingsService = TestBed.inject(UserSettingsService)
  });

  describe('getUserSettingsRequest$', () => {    
    describe('when getUserSettingsRequest is dispatched', () => {
      beforeEach(() => {
        store.resetSelectors()
      })

      describe('if user', () => {
        const user =  { uid: 'testUID'} as firebase.User

        beforeEach(() => {
          store.overrideSelector(getUser, user);
          store.refreshState()

          actions = of(getUserSettingsRequest())
        })
        it('should return getAuthenticatedUserSettingsRequest', async () => {
          const result = await firstValueFrom(effects.getUserSettingsRequest$)
          expect(result).toEqual(getAuthenticatedUserSettingsRequest())
        })
      })

      describe('if non user', () => {
        beforeEach(() => {
          store.overrideSelector(getUser, undefined);
          store.refreshState()

          actions = of(getUserSettingsRequest())
        })
        it('should return getAnonymousUserSettingsRequest', async () => {
          const result = await firstValueFrom(effects.getUserSettingsRequest$)
          expect(result).toEqual(getAnonymousUserSettingsRequest())
        })
      })

    })
  });

  describe('getAuthenticatedUserSettingsRequest$', () => {
    const user =  { uid: 'testUID'} as firebase.User

    const userSettingsSut = {
      language: 'langTest',
      darkMode: true
    } as UserSettings

 
    describe('when getAuthenticatedUserSettingsRequest is dispatched', () => {
      describe('if its new user', () => {
        let setUserSettingsSpy!: jest.SpyInstance<Observable<UserSettings>>

        beforeEach(() => { 
          setUserSettingsSpy = jest.spyOn(userSettingsService, 'setUserSettings')


          store.overrideSelector(getIsNewUser, true)
          store.overrideSelector(getUser, user)
          store.refreshState
        })
        //
        describe('when userSettingsService.setUserSettings throws error', () => {
          const errorCodeMock = 'testing error code'
          const errorMock = { message: 'testing error message', code: errorCodeMock } as firebase.FirebaseError
          const errorResp = throwError(() => errorMock )
  
          beforeEach(() => {
            jest.spyOn(userSettingsService, 'setUserSettings').mockReturnValue(errorResp)
            actions = of(getAuthenticatedUserSettingsRequest())
          })

          it('should request setUserSettings', async () => {
            await firstValueFrom(effects.getAuthenticatedUserSettingsRequest$)
            expect(setUserSettingsSpy).toHaveBeenCalledWith(user.uid)
          })
  
          it('should return getAuthenticatedUserSettingsRequestSuccess', async () => {
            const result = await firstValueFrom(effects.getAuthenticatedUserSettingsRequest$)
            expect(result).toEqual(getAuthenticatedUserSettingsRequestError({ error: errorMock}))
          })
        })
        describe('when userSettingsService.setUserSettings success', () => {
          beforeEach(() => {
            jest.spyOn(userSettingsService, 'setUserSettings').mockReturnValue(of(userSettingsSut))
            actions = of(getAuthenticatedUserSettingsRequest())
          })
  
          it('should request setUserSettings', async () => {
            await firstValueFrom(effects.getAuthenticatedUserSettingsRequest$)
            expect(setUserSettingsSpy).toHaveBeenCalledWith(user.uid)
          })
  
          it('should return getAuthenticatedUserSettingsRequestSuccess', async () => {
            const result = await firstValueFrom(effects.getAuthenticatedUserSettingsRequest$)
            expect(result).toEqual(getAuthenticatedUserSettingsRequestSuccess({ userSettings: userSettingsSut}))
          })
        })
      })

      describe('if its not new user', () => {
        let getUserSettingsSpy!: jest.SpyInstance<Observable<UserSettings>>

        beforeEach(() => { 
          jest.spyOn(userSettingsService, 'getUserSettings').mockReturnValue(of(userSettingsSut))
          actions = of(getAuthenticatedUserSettingsRequest())

          getUserSettingsSpy = jest.spyOn(userSettingsService, 'getUserSettings')

          store.overrideSelector(getIsNewUser, false)
          store.overrideSelector(getUser, user)
          store.refreshState
        })
        it('should request setUserSettings', async () => {
          await firstValueFrom(effects.getAuthenticatedUserSettingsRequest$)
          expect(getUserSettingsSpy).toHaveBeenCalledWith(user.uid)
        })

        it('should return getAuthenticatedUserSettingsRequestSuccess', async () => {
          const result = await firstValueFrom(effects.getAuthenticatedUserSettingsRequest$)
          expect(result).toEqual(getAuthenticatedUserSettingsRequestSuccess({ userSettings: userSettingsSut}))
        })
      })
    })
  })

  describe('getAnonymousUserSettingsRequest$', () => {
    describe('when anonymousUserSettingsRequest is dispatched', () => {
      const userSettingsSut = {
        language: 'langTest',
        darkMode: true
      } as UserSettings
  
      beforeEach(() => { 
        jest.spyOn(userSettingsService, 'getAnonymousSettings').mockReturnValue(of(userSettingsSut))
        actions = of(getAnonymousUserSettingsRequest())
      })
      it('should request getAnonymousSettings', async () => {
        const getUserSettingsSpy = jest.spyOn(userSettingsService, 'getAnonymousSettings')
        await firstValueFrom(effects.getAnonymousUserSettingsRequest$)
        expect(getUserSettingsSpy).toHaveBeenCalled()
      })
      it('should return UserSettingsSuccess', async () => {
        const result = await firstValueFrom(effects.getAnonymousUserSettingsRequest$)
        expect(result).toEqual(getAnonymousUserSettingsRequestSuccess({ userSettings: userSettingsSut}))
      })
    })
  })
  describe('updateUserSettings$', () => {
    describe('when updateUserSettings is dispatched', () => {
      const userSettingsSut = {
        language: 'langTest',
        darkMode: true
      } as UserSettings
  
      const user =  { uid: 'testUID'} as firebase.User
  
      describe('if user stored', () => {
        beforeEach(() => { 
          store.overrideSelector(getUser, user);
          jest.spyOn(userSettingsService, 'updateUserSettings').mockReturnValue(of(userSettingsSut))
          actions = of(updateUserSettingsRequest({
            userSettings: userSettingsSut
          }))
        })
        it('should request updateUserSettings', async () => {
          const updateUserSettingsSpy = jest.spyOn(userSettingsService, 'updateUserSettings')
          await firstValueFrom(effects.updateUserSettings$)
          expect(updateUserSettingsSpy).toHaveBeenCalledWith(user.uid, userSettingsSut)
        })
        it('should return updateUserSettingsRequestSuccess', async () => {
          const result = await firstValueFrom(effects.updateUserSettings$)
          expect(result).toEqual(updateUserSettingsRequestSuccess({ userSettings: userSettingsSut}))
        })
      })
  
      describe('if its not user stored', () => {
        beforeEach(() => { 
          store.overrideSelector(getUser, undefined);
          jest.spyOn(userSettingsService, 'updateAnonymousSettings').mockReturnValue(of(userSettingsSut))
          actions = of(updateUserSettingsRequest({
            userSettings: userSettingsSut
          }))
        })
        it('should request updateAnonymousSettings', async () => {
          const updateUserSettingsSpy = jest.spyOn(userSettingsService, 'updateAnonymousSettings')
          await firstValueFrom(effects.updateUserSettings$)
          expect(updateUserSettingsSpy).toHaveBeenCalledWith(userSettingsSut)
        })
        it('should return updateUserSettingsRequestSuccess', async () => {
          const result = await firstValueFrom(effects.updateUserSettings$)
          expect(result).toEqual(updateUserSettingsRequestSuccess({ userSettings: userSettingsSut}))
        })
      })
    })
  })

  describe('UserSettingsLoaded$', () => {
    describe('when getAuthenticatedUserSettingsRequestSuccess is dispatched', () => {
      const userSettingsSut = {
        language: 'langTest',
        darkMode: true
      } as UserSettings
  
      describe('if UI app its already loaded', () => {
        beforeEach(() => { 
          actions = of(getAuthenticatedUserSettingsRequestSuccess({ userSettings: userSettingsSut}))
          store.overrideSelector(getIsUILoadedApp, true)
        })
        it('should return EMPTY', (done) => {
          effects.UserSettingsLoaded$.
          pipe(isEmpty()).subscribe( (res) => {
            expect(res).toEqual(true)
            done()
           });
        })
      })
  
      describe('if UI app its not already loaded', () => {
        beforeEach(() => { 
          actions = of(getAuthenticatedUserSettingsRequestSuccess({ userSettings: userSettingsSut}))
          store.overrideSelector(getIsUILoadedApp, false)
        })
        it('should return loadedApp AppInit.UI', async () => {
          const result = await firstValueFrom(effects.UserSettingsLoaded$)
          expect(result).toEqual(loadedApp({initialized: AppInit.UI}))
        })
      })
    })
  
    describe('when getAnonymousUserSettingsRequestSuccess is dispatched', () => {
      const userSettingsSut = {
        language: 'langTest',
        darkMode: true
      } as UserSettings
  
      describe('if UI app its already loaded', () => {
        beforeEach(() => { 
          actions = of(getAnonymousUserSettingsRequestSuccess({ userSettings: userSettingsSut}))
          store.overrideSelector(getIsUILoadedApp, true)
        })
        it('should return EMPTY', (done) => {
          effects.UserSettingsLoaded$.
          pipe(isEmpty()).subscribe( (res) => {
            expect(res).toEqual(true)
            done()
           });
        })
      })
  
      describe('if UI app its not already loaded', () => {
        beforeEach(() => { 
          actions = of(getAnonymousUserSettingsRequestSuccess({ userSettings: userSettingsSut}))
          store.overrideSelector(getIsUILoadedApp, false)
        })
        it('should return loadedApp AppInit.UI', async () => {
          const result = await firstValueFrom(effects.UserSettingsLoaded$)
          expect(result).toEqual(loadedApp({initialized: AppInit.UI}))
        })
      })
    })
  })
 
});
