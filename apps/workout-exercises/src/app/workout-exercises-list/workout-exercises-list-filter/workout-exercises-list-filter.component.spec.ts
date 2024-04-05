import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WorkoutExercisesFilterListComponent } from './workout-exercises-list-filter.component';
import { exerciseTemplatesStateMock } from '@workout-tracker/test';
import { MusclesInvolved } from '@workout-tracker/models';
import { clearExerciseTemplateQueryFilter, setExerciseTemplateNameQueryFilter, setExerciseTemplateMuscleInvolvedQueryFilter } from '@workout-tracker/shared-store';
import { MusclesGroupsSelectorComponent, MusclesSelectorComponent } from '@workout-tracker/components';

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
        MusclesGroupsSelectorComponent,
        RouterTestingModule.withRoutes([]),
        BrowserAnimationsModule,
      ],
      providers:[
        provideMockActions(() => actions),
        provideMockStore({
          initialState: exerciseTemplatesStateMock
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
    it('filterByMuscleInvolved should dispatch setExerciseTemplateMuscleInvolvedQueryFilter', () => {
      const dispatchSpy = jest.spyOn(store, 'dispatch')

      const muscleInvolvedSut = MusclesInvolved.Biceps
      component.filterByMuscleInvolved(muscleInvolvedSut)

      expect(dispatchSpy).toHaveBeenCalledWith(setExerciseTemplateMuscleInvolvedQueryFilter({ 
        muscleInvolved: muscleInvolvedSut
      }))
    });

    
    it('clearMuscleInvolvedFilter should dispatch clearExerciseTemplateQueryFilter', () => {
      const dispatchSpy = jest.spyOn(store, 'dispatch')

      component.clearMuscleInvolvedFilter()

      expect(dispatchSpy).toHaveBeenCalledWith(clearExerciseTemplateQueryFilter())
    });

    it('searchByName should dispatch setExerciseTemplateNameQueryFilter', () => {
      const dispatchSpy = jest.spyOn(store, 'dispatch')
      
      const searchSut = 'testing search'
      component.exercisesListFilterForm?.setValue({
        byName: searchSut,
        byMuscles: []
      })
      component.searchByName()

      expect(dispatchSpy).toHaveBeenCalledWith(setExerciseTemplateNameQueryFilter({
        exerciseName: searchSut
      }))
    });
  })
});
