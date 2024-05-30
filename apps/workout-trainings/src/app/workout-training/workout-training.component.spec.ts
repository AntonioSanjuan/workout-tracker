import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { exerciseTemplatesListStateMock, userStateMock } from '@workout-tracker/test'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateFakeLoader, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { DialogService, LibsServicesDialogModule } from '@workout-tracker/services/dialog';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { WorkoutTrainingComponent } from './workout-training.component';
import { TrainingInfoComponent, ViewHeaderComponent } from '@workout-tracker/components';
import { workoutTrainingsAppStateMock } from '../+state/test/workoutTrainingsStateMock/workoutTrainingsStateMock.mock';
import { AddWorkoutTrainingExerciseDialogComponent } from './add-workout-training-exercise-dialog/add-workout-training-exercise-dialog.component';
import { selectWorkoutTraining } from './state/workout-training.selectors';
import { ExerciseTemplateQuery, Training, TrainingExercise } from '@workout-tracker/models';
import { appRoutes } from '../app.routes';
import { DatePipe } from '@angular/common';
import { LocalizedDatePipe } from '@workout-tracker/ui';
import { ExerciseTemplatesListState, getExerciseTemplatesListState } from '@workout-tracker/shared-store';
import { CopyWorkoutTrainingDialogComponent } from './copy-workout-training-dialog/copy-workout-training-dialog.component';

describe('WorkoutTrainingComponent', () => {
  let component: WorkoutTrainingComponent;
  let fixture: ComponentFixture<WorkoutTrainingComponent>;
  let dialogService: DialogService
  let store: MockStore;
  let translateService: TranslateService;
  let actions: Observable<Action>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        DatePipe,
        DialogService,
        provideMockActions(() => actions),
        provideMockStore({
          initialState: {
            ...workoutTrainingsAppStateMock, 
            ...exerciseTemplatesListStateMock,
            ...userStateMock,
          },
        }),
      ],
      imports: [
        DatePipe,
        LocalizedDatePipe, 
        BrowserAnimationsModule,
        ViewHeaderComponent,
        LibsServicesDialogModule,
        WorkoutTrainingComponent,
        TrainingInfoComponent,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        }),
        RouterTestingModule.withRoutes(appRoutes),

      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutTrainingComponent);
    store = TestBed.inject(MockStore)
    router = TestBed.inject(Router);
    dialogService = TestBed.inject(DialogService)
    translateService = TestBed.inject(TranslateService);

    translateService.currentLang = 'en'

    store.overrideSelector(selectWorkoutTraining, {
      id: 'trainingIdSut',
      creationDate: new Date(),
      muscleGroups: [],
      trainingExercises: [] 
    } as Training);
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
      expect(showDialogSpy).toHaveBeenCalledWith(AddWorkoutTrainingExerciseDialogComponent, false)
    });

    it('copyTraining should show dialog ', () => {
      const showDialogSpy = jest.spyOn(dialogService, 'showDialog')

      component.copyTraining()
      expect(showDialogSpy).toHaveBeenCalledWith(CopyWorkoutTrainingDialogComponent, true)
    });

    it('printTraining should request window.print', () => {
      const printSpy = jest.spyOn(window, 'print')

      component.printTraining()
      expect(printSpy).toHaveBeenCalledWith()
    });
  })
});
