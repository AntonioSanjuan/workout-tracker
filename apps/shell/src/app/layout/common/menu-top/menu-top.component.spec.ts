import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuTopComponent } from './menu-top.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { appRoutes } from '../../../app.routes';
import { TranslateModule } from '@ngx-translate/core';
import { provideMockStore } from '@ngrx/store/testing';

describe('MenuTopComponent', () => {
  let component: MenuTopComponent;
  let fixture: ComponentFixture<MenuTopComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MenuTopComponent,
        RouterTestingModule.withRoutes(appRoutes),
        TranslateModule.forRoot()
      ],
      providers: [
        provideMockStore({
          
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuTopComponent);
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
