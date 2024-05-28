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
import { AppRoutes, ExerciseTemplate } from '@workout-tracker/models';
import { WorkoutExerciseTemplateComponent } from './workout-exercise-template.component';
import { ViewHeaderComponent } from '@workout-tracker/components';
import { appRoutes } from '../app.routes';
import { selectWorkoutExerciseTemplateDetailsState } from './state/workout-exercise-template.selectors';

describe('WorkoutExerciseTemplateComponent', () => {
  const workoutExerciseTemplateDetailsMock = { exercise: {} as ExerciseTemplate } ;
  let component: WorkoutExerciseTemplateComponent;
  let fixture: ComponentFixture<WorkoutExerciseTemplateComponent>;
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
        WorkoutExerciseTemplateComponent,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        }),
        RouterTestingModule.withRoutes(appRoutes)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutExerciseTemplateComponent);
    store = TestBed.inject(MockStore)
    router = TestBed.inject(Router);
    dialogService = TestBed.inject(DialogService)

    store.overrideSelector(selectWorkoutExerciseTemplateDetailsState, workoutExerciseTemplateDetailsMock)
    store.refreshState()

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

      component.openExerciseTemplateList()
      expect(navigateSpy).toHaveBeenCalledWith([AppRoutes.WorkoutExerciseTemplatesList])
    });
  })
});
