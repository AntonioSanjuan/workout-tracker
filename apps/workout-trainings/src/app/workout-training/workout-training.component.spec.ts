import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { userStateMock, routerStateMock } from '@workout-tracker/test'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { DialogService, LibsServicesDialogModule } from '@workout-tracker/services/dialog';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AppRoutes, Training, TrainingExercise } from '@workout-tracker/models';
import { WorkoutTrainingComponent } from './workout-training.component';
import { ViewHeaderComponent } from '@workout-tracker/components';
import { workoutTrainingsAppStateMock } from '../+state/test/workoutTrainingsStateMock/workoutTrainingsStateMock.mock';
import { AddWorkoutTrainingExerciseDialogComponent } from './add-workout-training-exercise-dialog/add-workout-training-exercise-dialog.component';

describe('WorkoutTrainingComponent', () => {
  let component: WorkoutTrainingComponent;
  let fixture: ComponentFixture<WorkoutTrainingComponent>;
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
            ...workoutTrainingsAppStateMock, 
            ...userStateMock,
          }
        }),
      ],
      imports: [
        BrowserAnimationsModule,
        ViewHeaderComponent,
        LibsServicesDialogModule,
        WorkoutTrainingComponent,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        }),
        RouterTestingModule.withRoutes([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutTrainingComponent);
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

    it('openTrainingExercise should navigate to exercise details ', () => {
      const trainingSut = {id: 'trainingId test'} as Training
      const trainingExerciseSut = {id: 'trainingExerciseId test'} as TrainingExercise
      const navigateSpy = jest.spyOn(router, 'navigate')

      component.openTrainingExercise(trainingSut, trainingExerciseSut)
      expect(navigateSpy).toHaveBeenCalledWith([`/trainings/${trainingSut.id}/exercise/${trainingExerciseSut.id}`])
    });

    it('newTrainingExercise should show dialog ', () => {
      const showDialogSpy = jest.spyOn(dialogService, 'showDialog')

      component.newTrainingExercise()
      expect(showDialogSpy).toHaveBeenCalledWith(AddWorkoutTrainingExerciseDialogComponent, true)
    });
  })
});
