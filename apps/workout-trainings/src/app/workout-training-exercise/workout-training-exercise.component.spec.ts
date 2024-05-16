import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { userStateMock, routerStateMock } from '@workout-tracker/test'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { DialogService, LibsServicesDialogModule } from '@workout-tracker/services/dialog';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { WorkoutTrainingExerciseComponent } from './workout-training-exercise.component';
import { ViewHeaderComponent } from '@workout-tracker/components';
import { workoutTrainingsAppStateMock } from '../+state/test/workoutTrainingsStateMock/workoutTrainingsStateMock.mock';
import { appRoutes } from '../app.routes';
import { TrainingExerciseSerie } from '@workout-tracker/models';
import { deleteUserTrainingExerciseSerieRequest } from './state/workout-training-exercise.actions';

describe('WorkoutTrainingExerciseComponent', () => {
  let component: WorkoutTrainingExerciseComponent;
  let fixture: ComponentFixture<WorkoutTrainingExerciseComponent>;
  let dialogService: DialogService
  let store: MockStore;
  let actions: Observable<Action>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        DialogService,
        provideMockActions(() => actions),
        provideMockStore({
          initialState: {
            ...workoutTrainingsAppStateMock, 
            ...userStateMock,
          }
        }),
      ],
      imports: [
        BrowserAnimationsModule,
        ViewHeaderComponent,
        LibsServicesDialogModule,
        WorkoutTrainingExerciseComponent,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        }),
        RouterTestingModule.withRoutes(appRoutes)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutTrainingExerciseComponent);
    store = TestBed.inject(MockStore)
    router = TestBed.inject(Router);
    dialogService = TestBed.inject(DialogService)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Unit tests', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  })

  describe('Integration tests', () => {
    describe('deleteTrainingExerciseSerie', () => {
      const trainingExerciseSerieSut = { id: 'trainingExerciseSerie test'} as TrainingExerciseSerie
      it('should dispatch deleteTrainingExerciseSerie with event serie', () => {
        const dispatchSpy = jest.spyOn(store, 'dispatch')

        component.deleteTrainingExerciseSerie(trainingExerciseSerieSut)

        expect(dispatchSpy).toHaveBeenCalledWith(deleteUserTrainingExerciseSerieRequest( { trainingExerciseSerie: trainingExerciseSerieSut}))
      })
    })
  })
});
