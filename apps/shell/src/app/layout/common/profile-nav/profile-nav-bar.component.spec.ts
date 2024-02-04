import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { ProfileNavBarComponent } from './profile-nav-bar.component';
import { provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { CultureService } from '@workout-tracker/services/culture';
import { AuthService } from '@workout-tracker/services/auth';
import { userStateMock } from '@workout-tracker/test';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { logOutRequest } from '@workout-tracker/shared-store';


describe('ProfileNavBarComponent', () => {
  let component: ProfileNavBarComponent;
  let fixture: ComponentFixture<ProfileNavBarComponent>;
  let store: Store;
  let translateService: TranslateService;
  let actions: Observable<Action>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProfileNavBarComponent,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
        RouterTestingModule.withRoutes([])

      ],
      providers: [
        provideMockActions(() => actions),
        provideMockStore({
          initialState: userStateMock
        }),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileNavBarComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store)
    router = TestBed.inject(Router);

    translateService = TestBed.inject(TranslateService);
    fixture.detectChanges();
  });

  describe('Unit tests', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  })

  describe('Integration tests', () => {
    it('logOut should dispatch logOutRequest', () => {
      const dispatchSpy = jest.spyOn(store, 'dispatch')
      component.logOut();
      expect(dispatchSpy).toHaveBeenCalledWith(logOutRequest())
    });
  })
});
