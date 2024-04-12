import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { userStateMock, routerStateMock } from '@workout-tracker/test'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { workoutExerciseTemplatesAppStateMock } from '../+state/test/workoutExercisesStateMock/workoutExerciseTemplatesStateMock.mock'
import { DialogService, LibsServicesDialogModule } from '@workout-tracker/services/dialog';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AppRoutes } from '@workout-tracker/models';
import { WorkoutExerciseComponent } from './workout-exercise.component';
import { ViewHeaderComponent } from '@workout-tracker/components';

describe('WorkoutExerciseComponent', () => {
  let component: WorkoutExerciseComponent;
  let fixture: ComponentFixture<WorkoutExerciseComponent>;
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
            ...workoutExerciseTemplatesAppStateMock, 
            ...userStateMock,
          }
        }),
      ],
      imports: [
        BrowserAnimationsModule,
        ViewHeaderComponent,
        LibsServicesDialogModule,
        WorkoutExerciseComponent,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        }),
        RouterTestingModule.withRoutes([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutExerciseComponent);
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

    it('openExerciseList should navigate to exercise details ', () => {
      const navigateSpy = jest.spyOn(router, 'navigate')

      component.openExerciseList()
      expect(navigateSpy).toHaveBeenCalledWith([AppRoutes.WorkoutExercisesList])
    });
  })
});
