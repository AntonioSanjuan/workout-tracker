import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from "@env";
import { getAuth, provideAuth } from "@angular/fire/auth";
export const HttpLoaderFactory = (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json')

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        TranslateModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            },
            extend: true,
            isolate: false
        }),
        provideFirebaseApp(() => initializeApp({ 
            apiKey: environment.FIREBASE_API_KEY,
            authDomain: environment.FIREBASE_AUTH_DOMAIN,
            projectId: environment.FIREBASE_PROJECT_ID
         })),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
    ]
})
export class CoreModule {}