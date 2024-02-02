import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageService } from './message.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageTypes } from '@workout-tracker/models';

describe('MessageService', () => {
  let service: MessageService;
  let matSnackBar: MatSnackBar;
  let store: Store;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MatSnackBar,
        MessageService,
        provideMockStore({
          initialState: {}
        }),
      ],
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([])
      ]
    });
    service = TestBed.inject(MessageService);
    store = TestBed.inject(Store);
    matSnackBar = TestBed.inject(MatSnackBar)
    router = TestBed.inject(Router);
  });

  describe('Unit tests', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('Integration tests', () => {
    describe('showAlertMessage', () => {

      it('showAlertMessage success should request snackBar.open', () => {
        const messageTypeSut = MessageTypes.Error;
        const messageSut = "message test";

        const snackBarOpenSpy = jest.spyOn(matSnackBar, 'open')

        service.showAlertMessage(messageTypeSut, messageSut).subscribe((closed: boolean) => {
          expect(snackBarOpenSpy).toHaveBeenCalledWith(messageSut, undefined, expect.anything())
        })
      })
    })
  })
});
