import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddWorkoutTrainingDialogComponent } from './add-workout-training-dialog.component';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { userStateMock } from '@workout-tracker/test'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Training } from '@workout-tracker/models';
import { MusclesSelectorComponent } from '@workout-tracker/components';
import { workoutTrainingsAppStateMock } from '../../+state/test/workoutTrainingsStateMock/workoutTrainingsStateMock.mock';
import { addUserTrainingListRequest } from '@workout-tracker/shared-store';
import { WorkoutTrainingFormComponent } from '../shared/workout-training-form/workout-training-form.component';

describe('AddWorkoutTrainingDialogComponent', () => {
  let component: AddWorkoutTrainingDialogComponent;
  let fixture: ComponentFixture<AddWorkoutTrainingDialogComponent>;
  let store: Store;

  const closeMock = jest.fn()
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: MatDialogRef, useValue: { close: closeMock } },
        provideMockStore({
          initialState: {
            ...workoutTrainingsAppStateMock,
            ...userStateMock
          }
        }),
      ],
      imports: [
        BrowserAnimationsModule,
        AddWorkoutTrainingDialogComponent,
        MusclesSelectorComponent,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        }),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddWorkoutTrainingDialogComponent);
    store = TestBed.inject(Store)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Unit tests', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    describe('getStepperIndex', () => {
      describe('if workoutTrainingFormComponent exists', () => {
        const stepperIndex = 10;
        beforeEach(() => {
          jest.spyOn(component.workoutTrainingFormComponent as WorkoutTrainingFormComponent, 'getStepperIndex')
            .mockReturnValue(stepperIndex)
        })
        it('should return getStepperIndex', () => {
          expect(component.getStepperIndex()).toEqual(stepperIndex)
        })
      })


      describe('if workoutTrainingFormComponent doesnt exists', () => {
        it('should return 0', () => {
          expect(component.getStepperIndex()).toEqual(0)
        })
      })
    })

    describe('nextStep', () => {
      let nextStepSpy: any;
      beforeEach(() => {
        nextStepSpy = jest.spyOn(component.workoutTrainingFormComponent as WorkoutTrainingFormComponent, 'nextStep')
          .mockReturnValue()
      })
      describe('if workoutTrainingFormComponent exists', () => {
        it('should request getStepperIndex', () => {
          component.nextStep()

          expect(nextStepSpy).toHaveBeenCalled()
        })
      })


      describe('if workoutTrainingFormComponent doesnt exists', () => {
        it('should return 0', () => {
          expect(component.getStepperIndex()).toEqual(0)
        })
      })
    })
  })

  describe('Integration tests', () => {
    describe('createTraining', () => {
      const today = new Date()

      beforeEach(() => {
        jest.useFakeTimers();
        jest.setSystemTime(today);
        closeMock.mockRestore();
      })

      afterEach(() => {
        jest.useRealTimers();
      })

      describe('if workoutTrainingFormComponent form its valid', () => {
        const trainingFormValue = {} as Training

        beforeEach(() => {
          jest.spyOn(component.workoutTrainingFormComponent as WorkoutTrainingFormComponent, 'isFormValid')
            .mockReturnValue(true)
          jest.spyOn(component.workoutTrainingFormComponent as WorkoutTrainingFormComponent, 'getTraining')
            .mockReturnValue(trainingFormValue)
        })

        it('should dispatch addUserTrainingListRequest with updated creationDate prop', () => {
          const dispatchSpy = jest.spyOn(store, 'dispatch')

          component.createTraining()

          expect(dispatchSpy).toHaveBeenCalledWith(addUserTrainingListRequest({
            training: {
              ...trainingFormValue,
              creationDate: today
            }
          }))
        })

        it('should request to close the dialog', () => {
          component.createTraining()

          expect(closeMock).toHaveBeenCalled()
        })

      })
      describe('if workoutTrainingFormComponent form its not valid', () => {
        beforeEach(() => {
          jest.spyOn(component.workoutTrainingFormComponent as WorkoutTrainingFormComponent, 'isFormValid')
            .mockReturnValue(false)
        })

        it('should not dispatch addUserTrainingListRequest with updated creationDate prop', () => {
          const dispatchSpy = jest.spyOn(store, 'dispatch')

          component.createTraining()

          expect(dispatchSpy).not.toHaveBeenCalled()
        })

        it('should not request to close the dialog', () => {
          component.createTraining()

          expect(closeMock).not.toHaveBeenCalled()
        })
      })
    })
  })
});
