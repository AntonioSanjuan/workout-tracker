import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { exerciseTemplatesListStateMock, userStateMock } from '@workout-tracker/test'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ExerciseTemplate, ExerciseType, StrengthTypeData, TrainingExercise, TrainingExerciseSerie } from '@workout-tracker/models';
import { MusclesSelectorComponent } from '@workout-tracker/components';
import { workoutTrainingsAppStateMock } from '../../+state/test/workoutTrainingsStateMock/workoutTrainingsStateMock.mock';
import { AddWorkoutTrainingExerciseSerieDialogComponent } from './add-workout-training-exercise-serie-dialog.component';
import { addUserTrainingExerciseSerieRequest } from '../state/workout-training-exercise.actions';

describe('AddWorkoutTrainingExerciseSerieDialogComponent', () => {
  let component: AddWorkoutTrainingExerciseSerieDialogComponent;
  let fixture: ComponentFixture<AddWorkoutTrainingExerciseSerieDialogComponent>;
  let store: Store;
  const trainingExerciseSut = {
    id: 'trainingExercise id test',
    creationDate: new Date(),
    exerciseTemplate: {
      type: ExerciseType.Strength
    } as ExerciseTemplate,
    series: []
  } as TrainingExercise

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: trainingExerciseSut
        },
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

    it('getExerciseType should return exerciseTemplate type', () => {
      expect(component.getExerciseType()).toEqual(trainingExerciseSut.exerciseTemplate.type)
    });
  })

  describe('Integration tests', () => {
    describe('createTrainingExerciseSerie', () => {
      describe('if form its valid', () => {
        const trainingExerciseSerieSut = {
          data: {
            weight: 1009,
            repetitions: 20,
          }
        } as TrainingExerciseSerie
        const today = new Date(2020, 3, 1)

        beforeEach(() => {
          jest.useFakeTimers();
          jest.setSystemTime(today);

          component.form.setValue({
            data: {
              weight: (trainingExerciseSerieSut.data as StrengthTypeData).weight,
              repetitions: (trainingExerciseSerieSut.data as StrengthTypeData).repetitions,
              speed: null,
              duration: null
            },
            observations: null
          })
        })

        it('should dispatch createTrainingExerciseSerie', () => {
          const dispatchSpy = jest.spyOn(store, 'dispatch')
          component.createTrainingExerciseSerie()

          expect(dispatchSpy).toHaveBeenCalledWith(addUserTrainingExerciseSerieRequest({trainingExerciseSerie: {
            data: {
              weight: (trainingExerciseSerieSut.data as StrengthTypeData).weight,
              repetitions: (trainingExerciseSerieSut.data as StrengthTypeData).repetitions,
              speed: null,
              duration: null
            },
            observations: null,
            creationDate: today
          } as any}))
        });
      })
      describe('if form its not valid', () => {
        describe('all fields null', () => {
          beforeEach(() => {
            component.form.setValue({
              data: {
                weight: null,
                repetitions: null,
                speed: null,
                duration: null
              },
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
            data: {
              weight: null
            }
          })
        })
  
        it('should set value to 0', () => {
          component.substractWeight()

          expect(component.form.value.data?.weight).toEqual(0)
        })
      })

      describe('current form weight value is 0', () => {
        beforeEach(() => {
          component.form.patchValue({
            data: {
              weight: 0
            }
          })
        })
  
        it('should set value to 0', () => {
          component.substractWeight()

          expect(component.form.value.data?.weight).toEqual(0)
        })
      })

      describe('current form weight value is lesser than 1.25', () => {
        const currentWeightValue = 1
        beforeEach(() => {
          component.form.patchValue({
            data: {
              weight: currentWeightValue
            }
          })
        })
  
        it('should set value to substraction', () => {
          component.substractWeight()

          expect(component.form.value.data?.weight).toEqual(0)
        })
      })

      describe('current form weight value is bigguer than 1.25', () => {
        const currentWeightValue = 2
        beforeEach(() => {
          component.form.patchValue({
            data: {
              weight: currentWeightValue
            }
          })
        })
  
        it('should set value to substraction', () => {
          component.substractWeight()

          expect(component.form.value.data?.weight).toBeGreaterThan(0)
        })
      })
    });

    describe('addWeight', () => {
      describe('current form weight value is null', () => {
        beforeEach(() => {
          component.form.patchValue({
            data: {
              weight: null
            }
          })
        })
  
        it('should set value to addiction', () => {
          component.addWeight()

          expect(component.form.value.data?.weight).toBeGreaterThan(0)
        })
      })

      describe('current form weight value is 0', () => {
        beforeEach(() => {
          component.form.patchValue({
            data: {
              weight: 0
            }
          })
        })
  
        it('should set value to 0', () => {
          component.addWeight()

          expect(component.form.value.data?.weight).toBeGreaterThan(0)
        })
      })

      describe('current form weight value is lesser than 1.25', () => {
        const currentWeightValue = 1
        beforeEach(() => {
          component.form.patchValue({
            data: {
              weight: currentWeightValue
            }
          })
        })
  
        it('should set value to substraction', () => {
          component.addWeight()

          expect(component.form.value.data?.weight).toBeGreaterThan(0)
        })
      })

      describe('current form weight value is bigguer than 1.25', () => {
        const currentWeightValue = 2
        beforeEach(() => {
          component.form.patchValue({
            data: {
              weight: currentWeightValue
            }
          })
        })
  
        it('should set value to substraction', () => {
          component.addWeight()

          expect(component.form.value.data?.weight).toBeGreaterThan(0)
        })
      })
    });

    describe('substractRepetition', () => {
      describe('current form repetitions value is null', () => {
        beforeEach(() => {
          component.form.patchValue({
            data: {
              repetitions: null
            }
          })
        })
  
        it('should set value to 0', () => {
          component.substractRepetition()

          expect(component.form.value.data?.repetitions).toEqual(0)
        })
      })

      describe('current form repetitions value is 0', () => {
        beforeEach(() => {
          component.form.patchValue({
            data: {
              repetitions: 0
            }
          })
        })
  
        it('should set value to 0', () => {
          component.substractRepetition()

          expect(component.form.value.data?.repetitions).toEqual(0)
        })
      })

      describe('current form repetitions value is lesser than 1', () => {
        const currentRepetitionValue = 0
        beforeEach(() => {
          component.form.patchValue({
            data: {
              repetitions: currentRepetitionValue
            }
          })
        })
  
        it('should set value to substraction', () => {
          component.substractRepetition()

          expect(component.form.value.data?.repetitions).toEqual(0)
        })
      })

      describe('current form repetitions value is bigguer than 1', () => {
        const currentWeightValue = 2
        beforeEach(() => {
          component.form.patchValue({
            data: {
              repetitions: currentWeightValue
            }
          })
        })
  
        it('should set value to substraction', () => {
          component.substractRepetition()

          expect(component.form.value.data?.repetitions).toBeGreaterThan(0)
        })
      })
    });

    describe('addRepetition', () => {
      describe('current form repetitions value is null', () => {
        beforeEach(() => {
          component.form.patchValue({
            data: {
              repetitions: null
            }
          })
        })
  
        it('should set value to addiction', () => {
          component.addRepetition()

          expect(component.form.value.data?.repetitions).toBeGreaterThan(0)
        })
      })

      describe('current form repetitions value is 0', () => {
        beforeEach(() => {
          component.form.patchValue({
            data: {
              repetitions: 0
            }
          })
        })
  
        it('should set value to 0', () => {
          component.addRepetition()

          expect(component.form.value.data?.repetitions).toBeGreaterThan(0)
        })
      })

      describe('current form repetitions value is lesser than 1.25', () => {
        const currentRepetitionValue = 1
        beforeEach(() => {
          component.form.patchValue({
            data: {
              repetitions: currentRepetitionValue
            }
          })
        })
  
        it('should set value to substraction', () => {
          component.addRepetition()

          expect(component.form.value.data?.repetitions).toBeGreaterThan(0)
        })
      })

      describe('current form repetitions value is bigguer than 1.25', () => {
        const currentRepetitionValue = 2
        beforeEach(() => {
          component.form.patchValue({
            data: {
              repetitions: currentRepetitionValue
            }
          })
        })
  
        it('should set value to substraction', () => {
          component.addRepetition()

          expect(component.form.value.data?.repetitions).toBeGreaterThan(0)
        })
      })
    });

    describe('substractDuration', () => {
      describe('current form duration value is null', () => {
        beforeEach(() => {
          component.form.patchValue({
            data: {
              duration: null
            }
          })
        })
  
        it('should set value to 0', () => {
          component.substractDuration()

          expect(component.form.value.data?.duration).toEqual(0)
        })
      })

      describe('current form duration value is 0', () => {
        beforeEach(() => {
          component.form.patchValue({
            data: {
              duration: 0
            }
          })
        })
  
        it('should set value to 0', () => {
          component.substractDuration()

          expect(component.form.value.data?.duration).toEqual(0)
        })
      })

      describe('current form repetitions value is lesser than 1', () => {
        const currentDurationValue = 0
        beforeEach(() => {
          component.form.patchValue({
            data: {
              duration: currentDurationValue
            }
          })
        })
  
        it('should set value to substraction', () => {
          component.substractDuration()

          expect(component.form.value.data?.duration).toEqual(0)
        })
      })

      describe('current form duration value is bigguer than 1', () => {
        const currentDurationValue = 2
        beforeEach(() => {
          component.form.patchValue({
            data: {
              duration: currentDurationValue
            }
          })
        })
  
        it('should set value to substraction', () => {
          component.substractDuration()

          expect(component.form.value.data?.duration).toBeGreaterThan(0)
        })
      })
    });

    describe('addDuration', () => {
      describe('current form duration value is null', () => {
        beforeEach(() => {
          component.form.patchValue({
            data: {
              duration: null
            }
          })
        })
  
        it('should set value to addiction', () => {
          component.addDuration()

          expect(component.form.value.data?.duration).toBeGreaterThan(0)
        })
      })

      describe('current form duration value is 0', () => {
        beforeEach(() => {
          component.form.patchValue({
            data: {
              duration: 0
            }
          })
        })
  
        it('should set value to 0', () => {
          component.addDuration()

          expect(component.form.value.data?.duration).toBeGreaterThan(0)
        })
      })

      describe('current form duration value is lesser than 1.25', () => {
        const currentDurationValue = 1
        beforeEach(() => {
          component.form.patchValue({
            data: {
              duration: currentDurationValue
            }
          })
        })
  
        it('should set value to substraction', () => {
          component.addDuration()

          expect(component.form.value.data?.duration).toBeGreaterThan(0)
        })
      })

      describe('current form duration value is bigguer than 1.25', () => {
        const currentDurationValue = 2
        beforeEach(() => {
          component.form.patchValue({
            data: {
              duration: currentDurationValue
            }
          })
        })
  
        it('should set value to substraction', () => {
          component.addDuration()

          expect(component.form.value.data?.duration).toBeGreaterThan(0)
        })
      })
    });

    describe('substractSpeed', () => {
      describe('current form speed value is null', () => {
        beforeEach(() => {
          component.form.patchValue({
            data: {
              speed: null
            }
          })
        })
  
        it('should set value to 0', () => {
          component.substractSpeed()

          expect(component.form.value.data?.speed).toEqual(0)
        })
      })

      describe('current form speed value is 0', () => {
        beforeEach(() => {
          component.form.patchValue({
            data: {
              speed: 0
            }
          })
        })
  
        it('should set value to 0', () => {
          component.substractSpeed()

          expect(component.form.value.data?.speed).toEqual(0)
        })
      })

      describe('current form speed value is lesser than 1', () => {
        const currentSpeedValue = 0
        beforeEach(() => {
          component.form.patchValue({
            data: {
              speed: currentSpeedValue
            }
          })
        })
  
        it('should set value to substraction', () => {
          component.substractSpeed()

          expect(component.form.value.data?.speed).toEqual(0)
        })
      })

      describe('current form speed value is bigguer than 1', () => {
        const currentSpeedValue = 2
        beforeEach(() => {
          component.form.patchValue({
            data: {
              speed: currentSpeedValue
            }
          })
        })
  
        it('should set value to substraction', () => {
          component.substractSpeed()

          expect(component.form.value.data?.speed).toBeGreaterThan(0)
        })
      })
    });

    describe('addSpeed', () => {
      describe('current form speed value is null', () => {
        beforeEach(() => {
          component.form.patchValue({
            data: {
              speed: null
            }
          })
        })
  
        it('should set value to addiction', () => {
          component.addSpeed()

          expect(component.form.value.data?.speed).toBeGreaterThan(0)
        })
      })

      describe('current form speed value is 0', () => {
        beforeEach(() => {
          component.form.patchValue({
            data: {
              speed: 0
            }
          })
        })
  
        it('should set value to 0', () => {
          component.addSpeed()

          expect(component.form.value.data?.speed).toBeGreaterThan(0)
        })
      })

      describe('current form duration value is lesser than 1.25', () => {
        const currentSpeedValue = 1
        beforeEach(() => {
          component.form.patchValue({
            data: {
              speed: currentSpeedValue
            }
          })
        })
  
        it('should set value to substraction', () => {
          component.addSpeed()

          expect(component.form.value.data?.speed).toBeGreaterThan(0)
        })
      })

      describe('current form speed value is bigguer than 1.25', () => {
        const currentDurationValue = 2
        beforeEach(() => {
          component.form.patchValue({
            data: {
              speed: currentDurationValue
            }
          })
        })
  
        it('should set value to substraction', () => {
          component.addSpeed()

          expect(component.form.value.data?.speed).toBeGreaterThan(0)
        })
      })
    });
  })
});
