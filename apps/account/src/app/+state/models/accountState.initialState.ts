import { initialLoginState } from "../../login/store/login.reducer";
import { AccountState } from "./accountState.model";

export const initialAccountState: AccountState = {
    // set initial required properties
    login: initialLoginState,
}
