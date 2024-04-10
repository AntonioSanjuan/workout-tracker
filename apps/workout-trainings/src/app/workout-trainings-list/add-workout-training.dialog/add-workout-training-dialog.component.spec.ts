import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddWorkoutTrainingDialogComponent } from './add-workout-training-dialog.component';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { userStateMock } from '@workout-tracker/test'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MuscleGroups } from '@workout-tracker/models';
import { addUserTrainingRequest } from '@workout-tracker/shared-store';
import { MusclesSelectorComponent } from '@workout-tracker/components';
import { workoutTrainingsAppStateMock } from '../../+state/test/workoutTrainingsStateMock/workoutTrainingsStateMock.mock';

describe('AddWorkoutTrainingDialogComponent', () => {
  let component: AddWorkoutTrainingDialogComponent;
  let fixture: ComponentFixture<AddWorkoutTrainingDialogComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: MatDialogRef, useValue: { close: jest.fn()}},
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
  })

  describe('Integration tests', () => {
    describe('createTraining', () => {
      const inputMusclesGroups = [MuscleGroups.Chest, MuscleGroups.Back]
      const inputObservations = null
      describe('if form its valid', () => {
        const today = new Date(2020, 3, 1)
        beforeEach(() => {
          component.form.setValue({
            muscleGroups: inputMusclesGroups,
            observations: inputObservations
          })

          jest.useFakeTimers();
          jest.setSystemTime(today);
        })        

        afterEach(() => {
          jest.useRealTimers();
        })

        it('should dispatch addUserTrainingRequest', () => {
          const dispatchSpy = jest.spyOn(store, 'dispatch')
          component.createTraining()

          expect(dispatchSpy).toHaveBeenCalledWith(addUserTrainingRequest({training: {
            muscleGroups: inputMusclesGroups,
            observations: inputObservations,
            creationDate: today
          } as any}))
        });
      })
      describe('if form its not valid', () => {
        describe('all fields null', () => {
          beforeEach(() => {
            component.form.setValue({
              muscleGroups: null,
              observations: null
            })
          })
  
          it('should not dispatch addUserTrainingRequest', () => {
            const dispatchSpy = jest.spyOn(store, 'dispatch')
            component.createTraining()
  
            expect(dispatchSpy).not.toHaveBeenCalled()
          });
        })

        describe('muscleGroups are null', () => {
          beforeEach(() => {
            component.form.setValue({
              muscleGroups: null,
              observations:''
            })
          })
  
          it('should not dispatch addUserTrainingRequest', () => {
            const dispatchSpy = jest.spyOn(store, 'dispatch')
            component.createTraining()
  
            expect(dispatchSpy).not.toHaveBeenCalled()
          });
        })

        describe('muscleGroups length zero', () => {
          beforeEach(() => {
            component.form.setValue({
              muscleGroups: [],
              observations: null
            })
          })
  
          it('should not dispatch addUserTrainingRequest', () => {
            const dispatchSpy = jest.spyOn(store, 'dispatch')
            component.createTraining()
  
            expect(dispatchSpy).not.toHaveBeenCalled()  
          });
        })
      })
    })
  })
});
