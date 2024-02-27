import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DialogService } from './dialog.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';

@Component({
  template: `<p>helloWorld</p>`,
  imports: [],
  standalone: true
})
class DummyComponent {
  constructor() {}
}

describe('DialogService', () => {
  let service: DialogService;
  let matDialog: MatDialog;
  let store: Store;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MatDialog,
        DialogService,
        provideMockStore({
          initialState: {}
        }),
      ],
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([])
      ]
    });
    service = TestBed.inject(DialogService);
    store = TestBed.inject(Store);
    matDialog = TestBed.inject(MatDialog)
    router = TestBed.inject(Router);
  });

  describe('Unit tests', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('Integration tests', () => {
    describe('showDialog', () => {

      it('showDialog success should request dialog.open', () => {
        const dialogOpenSpy = jest.spyOn(matDialog, 'open')

        service.showDialog(DummyComponent, true).subscribe(() => {
          expect(dialogOpenSpy).toHaveBeenCalledWith(DummyComponent, expect.anything())
        })
      })
    })
  })
});
