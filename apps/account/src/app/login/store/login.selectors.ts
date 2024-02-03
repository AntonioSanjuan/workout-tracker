import { createSelector } from "@ngrx/store";
import { selectAccountState } from "../../+state/account.selectors";

export const selectLoginState = createSelector(selectAccountState, state => state.login)