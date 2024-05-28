import { Component, DebugElement } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MuscleGroupPillDirective } from './muscle-group-pill.directive';
import { MuscleGroups } from '@workout-tracker/models';

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
        <p appMuscleGroupPill [muscleGroup]="type">
            test
        </p>
    </div>`,
    imports: [
        MuscleGroupPillDirective
    ],
    standalone: true
})
class DummyComponent {
    public type = MuscleGroups.Arms;
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

        directive = fixture.debugElement.query(By.directive(MuscleGroupPillDirective));
        });
        
    it('should create an dummy component instance', () => {
        expect(component).toBeTruthy();
    });

    it('should create an directive instance', () => {
        expect(directive).toBeTruthy();
    });

    it('Arms type should set grass Arms', () => {
        component.type = MuscleGroups.Arms;
        fixture.detectChanges();

        expect(rgbToHex(directive.styles['backgroundColor'] as string)).toEqual('#73b0b9');
        expect(rgbToHex(directive.styles['color'] as string)).toEqual('#ffffff');
    });

    it('Back type should set Back styles', () => {
        component.type = MuscleGroups.Back;
        fixture.detectChanges();

        expect(rgbToHex(directive.styles['backgroundColor'] as string)).toEqual("#e7a1c7");
        expect(rgbToHex(directive.styles['color'] as string)).toEqual('#ffffff');
    });
});