import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, of, switchMap } from "rxjs";
import { closeNavBar } from "./layout.actions";
import { setCurrentRoute } from "../router/router.actions";

@Injectable()
export class LayoutEffects {
    private actions$ = inject(Actions);


    setCurrentRoute$ = createEffect(() => 
        this.actions$.pipe(
            ofType(setCurrentRoute),
            switchMap(() =>
                of(closeNavBar())
        )
        )
    );
}