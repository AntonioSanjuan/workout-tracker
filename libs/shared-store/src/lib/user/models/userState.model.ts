import { UserSettings } from '@workout-tracker/models';
import firebase from 'firebase/compat/app/';

export interface UserState {
    user: firebase.User | undefined
    isLogged: boolean;
    isNewUser: boolean;
    userName?: string;
}