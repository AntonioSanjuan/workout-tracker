import { Component, ViewEncapsulation, inject } from '@angular/core';
import { UiModule } from '@workout-tracker/ui';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

export interface ConfirmationDialogData {
  title: string
  content?: string
}
@Component({
  selector: 'workout-tracker-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  imports: [
    UiModule,
    TranslateModule
  ],
  styleUrls: ['./confirmation-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true
})
export class ConfirmationDialogComponent {
  private dialogRef: MatDialogRef<ConfirmationDialogComponent> = inject(MatDialogRef<ConfirmationDialogComponent>)
  public data: ConfirmationDialogData = inject(MAT_DIALOG_DATA)

  public confirm() {
    this.dialogRef.close(true)
  }

  public cancel(){
    this.dialogRef.close(false)
  }
}
