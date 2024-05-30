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

    describe('substractWeight', () => {
      describe('current form weight value is null', () => {
        beforeEach(() => {
          component.form.patchValue({
            weight: null
          })
        })
  
        it('should set value to 0', () => {
          component.substractWeight()

          expect(component.form.value.weight).toEqual(0)
        })
      })

      describe('current form weight value is 0', () => {
        beforeEach(() => {
          component.form.patchValue({
            weight: 0
          })
        })
  
        it('should set value to 0', () => {
          component.substractWeight()

          expect(component.form.value.weight).toEqual(0)
        })
      })

      describe('current form weight value is lesser than 1.25', () => {
        const currentWeightValue = 1
        beforeEach(() => {
          component.form.patchValue({
            weight: currentWeightValue
          })
        })
  
        it('should set value to substraction', () => {
          component.substractWeight()

          expect(component.form.value.weight).toEqual(0)
        })
      })

      describe('current form weight value is bigguer than 1.25', () => {
        const currentWeightValue = 2
        beforeEach(() => {
          component.form.patchValue({
            weight: currentWeightValue
          })
        })
  
        it('should set value to substraction', () => {
          component.substractWeight()

          expect(component.form.value.weight).toBeGreaterThan(0)
        })
      })
    });

    describe('addWeight', () => {
      describe('current form weight value is null', () => {
        beforeEach(() => {
          component.form.patchValue({
            weight: null
          })
        })
  
        it('should set value to addiction', () => {
          component.addWeight()

          expect(component.form.value.weight).toBeGreaterThan(0)
        })
      })

      describe('current form weight value is 0', () => {
        beforeEach(() => {
          component.form.patchValue({
            weight: 0
          })
        })
  
        it('should set value to 0', () => {
          component.addWeight()

          expect(component.form.value.weight).toBeGreaterThan(0)
        })
      })

      describe('current form weight value is lesser than 1.25', () => {
        const currentWeightValue = 1
        beforeEach(() => {
          component.form.patchValue({
            weight: currentWeightValue
          })
        })
  
        it('should set value to substraction', () => {
          component.addWeight()

          expect(component.form.value.weight).toBeGreaterThan(0)
        })
      })

      describe('current form weight value is bigguer than 1.25', () => {
        const currentWeightValue = 2
        beforeEach(() => {
          component.form.patchValue({
            weight: currentWeightValue
          })
        })
  
        it('should set value to substraction', () => {
          component.addWeight()

          expect(component.form.value.weight).toBeGreaterThan(0)
        })
      })
    });

    describe('substractRepetition', () => {
      describe('current form repetitions value is null', () => {
        beforeEach(() => {
          component.form.patchValue({
            repetitions: null
          })
        })
  
        it('should set value to 0', () => {
          component.substractRepetition()

          expect(component.form.value.repetitions).toEqual(0)
        })
      })

      describe('current form repetitions value is 0', () => {
        beforeEach(() => {
          component.form.patchValue({
            repetitions: 0
          })
        })
  
        it('should set value to 0', () => {
          component.substractRepetition()

          expect(component.form.value.repetitions).toEqual(0)
        })
      })

      describe('current form repetitions value is lesser than 1', () => {
        const currentRepetitionValue = 0
        beforeEach(() => {
          component.form.patchValue({
            repetitions: currentRepetitionValue
          })
        })
  
        it('should set value to substraction', () => {
          component.substractRepetition()

          expect(component.form.value.repetitions).toEqual(0)
        })
      })

      describe('current form repetitions value is bigguer than 1', () => {
        const currentWeightValue = 2
        beforeEach(() => {
          component.form.patchValue({
            repetitions: currentWeightValue
          })
        })
  
        it('should set value to substraction', () => {
          component.substractRepetition()

          expect(component.form.value.repetitions).toBeGreaterThan(0)
        })
      })
    });
  })
});
