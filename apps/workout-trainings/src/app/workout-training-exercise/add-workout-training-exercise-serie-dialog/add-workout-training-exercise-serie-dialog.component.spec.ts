import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { exerciseTemplatesListStateMock, userStateMock } from '@workout-tracker/test'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TrainingExerciseSerie } from '@workout-tracker/models';
import { MusclesSelectorComponent } from '@workout-tracker/components';
import { workoutTrainingsAppStateMock } from '../../+state/test/workoutTrainingsStateMock/workoutTrainingsStateMock.mock';
import { AddWorkoutTrainingExerciseSerieDialogComponent } from './add-workout-training-exercise-serie-dialog.component';
import { addUserTrainingExerciseSerieRequest } from '../state/workout-training-exercise.actions';

describe('AddWorkoutTrainingExerciseSerieDialogComponent', () => {
  let component: AddWorkoutTrainingExerciseSerieDialogComponent;
  let fixture: ComponentFixture<AddWorkoutTrainingExerciseSerieDialogComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: MatDialogRef, useValue: { close: jest.fn()}},
        provideMockStore({
          initialState: {
            ...workoutTrainingsAppStateMock,
            ...exerciseTemplatesListStateMock,
            ...userStateMock
          }
        }),
      ],
      imports: [
        BrowserAnimationsModule,
        AddWorkoutTrainingExerciseSerieDialogComponent,
        MusclesSelectorComponent,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        }),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddWorkoutTrainingExerciseSerieDialogComponent);
    store = TestBed.inject(Store)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Unit tests', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  })

  describe('Integration tests', () => {
    describe('createTrainingExerciseSerie', () => {
      describe('if form its valid', () => {
        const trainingExerciseSerieSut = {
          weight: 1009,
          repetitions: 20,
        } as TrainingExerciseSerie
        const today = new Date(2020, 3, 1)

        beforeEach(() => {
          jest.useFakeTimers();
          jest.setSystemTime(today);

          component.form.setValue({
            weight: trainingExerciseSerieSut.weight,
            repetitions: trainingExerciseSerieSut.repetitions,
            observations: null
          })
        })

        it('should dispatch createTrainingExerciseSerie', () => {
          const dispatchSpy = jest.spyOn(store, 'dispatch')
          component.createTrainingExerciseSerie()

          expect(dispatchSpy).toHaveBeenCalledWith(addUserTrainingExerciseSerieRequest({trainingExerciseSerie: {
            weight: trainingExerciseSerieSut.weight,
            repetitions: trainingExerciseSerieSut.repetitions,
            observations: null,
            creationDate: today
          } as any}))
        });
      })
      describe('if form its not valid', () => {
        describe('all fields null', () => {
          beforeEach(() => {
            component.form.setValue({
              weight: null,
              repetitions: null,
              observations: null
            })
          })
  
          it('should not dispatch createTrainingExerciseSerie', () => {
            const dispatchSpy = jest.spyOn(store, 'dispatch')
            component.createTrainingExerciseSerie()
  
            expect(dispatchSpy).not.toHaveBeenCalled()
          });
        })
      })
    })
  })
});
