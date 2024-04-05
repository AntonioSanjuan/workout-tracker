import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WorkoutTrainingsFilterListComponent } from './workout-trainings-list-filter.component';
import { exerciseTemplatesStateMock } from '@workout-tracker/test';
import { clearTrainingQueryFilter, setTrainingQueryFilter } from '@workout-tracker/shared-store';
import { MusclesSelectorComponent } from '@workout-tracker/components';
import { MuscleGroups } from '@workout-tracker/models';

describe('WorkoutTrainingsFilterListComponent', () => {
  let actions: Observable<Action>;
  let component: WorkoutTrainingsFilterListComponent;
  let fixture: ComponentFixture<WorkoutTrainingsFilterListComponent>;
  let router: Router
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        WorkoutTrainingsFilterListComponent,
        MusclesSelectorComponent,
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

    fixture = TestBed.createComponent(WorkoutTrainingsFilterListComponent);
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
    it('search should dispatch setTrainingQueryFilter', () => {
      const fromDateSut: Date = new Date();
      const toDateSut: Date = new Date(fromDateSut.getDate(), fromDateSut.getMonth(), fromDateSut.getFullYear() + 1)
      const dispatchSpy = jest.spyOn(store, 'dispatch')

      component.trainingsListFilterForm?.setValue({
        fromDate: fromDateSut,
        toDate: toDateSut,
        muscleGroups: []
      })
      component.search()

      expect(dispatchSpy).toHaveBeenCalledWith(setTrainingQueryFilter({ 
        filters: {
          betweenDates: {
            fromDate: fromDateSut,
            toDate: toDateSut
          },
          muscleGroups: []
        }
      }))
    });

    describe('clearFilters', () => {
      it('should dispatch clearTrainingQueryFilter', () => {
        const fromDateSut: Date = new Date();
        const toDateSut: Date = new Date(fromDateSut.getDate(), fromDateSut.getMonth(), fromDateSut.getFullYear() + 1)
        const dispatchSpy = jest.spyOn(store, 'dispatch')
  
        component.trainingsListFilterForm?.setValue({
          fromDate: fromDateSut,
          toDate: toDateSut,
          muscleGroups: []
        })
        component.clearFilters()
  
        expect(dispatchSpy).toHaveBeenCalledWith(clearTrainingQueryFilter())
      });
      it('should reset form', () => {
        const fromDateSut: Date = new Date();
        const toDateSut: Date = new Date(fromDateSut.getDate(), fromDateSut.getMonth(), fromDateSut.getFullYear() + 1)
  
        component.trainingsListFilterForm?.setValue({
          fromDate: fromDateSut,
          toDate: toDateSut,
          muscleGroups: [ MuscleGroups.Arms ]
        })
        component.clearFilters()
  
        expect(component.trainingsListFilterForm?.value.fromDate).toEqual(null)
        expect(component.trainingsListFilterForm?.value.toDate).toEqual(null)
        expect(component.trainingsListFilterForm?.value.muscleGroups).toEqual([])
      });
    })



  })
});
