import { Pipe, PipeTransform } from "@angular/core";

import { I18nService } from "../../i18n.service";

const nbsp = "\xa0"; // Non-breaking space

@Pipe({ name: "kilometer" })
export class KilometerPipe implements PipeTransform {

    constructor(private readonly i18nService: I18nService) { }

    transform(number: number): string {
        return this.i18nService.formatNumberString(number.toFixed(1)) + nbsp + "km";
    }
}
