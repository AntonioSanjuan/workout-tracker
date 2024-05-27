import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { DividerComponent } from './divider.component'
describe('DividerComponent', () => {
  const dummyContent = 'content test'

  let component: DividerComponent;
  let fixture: ComponentFixture<DividerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DividerComponent,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        }),]
    }).compileComponents();
    fixture = TestBed.createComponent(DividerComponent);
    component = fixture.componentInstance;
    component.content = dummyContent
    fixture.detectChanges();
  });

  describe('Unit tests', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  })
});