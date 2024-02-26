import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WorkoutExercisesFilterListComponent } from './workout-exercises-list-filter.component';
import { exercisesStateMock } from '@workout-tracker/test';
import { ExerciseType } from '@workout-tracker/models';
import { clearExerciseQueryFilter, setExerciseNameQueryFilter, setExerciseTypeQueryFilter } from '@workout-tracker/shared-store';

describe('WorkoutExercisesFilterListComponent', () => {
  let actions: Observable<Action>;
  let component: WorkoutExercisesFilterListComponent;
  let fixture: ComponentFixture<WorkoutExercisesFilterListComponent>;
  let router: Router
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        WorkoutExercisesFilterListComponent,
        // PokemonTypePillComponent,
        RouterTestingModule.withRoutes([]),
        BrowserAnimationsModule,
      ],
      providers:[
        provideMockActions(() => actions),
        provideMockStore({
          initialState: exercisesStateMock
        }),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutExercisesFilterListComponent);
    store = TestBed.inject(MockStore)
    router = TestBed.inject(Router)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Unit tests', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    
    it('toggle should switch collapsed prop value', () => {
      const initialCollapsedValue = component.collapsed;

      component.toggle()

      expect(component.collapsed).toEqual(!initialCollapsedValue)
    });
  })

  describe('Integration tests', () => {
    it('filterByExerciseType should dispatch setExerciseTypeQueryFilter', () => {
      const dispatchSpy = jest.spyOn(store, 'dispatch')

      const exerciseTypeSut = ExerciseType.Arms
      component.filterByExerciseType(exerciseTypeSut)

      expect(dispatchSpy).toHaveBeenCalledWith(setExerciseTypeQueryFilter({ 
        exerciseType: exerciseTypeSut
      }))
    });

    
    it('clearExerciseTypeFilter should dispatch clearExerciseQueryFilter', () => {
      const dispatchSpy = jest.spyOn(store, 'dispatch')

      component.clearExerciseTypeFilter()

      expect(dispatchSpy).toHaveBeenCalledWith(clearExerciseQueryFilter())
    });

    it('searchByName should dispatch setExerciseNameQueryFilter', () => {
      const dispatchSpy = jest.spyOn(store, 'dispatch')
      
      const searchSut = 'testing search'
      component.searchByName(searchSut)

      expect(dispatchSpy).toHaveBeenCalledWith(setExerciseNameQueryFilter({
        exerciseName: searchSut
      }))
    });
  })
});
