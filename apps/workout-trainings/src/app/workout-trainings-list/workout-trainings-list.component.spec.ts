import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { userStateMock, trainingsStateMock } from '@workout-tracker/test'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { DialogService, LibsServicesDialogModule } from '@workout-tracker/services/dialog';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AppRoutes, Exercise } from '@workout-tracker/models';
import { WorkoutTrainingsListComponent } from './workout-trainings-list.component';
import { workoutTrainingsAppStateMock } from '../+state/test/workoutTrainingsStateMock/workoutTrainingsStateMock.mock'
import { getUserTrainingsRequest } from '@workout-tracker/shared-store';
describe('WorkoutTrainingsComponent', () => {
  let component: WorkoutTrainingsListComponent;
  let fixture: ComponentFixture<WorkoutTrainingsListComponent>;
  let dialogService: DialogService
  let store: MockStore;
  let actions: Observable<Action>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        DialogService,
        provideMockActions(() => actions),
        provideMockStore({
          initialState: {
            ...trainingsStateMock,
            ...workoutTrainingsAppStateMock, 
            ...userStateMock
          }
        }),
      ],
      imports: [
        BrowserAnimationsModule,
        LibsServicesDialogModule,
        WorkoutTrainingsListComponent,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        }),
        RouterTestingModule.withRoutes([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutTrainingsListComponent);
    store = TestBed.inject(MockStore)
    router = TestBed.inject(Router);
    dialogService = TestBed.inject(DialogService)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Unit tests', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  })

  describe('Integration tests', () => {
    describe('isIntersecting expected behaviour', () => {
      it('isIntersecting request with true prop value should dispatch getUserTrainingsRequest', () => {
        const dispatchSpy = jest.spyOn(store, 'dispatch')
  
        component.isIntersecting(true)
  
        expect(dispatchSpy).toHaveBeenCalledWith(getUserTrainingsRequest())
      });

      it('isIntersecting request with false prop value should dispatch getUserTrainingsRequest', () => {
        const dispatchSpy = jest.spyOn(store, 'dispatch')
  
        component.isIntersecting(false)
  
        expect(dispatchSpy).not.toHaveBeenCalledWith(getUserTrainingsRequest())
      });
    })
  })
});
