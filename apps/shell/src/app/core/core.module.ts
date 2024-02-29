import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { environment } from "@env";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule, PERSISTENCE } from "@angular/fire/compat/auth";
import { SETTINGS } from "@angular/fire/compat/firestore";
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
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFireDatabaseModule
    ],
    providers: [
        { provide: PERSISTENCE, useValue: 'local' },
        { provide: SETTINGS, useValue: { ignoreUndefinedProperties: true} }
    ]
})
export class CoreModule {}