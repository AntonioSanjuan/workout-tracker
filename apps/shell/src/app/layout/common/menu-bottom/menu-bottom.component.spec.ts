import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuBottomComponent } from './menu-bottom.component';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';

describe('MenuBottomComponent', () => {
  let component: MenuBottomComponent;
  let fixture: ComponentFixture<MenuBottomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MenuBottomComponent,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuBottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Unit tests', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  })
});
