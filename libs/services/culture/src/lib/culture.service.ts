import { Injectable, inject } from "@angular/core";
import { TranslateService } from '@ngx-translate/core'
import { Store } from '@ngrx/store'
import { first } from "rxjs";
import { AppInit, loadedApp } from "@workout-tracker/shared-store";

@Injectable()
export class CultureService {
    private readonly defaultLangCode: string = "ES-ES"
    private translateService: TranslateService = inject(TranslateService)
    private store: Store = inject(Store)

    private readonly acceptedLanguages: string[] = [ 'EN-GB', 'ES-ES' ];
      
    public changeLanguage(lang: string) {
        this.setCulture(lang);
    }

    public initialize(): void {
        this.translateService.setDefaultLang(this.defaultLangCode);
        this.translateService.addLangs(this.acceptedLanguages);
        // this.changeLanguage(this.getBrowserLanguage())
    }

    public getBrowserLanguage(): string {
        return this.getLangCode(this.translateService.getBrowserCultureLang() || this.defaultLangCode);
    }

    private getLangCode(cultureCode: string): string {
        const langCode = this.acceptedLanguages.find(lang => lang === cultureCode.toUpperCase());
        return langCode || this.defaultLangCode;
    }

    private setCulture(cultureName: string) {
        this.translateService.use(this.getLangCode(cultureName)).pipe(first())
        .subscribe(() => {
            this.store.dispatch(loadedApp({ initialized: AppInit.UI }))
        });
    }
}