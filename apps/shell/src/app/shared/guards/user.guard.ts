import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { AuthPersistanceService } from "@workout-tracker/services/auth-persistance";
import { AppInit, getIsAppLoaded } from "@workout-tracker/shared-store";
import { Observable, filter, from, map, tap } from "rxjs";

@Injectable()
export class CanActivateUser implements CanActivate {
  private store: Store = inject(Store)
  private authPersistanceService: AuthPersistanceService = inject(AuthPersistanceService)

  canActivate( 
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    return this.store.select(getIsAppLoaded(AppInit.ACCOUNT)).pipe(
      tap((isLoaded: boolean) => {
        if(!isLoaded) {
          this.authPersistanceService.initialize();
        }
      }),
      filter((isLoaded) => !!isLoaded)
    )
  }
}