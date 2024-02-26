import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutExercisesListComponent } from './workout-exercises-list.component';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { userStateMock, exercisesStateMock } from '@workout-tracker/test'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { workoutExercisesAppStateMock } from '../+state/test/workoutExercisesStateMock/workoutExercisesStateMock.mock'
import { WorkoutExercisesFilterListComponent } from './workout-exercises-list-filter/workout-exercises-list-filter.component';

describe('WorkoutExercisesListComponent', () => {
  let component: WorkoutExercisesListComponent;
  let fixture: ComponentFixture<WorkoutExercisesListComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          initialState: {
            ...exercisesStateMock,
            ...workoutExercisesAppStateMock, 
            ...userStateMock
          }
        }),
      ],
      imports: [
        BrowserAnimationsModule,
        WorkoutExercisesListComponent,
        WorkoutExercisesFilterListComponent,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        }),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutExercisesListComponent);
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
  })
});
