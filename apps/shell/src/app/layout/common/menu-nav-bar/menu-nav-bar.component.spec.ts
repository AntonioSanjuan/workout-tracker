import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuNavBarComponent } from './menu-nav-bar.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { appRoutes } from '../../../app.routes';
import { TranslateModule } from '@ngx-translate/core';

describe('MenuNavBarComponent', () => {
  let component: MenuNavBarComponent;
  let fixture: ComponentFixture<MenuNavBarComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MenuNavBarComponent,
        RouterTestingModule.withRoutes(appRoutes),
        TranslateModule.forRoot()
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuNavBarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  describe('Unit tests', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  })
});
