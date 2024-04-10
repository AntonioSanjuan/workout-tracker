import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutExercisesListComponent } from './workout-exercises-list.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { userStateMock } from '@workout-tracker/test'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { workoutExercisesAppStateMock } from '../+state/test/workoutExercisesStateMock/workoutExercisesStateMock.mock'
import { WorkoutExercisesFilterListComponent } from './workout-exercises-list-filter/workout-exercises-list-filter.component';
import { DialogService, LibsServicesDialogModule } from '@workout-tracker/services/dialog';
import { AddWorkoutExerciseDialogComponent } from './add-workout-exercise.dialog/add-workout-exercise-dialog.component';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AppRoutes, ExerciseTemplate } from '@workout-tracker/models';

describe('WorkoutExercisesListComponent', () => {
  let component: WorkoutExercisesListComponent;
  let fixture: ComponentFixture<WorkoutExercisesListComponent>;
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
            ...workoutExercisesAppStateMock, 
            ...userStateMock
          }
        }),
      ],
      imports: [
        BrowserAnimationsModule,
        LibsServicesDialogModule,
        WorkoutExercisesListComponent,
        WorkoutExercisesFilterListComponent,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        }),
        RouterTestingModule.withRoutes([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutExercisesListComponent);
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

      component.newExercise()
      expect(showDialogSpy).toHaveBeenCalledWith(AddWorkoutExerciseDialogComponent, true)
    });

    it('openExerciseDetails should navigate to exercise details ', () => {
      const exerciseSut = { id: 'exerciseId'}  as ExerciseTemplate
      const navigateSpy = jest.spyOn(router, 'navigate')

      component.openExerciseDetails(exerciseSut)
      expect(navigateSpy).toHaveBeenCalledWith([`${AppRoutes.WorkoutExercisesList}/${exerciseSut.id}`])
    });
  })
});
