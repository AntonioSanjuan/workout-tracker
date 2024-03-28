import { DatePipe } from "@angular/common";
import { Pipe, PipeTransform, inject } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Pipe({
    name: 'localizedDate',
    pure: false,
    standalone: true
  })
  export class LocalizedDatePipe implements PipeTransform {
    private translateService: TranslateService = inject(TranslateService)
  
    transform(value: Date, pattern = 'shortDate'): string | null {
      const datePipe: DatePipe = new DatePipe(this.translateService.currentLang);
      return datePipe.transform(value, pattern);
    }
  
  }