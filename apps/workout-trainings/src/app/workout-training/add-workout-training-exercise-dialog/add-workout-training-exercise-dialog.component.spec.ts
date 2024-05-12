import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { exerciseTemplatesListStateMock, userStateMock } from '@workout-tracker/test'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ExerciseTemplate, MuscleGroups, MusclesInvolved, TrainingExercise, TrainingExerciseSerie, muscleInvolvedByGroups } from '@workout-tracker/models';
import { addUserTrainingListRequest, setExerciseTemplateListMuscleInvolvedQueryFilter } from '@workout-tracker/shared-store';
import { MusclesSelectorComponent } from '@workout-tracker/components';
import { workoutTrainingsAppStateMock } from '../../+state/test/workoutTrainingsStateMock/workoutTrainingsStateMock.mock';
import { AddWorkoutTrainingExerciseDialogComponent } from './add-workout-training-exercise-dialog.component';
import { addUserTrainingExerciseRequest } from '../state/workout-training.actions';

describe('AddWorkoutTrainingExerciseDialogComponent', () => {
  let component: AddWorkoutTrainingExerciseDialogComponent;
  let fixture: ComponentFixture<AddWorkoutTrainingExerciseDialogComponent>;
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
        AddWorkoutTrainingExerciseDialogComponent,
        MusclesSelectorComponent,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        }),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddWorkoutTrainingExerciseDialogComponent);
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
    describe('isSelected', () => {
      const exerciseTemplateIdSut = 'exerciseTemplateIdSut test'
      const exerciseTemplateSut = {id: exerciseTemplateIdSut} as ExerciseTemplate
      it('should return true if form has requested exerciseTemplate', () => {
        component.form.setValue({
          exerciseTemplate: exerciseTemplateSut
        })
        

        expect(component.isSelected(exerciseTemplateSut)).toBeTruthy()
      })
      it('should return false if form has not requested exerciseTemplate', () => {
        component.form.setValue({
          exerciseTemplate: null
        })
        expect(component.isSelected(exerciseTemplateSut)).toBeFalsy()

      })
    })
    describe('createTraining', () => {
      const exerciseTemplateSut = {id: 'exerciseTemplateIdTest'} as ExerciseTemplate
      describe('if form its valid', () => {
        const today = new Date(2020, 3, 1)
        beforeEach(() => {
          component.form.setValue({
            exerciseTemplate: exerciseTemplateSut
          })

          jest.useFakeTimers();
          jest.setSystemTime(today);
        })        

        afterEach(() => {
          jest.useRealTimers();
        })

        it('should dispatch addUserTrainingListRequest', () => {
          const dispatchSpy = jest.spyOn(store, 'dispatch')
          component.createTrainingExercise()

          expect(dispatchSpy).toHaveBeenCalledWith(addUserTrainingExerciseRequest({trainingExercise: {
            exerciseTemplate: exerciseTemplateSut,
            series: [] as TrainingExerciseSerie[]
          } as any}))
        });
      })
      describe('if form its not valid', () => {
        describe('all fields null', () => {
          beforeEach(() => {
            component.form.setValue({
              exerciseTemplate: null
            })
          })
  
          it('should not dispatch addUserTrainingListRequest', () => {
            const dispatchSpy = jest.spyOn(store, 'dispatch')
            component.createTrainingExercise()
  
            expect(dispatchSpy).not.toHaveBeenCalled()
          });
        })
      })
    })

    describe('filterByMuscleInvolved', () => {
      it('should dispatch setExerciseTemplateListMuscleInvolvedQueryFilter action', () => {
        const mulscleInvolvedSut = MusclesInvolved.Glutes
        const dispatchSpy = jest.spyOn(store, 'dispatch')

        component.filterByMuscleInvolved(mulscleInvolvedSut)

        expect(dispatchSpy).toHaveBeenCalledWith(setExerciseTemplateListMuscleInvolvedQueryFilter({ muscleInvolved: mulscleInvolvedSut }))
      })
    })
  })
});
