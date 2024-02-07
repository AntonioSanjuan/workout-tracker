import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, of, switchMap } from "rxjs";
import { routerNavigationAction} from "@ngrx/router-store"
import { closeNavBar } from "./layout.actions";

@Injectable()
export class LayoutEffects {
    private actions$ = inject(Actions);


    routerNavigationAction$ = createEffect(() => 
        this.actions$.pipe(
            ofType(routerNavigationAction),
            switchMap(() =>
                of(closeNavBar())
        )
        )
    );
}