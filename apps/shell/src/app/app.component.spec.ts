import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CultureService } from '@workout-tracker/services/culture';
import { AppModule } from './app.module';

describe('AppComponent', () => {
  let cultureService: CultureService
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [CultureService]
    }).compileComponents();

    cultureService = TestBed.inject(CultureService)
  });

  describe('Unit tests', () => {
    it('should create the app', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      expect(app).toBeTruthy();
    });
  })

  describe('Integration tests', () => {
    it('should request cultureService setLanguage into onInit', () => {
      const setLanguageSpy = jest.spyOn(cultureService, 'setLanguage')
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      app.ngOnInit();
      
      expect(setLanguageSpy).toHaveBeenCalled()
    });
  })
});