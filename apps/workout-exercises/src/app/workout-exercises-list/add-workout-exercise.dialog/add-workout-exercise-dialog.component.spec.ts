import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddWorkoutExerciseDialogComponent } from './add-workout-exercise-dialog.component';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { userStateMock, exercisesStateMock } from '@workout-tracker/test'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Exercise, MusclesInvolved } from '@workout-tracker/models';
import { addUserExerciseRequest } from '@workout-tracker/shared-store';
import { MusclesSelectorComponent } from '@workout-tracker/components';

describe('WorkoutExercisesListComponent', () => {
  let component: AddWorkoutExerciseDialogComponent;
  let fixture: ComponentFixture<AddWorkoutExerciseDialogComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: MatDialogRef, useValue: { close: jest.fn()}},
        provideMockStore({
          initialState: {
            ...exercisesStateMock,
            ...userStateMock
          }
        }),
      ],
      imports: [
        BrowserAnimationsModule,
        AddWorkoutExerciseDialogComponent,
        MusclesSelectorComponent,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        }),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddWorkoutExerciseDialogComponent);
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
    describe('createExercise', () => {
      const inputNameSut = 'name test'
      const inputMusclesInvolved = [MusclesInvolved.Chest, MusclesInvolved.Traps]
      const inputObservations = null
      describe('if form its valid', () => {
        const today = new Date(2020, 3, 1)
        beforeEach(() => {
          component.form.setValue({
            name: inputNameSut,
            musclesInvolved: inputMusclesInvolved,
            observations: inputObservations
          })

          jest.useFakeTimers();
          jest.setSystemTime(today);
        })        

        afterEach(() => {
          jest.useRealTimers();
        })

        it('should dispatch addUserExercisesRequest', () => {
          const dispatchSpy = jest.spyOn(store, 'dispatch')
          component.createExercise()

          expect(dispatchSpy).toHaveBeenCalledWith(addUserExerciseRequest({exercise: {
            name:inputNameSut,
            musclesInvolved: inputMusclesInvolved,
            observations: inputObservations,
            creationDate: today
          } as any}))
        });
      })
      describe('if form its not valid', () => {
        describe('all fields null', () => {
          beforeEach(() => {
            component.form.setValue({
              name: null,
              musclesInvolved: null,
              observations: null
            })
          })
  
          it('should not dispatch addUserExercisesRequest', () => {
            const dispatchSpy = jest.spyOn(store, 'dispatch')
            component.createExercise()
  
            expect(dispatchSpy).not.toHaveBeenCalled()
          });
        })
        describe('name its null', () => {
          beforeEach(() => {
            component.form.setValue({
              name: null,
              musclesInvolved: [MusclesInvolved.Adductors],
              observations: ''
            })
          })
  
          it('should not dispatch addUserExercisesRequest', () => {
            const dispatchSpy = jest.spyOn(store, 'dispatch')
            component.createExercise()
  
            expect(dispatchSpy).not.toHaveBeenCalled()
          });
        })

        describe('musclesInvolved are null', () => {
          beforeEach(() => {
            component.form.setValue({
              name: 'testName',
              musclesInvolved: null,
              observations:''
            })
          })
  
          it('should not dispatch addUserExercisesRequest', () => {
            const dispatchSpy = jest.spyOn(store, 'dispatch')
            component.createExercise()
  
            expect(dispatchSpy).not.toHaveBeenCalled()
          });
        })

        describe('musclesInvolved length zero', () => {
          beforeEach(() => {
            component.form.setValue({
              name: 'testName',
              musclesInvolved: [],
              observations: null
            })
          })
  
          it('should not dispatch addUserExercisesRequest', () => {
            const dispatchSpy = jest.spyOn(store, 'dispatch')
            component.createExercise()
  
            expect(dispatchSpy).not.toHaveBeenCalled()  
          });
        })
      })
    })
  })
});
