import { Injectable, inject } from "@angular/core";
import {
    MatDialog,
    MatDialogConfig,
  } from '@angular/material/dialog';
import { Observable } from "rxjs";

@Injectable()
export class DialogService {
    private dialog: MatDialog = inject(MatDialog)

    public showDialog(component: any, options?: MatDialogConfig<any>): Observable<boolean> {
        return this.dialog.open(component, { 
            panelClass: 'dialogClass',
            ...options
        } as MatDialogConfig).afterClosed()
    }
}