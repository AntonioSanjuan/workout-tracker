import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { accountAppStateMock } from '../+state/test/accountStateMock/accountStateMock.mock';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { getUserSettings, updateUserSettingsRequest } from '@workout-tracker/shared-store';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { SettingsComponent } from './settings.component';
import { UserSettings } from '@workout-tracker/models';
import { userStateMock, settingsStateMock } from '@workout-tracker/test'
describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          initialState: {
            ...accountAppStateMock,
            ...userStateMock, 
            ...settingsStateMock
          }
        }),
      ],
      imports: [
        BrowserAnimationsModule,
        SettingsComponent,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        }),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsComponent);
    store = TestBed.inject(MockStore)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Unit tests', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  })

  describe('Integration tests', () => {
    describe('Initialization (ngOnInit)', ()=> {
      const userSettingsSut = {
        language: 'lang test',
        darkMode: false
      } as UserSettings

      beforeEach(() => {
        store.overrideSelector(getUserSettings, userSettingsSut)
        store.refreshState()
      })

      it('getUserSettings trigger should update settingsForm', () => {
        expect(component.settingsForm.getRawValue().language).toEqual(userSettingsSut.language)
        expect(component.settingsForm.getRawValue().darkMode).toEqual(userSettingsSut.darkMode)
      })
    })
    describe('updateSettings', () => {
      it('updateSettings should dispatch updateUserSettings', () => {
        const dispatchSpy = jest.spyOn(store, 'dispatch')

        const languageSut = 'language test';
        const darkModeSut = true;

        component.settingsForm.setValue({
          language: languageSut,
          darkMode: darkModeSut
        })

        component.updateSettings()

        expect(dispatchSpy).toHaveBeenCalledWith(updateUserSettingsRequest({
          userSettings: {
            language: languageSut,
            darkMode: darkModeSut
          }
         })
        )
      })
    });
  })

});
