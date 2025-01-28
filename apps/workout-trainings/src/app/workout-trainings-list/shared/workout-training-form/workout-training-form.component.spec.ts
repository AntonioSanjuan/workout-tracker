import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutTrainingFormComponent } from './workout-training-form.component';
import { provideMockStore } from '@ngrx/store/testing';
import { userStateMock } from '@workout-tracker/test'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MuscleGroups } from '@workout-tracker/models';
import { MusclesSelectorComponent } from '@workout-tracker/components';
import { workoutTrainingsAppStateMock } from '../../../+state/test/workoutTrainingsStateMock/workoutTrainingsStateMock.mock';
import { MatStepper } from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';

describe('WorkoutTrainingFormComponent', () => {
  let component: WorkoutTrainingFormComponent;
  let fixture: ComponentFixture<WorkoutTrainingFormComponent>;
  let stepperMock: jest.Mocked<Partial<MatStepper>>;
  beforeEach(async () => {

    stepperMock = {
      selectedIndex: 0,
      next: jest.fn(),
    } as jest.Mocked<Partial<MatStepper>>;

    await TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          initialState: {
            ...workoutTrainingsAppStateMock,
            ...userStateMock
          }
        }),
      ],
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        WorkoutTrainingFormComponent,
        MusclesSelectorComponent,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        }),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutTrainingFormComponent);
    component = fixture.componentInstance;

    // Asignamos el mock del stepper al componente
    component['stepper'] = stepperMock as MatStepper;

    fixture.detectChanges();
  });

  describe('Unit tests', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    describe('isFormValid', () => {
      describe('if its valid', () => {
        const inputMusclesGroups = [MuscleGroups.Chest]
        const inputObservations = 'observation'
        beforeEach(() => {
          (component as any).form.setValue({
            muscleGroups: inputMusclesGroups,
            observations: inputObservations
          })
        })
        it('isFormValid should return true', () => {
          expect(component.isFormValid()).toBeTruthy();
        });
      })

      describe('if its not valid', () => {
        beforeEach(() => {
          (component as any).form.setValue({
            muscleGroups: null,
            observations: null
          })
        })
        it('isFormValid should return false', () => {
          expect(component.isFormValid()).toBeFalsy();
        });
      })
    })

    describe('getStepperIndex', () => {
      it('should return 0 initially', () => {
        expect(component.getStepperIndex()).toEqual(0)
      });

      it('should return step', () => {
        const currentStep = 1;
        component['stepper'] = {
          selectedIndex: currentStep
        } as any

        expect(component.getStepperIndex()).toEqual(currentStep)
      });
    })
  })

  describe('Integration tests', () => {
    describe('createTraining', () => {
      const inputMusclesGroups = [MuscleGroups.Chest, MuscleGroups.Back]
      const inputObservations = null
      describe('if form its valid', () => {
        beforeEach(() => {
          (component as any).form.setValue({
            muscleGroups: inputMusclesGroups,
            observations: inputObservations
          })
        })

        afterEach(() => {
          jest.useRealTimers();
        })

        it('form should be valid', () => {
          expect((component as any).form.valid).toBeTruthy()
        });
      })
      describe('if form its not valid', () => {
        describe('all fields null', () => {
          beforeEach(() => {
            (component as any).form.setValue({
              muscleGroups: null,
              observations: null
            })
          })

          it('form should be invalid', () => {
            expect((component as any).form.valid).toBeFalsy()
          });
        })

        describe('muscleGroups are null', () => {
          beforeEach(() => {
            (component as any).form.setValue({
              muscleGroups: null,
              observations: ''
            })
          })

          it('form should be invalid', () => {
            expect((component as any).form.valid).toBeFalsy()
          });
        })

        describe('muscleGroups length zero', () => {
          beforeEach(() => {
            (component as any).form.setValue({
              muscleGroups: [],
              observations: null
            })
          })

          it('form should be invalid', () => {
            expect((component as any).form.valid).toBeFalsy()
          });
        })
      })
    })
  })
});
