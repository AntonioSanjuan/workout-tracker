import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of, switchMap } from "rxjs";
import { routerNavigatedAction } from "@ngrx/router-store"
import { setCurrentRoute } from "./router.actions";

@Injectable()
export class RouterEffects {
    private actions$ = inject(Actions);


    routerNavigatedAction$ = createEffect(() => 
        this.actions$.pipe(
            ofType(routerNavigatedAction),
            switchMap(({ payload }) =>
                of(setCurrentRoute({ currentRoute: payload.routerState.url}))
            )
        )
    );
}