import { Injectable, inject } from "@angular/core";
import { environment } from "@env"
import { Store } from '@ngrx/store'
import { FirebaseApp, initializeApp } from 'firebase/app';
import {
    Auth,
    browserLocalPersistence, getAuth, setPersistence,
} from 'firebase/auth';
import { Firestore, initializeFirestore } from 'firebase/firestore';

@Injectable({ providedIn: 'root'})
export class FirebaseService {
    private store: Store = inject(Store)

    public app!: FirebaseApp;
    public auth!: Auth
    public db!: Firestore;

    public initialize(): void {
        const firebaseConfig = {
            apiKey: environment.FIREBASE_API_KEY,
            authDomain: environment.FIREBASE_AUTH_DOMAIN,
            projectId: environment.FIREBASE_PROJECT_ID,
        };
        
        const app = initializeApp(firebaseConfig);
        
        this.auth = getAuth(app);
        this.db = initializeFirestore(app, { ignoreUndefinedProperties: true });
        
        setPersistence(this.auth, browserLocalPersistence);
    }
}