import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutExerciseTemplatesListComponent } from './workout-exercise-templates-list.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { exerciseTemplatesListStateMock, userStateMock } from '@workout-tracker/test'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { workoutExerciseTemplatesAppStateMock } from '../+state/test/workoutExercisesStateMock/workoutExerciseTemplatesStateMock.mock'
import { WorkoutExerciseTemplatesFilterListComponent } from './workout-exercise-templates-list-filter/workout-exercise-templates-list-filter.component';
import { DialogService, LibsServicesDialogModule } from '@workout-tracker/services/dialog';
import { AddWorkoutExerciseTemplateDialogComponent } from './add-workout-exercise-template-dialog/add-workout-exercise-template-dialog.component';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AppRoutes, ExerciseTemplate } from '@workout-tracker/models';

describe('WorkoutExerciseTemplatesListComponent', () => {
  let component: WorkoutExerciseTemplatesListComponent;
  let fixture: ComponentFixture<WorkoutExerciseTemplatesListComponent>;
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
            ...exerciseTemplatesListStateMock,
            ...userStateMock
          }
        }),
      ],
      imports: [
        BrowserAnimationsModule,
        LibsServicesDialogModule,
        WorkoutExerciseTemplatesListComponent,
        WorkoutExerciseTemplatesFilterListComponent,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        }),
        RouterTestingModule.withRoutes([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutExerciseTemplatesListComponent);
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
    it('newExercise should request showDialog ', () => {
      const showDialogSpy = jest.spyOn(dialogService, 'showDialog')

      component.newExerciseTemplate()
      expect(showDialogSpy).toHaveBeenCalledWith(AddWorkoutExerciseTemplateDialogComponent, true)
    });

    it('openExerciseDetails should navigate to exercise details ', () => {
      const exerciseSut = { id: 'exerciseId'}  as ExerciseTemplate
      const navigateSpy = jest.spyOn(router, 'navigate')

      component.openExerciseTemplateDetails(exerciseSut)
      expect(navigateSpy).toHaveBeenCalledWith([`${AppRoutes.WorkoutExerciseTemplatesList}/${exerciseSut.id}`])
    });
  })
});
