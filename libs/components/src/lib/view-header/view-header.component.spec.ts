import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ViewHeaderComponent } from './view-header.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutes } from '@workout-tracker/models';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('ViewHeaderComponent', () => {
  const titleSut = 'title test'
  const goBackUrlSut = `${AppRoutes.WorkoutExerciseTemplatesList}/idTest` 

  let component: ViewHeaderComponent;
  let fixture: ComponentFixture<ViewHeaderComponent>;
  let router: Router

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ViewHeaderComponent,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        }),
        RouterTestingModule.withRoutes([]),

      ]
    }).compileComponents();
    fixture = TestBed.createComponent(ViewHeaderComponent);
    router = TestBed.inject(Router)
    component = fixture.componentInstance;
    component.title = titleSut
    fixture.detectChanges();
  });

  describe('Unit tests', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  })

  describe('Integration tests', () => {
    describe('goBack', () => {
      describe('if goBackUrl exists', () => {
        beforeEach(() => {
          component.goBackUrl = goBackUrlSut
          fixture.detectChanges()
        })
        it('goBack should navigate', () => {
          const navigateSpy = jest.spyOn(router, 'navigate')
          component.goBack()

          expect(navigateSpy).toHaveBeenCalledWith([goBackUrlSut])
        })
      })
      describe('if goBackUrl doesnt exists', () => {
        beforeEach(() => {
          component.goBackUrl = undefined
          fixture.detectChanges()
        })

        it('goBack should not navigate', () => {
          const navigateSpy = jest.spyOn(router, 'navigate')
          component.goBack()

          expect(navigateSpy).not.toHaveBeenCalled()
        })
      })
    })
  })
});