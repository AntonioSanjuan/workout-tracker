import { Component, DebugElement } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IntersectionObserverDirective } from './intersection-observer.directive';
import { CommonModule } from '@angular/common';
@Component({
    template: `
    <div 
    style="height: 3vh;"
    id="testContainer"
    appIntersectionObserver 
      (isIntersecting)="isIntersectingCallback($event)"
      [offset]="sutOffset"
      [active]="sutActive">
      <p>hola</p>
    </div>`,
    imports: [
        IntersectionObserverDirective
    ],
    standalone: true
})
class DummyComponent {
    isIntersectingCallback = jest.fn()
}

describe('IntersectionObserverDirective', () => {

    let fixture: ComponentFixture<DummyComponent>;
    let component: DummyComponent;
    let directive: DebugElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: 
            [
                CommonModule,
                DummyComponent, 
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(DummyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        directive = fixture.debugElement.query(By.directive(IntersectionObserverDirective));
        });
        
    it('should create an dummy component instance', () => {
        expect(component).toBeTruthy();
    });

    it('should create an directive instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should trigger callback if reach the end of the scroll', () => {
      const callbackSpy = jest.spyOn(component, 'isIntersectingCallback');

      const container = fixture.debugElement.query(By.css('#testContainer'));
      container.nativeElement.scrollBottom = '1vh'

      expect(callbackSpy).not.toHaveBeenCalled()
    })

  });