import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent, ConfirmationDialogData } from './confirmation-dialog.component';

describe('AddWorkoutTrainingExerciseDialogComponent', () => {
  let component: ConfirmationDialogComponent;
  let fixture: ComponentFixture<ConfirmationDialogComponent>;
  let store: Store;

  const confirmationDialogData: ConfirmationDialogData = {
    title: 'confirmation dialog title!'
  }
  const closeMock =  jest.fn()
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: confirmationDialogData
        },
        { provide: MatDialogRef, useValue: { close: closeMock } },
        provideMockStore({
          initialState: {}
        }),
      ],
      imports: [
        BrowserAnimationsModule,
        ConfirmationDialogComponent,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        }),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmationDialogComponent);
    store = TestBed.inject(Store)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Unit tests', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  })

  describe('Integration tests', () => {
    beforeEach(() => {
      closeMock.mockRestore()
    })
    describe('confirm', () => {

      it('should request dialogRef close with true value', () => {
        component.confirm()

        expect(closeMock).toHaveBeenCalledWith(true)
      });
    })

    describe('cancel', () => {

      it('should request dialogRef close with false value', () => {
        component.cancel()

        expect(closeMock).toHaveBeenCalledWith(false)
      });
    })
  })
});
