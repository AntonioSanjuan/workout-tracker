import { registerLocaleData } from "@angular/common";
import { Injectable, inject } from "@angular/core";
import { TranslateService } from '@ngx-translate/core'
import { Observable, first } from "rxjs";

import localeEs from '@angular/common/locales/es';
import localeEn from '@angular/common/locales/en';
import { DateAdapter } from "@angular/material/core";

@Injectable()
export class CultureService {
    private readonly defaultLangCode: string = "ES-ES"
    private translateService: TranslateService = inject(TranslateService)
    private dateAdapter: DateAdapter<any> = inject(DateAdapter)
    private readonly acceptedLanguages: string[] = [ 'EN-GB', 'ES-ES' ];


    public initialize(): void {
        this.registerLocales()
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

    private registerLocales() {
        registerLocaleData(localeEn);
        registerLocaleData(localeEs);
    }

    private getLangCode(cultureCode: string): string {
        const langCode = this.acceptedLanguages.find(lang => lang === cultureCode.toUpperCase());
        return langCode || this.defaultLangCode;
    }

    private setCulture(cultureName: string): Observable<void> {
        registerLocaleData(this.getLangCode(cultureName));
        this.dateAdapter.setLocale(cultureName)
        return this.translateService.use(this.getLangCode(cultureName)).pipe(first())

    }

    private setDarkMode(darkMode: boolean) {
        console.log("setDarkMode", darkMode)
    }
}