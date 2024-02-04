import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuNavBarComponent } from './menu-nav-bar.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { appRoutes } from '../../../app.routes';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { layoutStateMock, userStateMock } from '@workout-tracker/test'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { logOutRequest, switchNavBar } from '@workout-tracker/shared-store';
describe('MenuNavBarComponent', () => {
  let component: MenuNavBarComponent;
  let fixture: ComponentFixture<MenuNavBarComponent>;
  let router: Router;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          initialState: {
            ...layoutStateMock, 
            ...userStateMock
          }
        }),
      ],
      imports: [
        BrowserAnimationsModule,
        MenuNavBarComponent,
        RouterTestingModule.withRoutes(appRoutes),
        TranslateModule.forRoot()
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuNavBarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    store = TestBed.inject(Store)

    fixture.detectChanges();
  });

  describe('Unit tests', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  })

  describe('Integration tests', () => {
    it('switch should dispatch switchNavBar', () => {
      const dispatchSpy = jest.spyOn(store, 'dispatch')

      component.switch()

      expect(dispatchSpy).toHaveBeenCalledWith(switchNavBar())
    });

    it('logOut should dispatch logOutRequest', () => {
      const dispatchSpy = jest.spyOn(store, 'dispatch')

      component.logOut()

      expect(dispatchSpy).toHaveBeenCalledWith(logOutRequest())
    });
  })
});
