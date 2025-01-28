import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditWorkoutTrainingDialogComponent } from './edit-workout-training-dialog.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { userStateMock } from '@workout-tracker/test'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MuscleGroups, Training } from '@workout-tracker/models';
import { MusclesSelectorComponent } from '@workout-tracker/components';
import { workoutTrainingsAppStateMock } from '../../+state/test/workoutTrainingsStateMock/workoutTrainingsStateMock.mock';
import { updateUserTrainingListRequest } from '@workout-tracker/shared-store';
import { WorkoutTrainingFormComponent } from '../shared/workout-training-form/workout-training-form.component';
import { selectWorkoutTraining } from '../../workout-training/state/workout-training.selectors';
describe('EditWorkoutTrainingDialogComponent', () => {
  let component: EditWorkoutTrainingDialogComponent;
  let fixture: ComponentFixture<EditWorkoutTrainingDialogComponent>;
  let store: MockStore;

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
        EditWorkoutTrainingDialogComponent,
        MusclesSelectorComponent,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        }),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditWorkoutTrainingDialogComponent);
    store = TestBed.inject(MockStore)
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
    describe('editTraining', () => {
      const today = new Date()
      const selectedWorkoutTraining = {
        muscleGroups: [MuscleGroups.Back],
        creationDate: new Date()
      } as Training

      beforeEach(() => {
        jest.useFakeTimers();
        jest.setSystemTime(today);
        closeMock.mockRestore();

        store.overrideSelector(selectWorkoutTraining, selectedWorkoutTraining)
      })

      afterEach(() => {
        jest.useRealTimers();
      })

      describe('if workoutTrainingFormComponent form its valid', () => {
        const trainingFormValue = {
          muscleGroups: [...selectedWorkoutTraining.muscleGroups, MuscleGroups.Arms]
        } as Training

        beforeEach(() => {
          jest.spyOn(component.workoutTrainingFormComponent as WorkoutTrainingFormComponent, 'isFormValid')
            .mockReturnValue(true)
          jest.spyOn(component.workoutTrainingFormComponent as WorkoutTrainingFormComponent, 'getTraining')
            .mockReturnValue(trainingFormValue)
        })

        it('should dispatch updateUserTrainingListRequest with updated training prop', () => {
          const dispatchSpy = jest.spyOn(store, 'dispatch')

          component.editTraining(selectedWorkoutTraining)

          expect(dispatchSpy).toHaveBeenCalledWith(updateUserTrainingListRequest({
            training: {
              ...selectedWorkoutTraining,
              ...trainingFormValue
            }
          }))
        })

        it('should request to close the dialog', () => {
          component.editTraining(selectedWorkoutTraining)

          expect(closeMock).toHaveBeenCalled()
        })

      })
      describe('if workoutTrainingFormComponent form its not valid', () => {
        beforeEach(() => {
          jest.spyOn(component.workoutTrainingFormComponent as WorkoutTrainingFormComponent, 'isFormValid')
            .mockReturnValue(false)
        })

        it('should not dispatch updateUserTrainingListRequest with updated creationDate prop', () => {
          const dispatchSpy = jest.spyOn(store, 'dispatch')

          component.editTraining(selectedWorkoutTraining)

          expect(dispatchSpy).not.toHaveBeenCalled()
        })

        it('should not request to close the dialog', () => {
          component.editTraining(selectedWorkoutTraining)

          expect(closeMock).not.toHaveBeenCalled()
        })
      })
    })
  })
});
