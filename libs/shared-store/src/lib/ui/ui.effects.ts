import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { endRequest, startRequest } from "./ui.actions";
import { BehaviorSubject, tap } from "rxjs";


@Injectable()
export class UiEffects {
    private actions$ = inject(Actions);

    private requestsCounter = 0;
    public requestOnGoing: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

    private initRequest$ = createEffect(() => 
        this.actions$.pipe(
            ofType(startRequest),
            tap(() => {
                ++this.requestsCounter;
                if(this.requestsCounter === 1) {
                    this.requestOnGoing.next(true);
                }
            }),
        ), { dispatch: false}
    );

    private endRequest$ = createEffect(() => 
        this.actions$.pipe(
            ofType(endRequest),
            tap(() => {
                --this.requestsCounter;
                if(this.requestsCounter === 0) {
                    this.requestOnGoing.next(false);
                }
            }),
        ), { dispatch: false}
    );
}