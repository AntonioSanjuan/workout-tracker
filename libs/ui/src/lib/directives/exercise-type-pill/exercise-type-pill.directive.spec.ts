import { Component, DebugElement } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ExerciseTypePillDirective } from './exercise-type-pill.directive';
import { ExerciseType } from '@workout-tracker/models';

function rgbToHex(rgb: string) {
    // Verificar si el valor de entrada tiene el formato correcto
    const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    
    if (!match) {
      throw new Error('El valor proporcionado no tiene el formato correcto (ejemplo: "rgb(0, 0, 0)").');
    }
    
    // Obtener los valores de los componentes de color
    const r = parseInt(match[1]);
    const g = parseInt(match[2]);
    const b = parseInt(match[3]);
    
    // Convertir los componentes de color a su representación hexadecimal
    const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    
    return hex;
  }

@Component({
    template: `<div>
        <p appExerciseTypePill [type]="type">
            test
        </p>
    </div>`,
    imports: [
        ExerciseTypePillDirective
    ],
    standalone: true
})
class DummyComponent {
    public type = ExerciseType.Arms;
    constructor() {}
}

describe('ExerciseTypePillDirective', () => {
    let fixture: ComponentFixture<DummyComponent>;
    let component: DummyComponent;
    let directive: DebugElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DummyComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(DummyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        directive = fixture.debugElement.query(By.directive(ExerciseTypePillDirective));
        });
        
    it('should create an dummy component instance', () => {
        expect(component).toBeTruthy();
    });

    it('should create an directive instance', () => {
        expect(directive).toBeTruthy();
    });

    it('Arms type should set grass styles', () => {
        component.type = ExerciseType.Arms;
        fixture.detectChanges();

        expect(rgbToHex(directive.styles['backgroundColor'] as string)).toEqual('#007cae');
        expect(rgbToHex(directive.styles['color'] as string)).toEqual('#ffffff');
    });

    it('Back type should set fire styles', () => {
        component.type = ExerciseType.Back;
        fixture.detectChanges();

        expect(rgbToHex(directive.styles['backgroundColor'] as string)).toEqual("#00a6e1");
        expect(rgbToHex(directive.styles['color'] as string)).toEqual('#000000');
    });
});