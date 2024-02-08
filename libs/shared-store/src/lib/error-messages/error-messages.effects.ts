import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { tap } from "rxjs";
import { showError } from "./error-messages.actions";
import { MessageService } from '@workout-tracker/services/message'
import { MessageTypes } from '@workout-tracker/models'

@Injectable()
export class ErrorMessageEffects {
    private actions$ = inject(Actions);
    private messageService: MessageService = inject(MessageService)

    public showError$ = createEffect(() => 
        this.actions$.pipe(
            ofType(showError),
            tap(({errorMessage}) => {
                this.messageService.showAlertMessage(MessageTypes.Error, errorMessage)
            })
        ), { dispatch: false}
    );
}