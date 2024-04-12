import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WorkoutExerciseTemplatesFilterListComponent } from './workout-exercise-templates-list-filter.component';
import { MusclesInvolved } from '@workout-tracker/models';
import { clearExerciseTemplateListQueryFilter, setExerciseTemplateListNameQueryFilter, setExerciseTemplateListMuscleInvolvedQueryFilter } from '@workout-tracker/shared-store';
import { MusclesGroupsSelectorComponent } from '@workout-tracker/components';
import { workoutExerciseTemplatesAppStateMock } from '../../+state/test/workoutExercisesStateMock/workoutExerciseTemplatesStateMock.mock';

describe('WorkoutExercisesFilterListComponent', () => {
  let actions: Observable<Action>;
  let component: WorkoutExerciseTemplatesFilterListComponent;
  let fixture: ComponentFixture<WorkoutExerciseTemplatesFilterListComponent>;
  let router: Router
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        WorkoutExerciseTemplatesFilterListComponent,
        MusclesGroupsSelectorComponent,
        RouterTestingModule.withRoutes([]),
        BrowserAnimationsModule,
      ],
      providers:[
        provideMockActions(() => actions),
        provideMockStore({
          initialState: {
            ...workoutExerciseTemplatesAppStateMock
          }
        }),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutExerciseTemplatesFilterListComponent);
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
    it('filterByMuscleInvolved should dispatch setExerciseTemplateListMuscleInvolvedQueryFilter', () => {
      const dispatchSpy = jest.spyOn(store, 'dispatch')

      const muscleInvolvedSut = MusclesInvolved.Biceps
      component.filterByMuscleInvolved(muscleInvolvedSut)

      expect(dispatchSpy).toHaveBeenCalledWith(setExerciseTemplateListMuscleInvolvedQueryFilter({ 
        muscleInvolved: muscleInvolvedSut
      }))
    });

    
    it('clearMuscleInvolvedFilter should dispatch clearExerciseTemplateListQueryFilter', () => {
      const dispatchSpy = jest.spyOn(store, 'dispatch')

      component.clearMuscleInvolvedFilter()

      expect(dispatchSpy).toHaveBeenCalledWith(clearExerciseTemplateListQueryFilter())
    });

    it('searchByName should dispatch setExerciseTemplateListNameQueryFilter', () => {
      const dispatchSpy = jest.spyOn(store, 'dispatch')
      
      const searchSut = 'testing search'
      component.exerciseTemplatesListFilterForm?.setValue({
        byName: searchSut,
        byMuscles: []
      })
      component.searchByName()

      expect(dispatchSpy).toHaveBeenCalledWith(setExerciseTemplateListNameQueryFilter({
        exerciseName: searchSut
      }))
    });
  })
});
