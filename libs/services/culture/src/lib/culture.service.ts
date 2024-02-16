import { Injectable, inject } from "@angular/core";
import { TranslateService } from '@ngx-translate/core'
// import { Store } from '@ngrx/store'
import { Observable, first } from "rxjs";
// import { AppInit, loadedApp } from "@workout-tracker/shared-store";

@Injectable()
export class CultureService {
    private readonly defaultLangCode: string = "ES-ES"
    private translateService: TranslateService = inject(TranslateService)
    // private store: Store = inject(Store)

    private readonly acceptedLanguages: string[] = [ 'EN-GB', 'ES-ES' ];
      


    public initialize(): void {
        this.translateService.setDefaultLang(this.defaultLangCode);
        this.translateService.addLangs(this.acceptedLanguages);
    }

    public changeLanguage(lang: string): Observable<void> {
        return this.setCulture(lang);
    }
    
    public getBrowserLanguage(): string {
        return this.getLangCode(this.translateService.getBrowserCultureLang() || this.defaultLangCode);
    }

    public changeDarkMode(darkMode: boolean) {
        this.setDarkMode(darkMode);
    }
    
    public getBrowserIsDarkMode(): boolean {
        return false
    }

    private getLangCode(cultureCode: string): string {
        const langCode = this.acceptedLanguages.find(lang => lang === cultureCode.toUpperCase());
        return langCode || this.defaultLangCode;
    }

    private setCulture(cultureName: string): Observable<void> {
        return this.translateService.use(this.getLangCode(cultureName)).pipe(first())
        // .subscribe(() => {
            // this.store.dispatch(loadedApp({ initialized: AppInit.UI }))
        // });
    }

    private setDarkMode(darkMode: boolean) {
        console.log("setDarkMode", darkMode)
    }
}