import { Injectable, inject } from "@angular/core";
import { Actions, createEffect } from '@ngrx/effects'
import { concatMap, filter, of } from "rxjs";
import { endRequest, startRequest } from "../ui";

@Injectable()
export class RequestEffects {
    private actions$ = inject(Actions);

    // private initRequest$ = createEffect(() => 
    //     this.actions$.pipe(
    //         filter(action => 
    //              action.type.endsWith('Request')
    //         ),
    //         concatMap(() => of(startRequest()))
    //     )
    // );
    // private endRequest$ = createEffect(() => 
    //     this.actions$.pipe(
    //         filter(action => 
    //              action.type.endsWith('Success') || action.type.endsWith('Error')),
    //         concatMap(() => of(endRequest()))
    //     )
    // );
}