import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, of, switchMap } from "rxjs";
import { routerNavigationAction} from "@ngrx/router-store"
import { setCurrentRoute } from "./router.actions";

@Injectable()
export class RouterEffects {
    private actions$ = inject(Actions);


    routerNavigationAction$ = createEffect(() => 
        this.actions$.pipe(
            ofType(routerNavigationAction),
            switchMap(({ payload }) =>
                of(setCurrentRoute({ currentRoute: payload.event.url}))
        )
        )
    );
}