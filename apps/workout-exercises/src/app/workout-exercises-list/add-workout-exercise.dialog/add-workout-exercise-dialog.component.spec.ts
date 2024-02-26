import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddWorkoutExerciseDialogComponent } from './add-workout-exercise-dialog.component';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { userStateMock, exercisesStateMock } from '@workout-tracker/test'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Exercise, ExerciseType } from '@workout-tracker/models';
import { addUserExerciseRequest } from '@workout-tracker/shared-store';

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

    describe('isSelectedExerciseType', () => {
      const exerciseTypeSut = ExerciseType.Chest
      describe('if its not selected', () => {        
        it('should return false', () => {
          expect(component.isSelectedExerciseType(exerciseTypeSut)).toBeFalsy()
        });
      })
      describe('if its selected', () => {
        beforeEach(() => {
          component.selectExerciseType(exerciseTypeSut)
          component.selectExerciseType(ExerciseType.Arms)
        })

        it('should return true', () => {
          expect(component.isSelectedExerciseType(exerciseTypeSut)).toBeTruthy()

        });
      })
    })

    describe('selectExerciseType', () => {
      const exerciseTypeSut = ExerciseType.Chest
      describe('if its not already selected', () => {
        beforeEach(() => {
          component.selectExerciseType(ExerciseType.Arms)
        })        
        it('should select it', () => {
          component.selectExerciseType(exerciseTypeSut)
          expect(component.isSelectedExerciseType(exerciseTypeSut)).toBeTruthy()
        });
      })
      describe('if its already selected', () => {
        beforeEach(() => {
          component.selectExerciseType(exerciseTypeSut)
          component.selectExerciseType(ExerciseType.Arms)
        })

        it('should deselect it', () => {
          component.selectExerciseType(exerciseTypeSut)
          expect(component.isSelectedExerciseType(exerciseTypeSut)).toBeFalsy()

        });
      })
    })
  })

  describe('Integration tests', () => {
    describe('createExercise', () => {
      const inputNameSut = 'name test'
      const inputTypesSut = [ExerciseType.Chest, ExerciseType.Arms]
      describe('if form its valid', () => {
        beforeEach(() => {
          component.form.setValue({
            name: inputNameSut,
            types: inputTypesSut
          })
        })        
        it('should dispatch addUserExercisesRequest', () => {
          const dispatchSpy = jest.spyOn(store, 'dispatch')
          component.createExercise()

          expect(dispatchSpy).toHaveBeenCalledWith(addUserExerciseRequest({exercise: {
            name:inputNameSut,
            types: inputTypesSut
          } as Exercise}))
        });
      })
      describe('if form its not valid', () => {
        describe('all fields null', () => {
          beforeEach(() => {
            component.form.setValue({
              name: null,
              types: null
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
              types: [ExerciseType.Arms]
            })
          })
  
          it('should not dispatch addUserExercisesRequest', () => {
            const dispatchSpy = jest.spyOn(store, 'dispatch')
            component.createExercise()
  
            expect(dispatchSpy).not.toHaveBeenCalled()
          });
        })

        describe('types are null', () => {
          beforeEach(() => {
            component.form.setValue({
              name: 'testName',
              types: null
            })
          })
  
          it('should not dispatch addUserExercisesRequest', () => {
            const dispatchSpy = jest.spyOn(store, 'dispatch')
            component.createExercise()
  
            expect(dispatchSpy).not.toHaveBeenCalled()
          });
        })

        describe('types length zero', () => {
          beforeEach(() => {
            component.form.setValue({
              name: 'testName',
              types: []
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
