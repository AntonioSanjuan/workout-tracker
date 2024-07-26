import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { exerciseTemplatesListStateMock, userStateMock } from '@workout-tracker/test'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Training } from '@workout-tracker/models';
import { copyUserTrainingListRequest } from '@workout-tracker/shared-store';
import { workoutTrainingsAppStateMock } from '../../+state/test/workoutTrainingsStateMock/workoutTrainingsStateMock.mock';
import { CopyWorkoutTrainingDialogComponent } from './copy-workout-training-dialog.component';

describe('AddWorkoutTrainingExerciseDialogComponent', () => {
  let component: CopyWorkoutTrainingDialogComponent;
  let fixture: ComponentFixture<CopyWorkoutTrainingDialogComponent>;
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
        CopyWorkoutTrainingDialogComponent,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        }),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CopyWorkoutTrainingDialogComponent);
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
      const trainingSut = {id: 'trainingId test'} as Training

      it('should dispatch copyUserTrainingListRequest', () => {
        const dispatchSpy = jest.spyOn(store, 'dispatch')
        component.copyTraining(trainingSut)

        expect(dispatchSpy).toHaveBeenCalledWith(copyUserTrainingListRequest({
          training: trainingSut
        }))
      });
    })
  })
});
