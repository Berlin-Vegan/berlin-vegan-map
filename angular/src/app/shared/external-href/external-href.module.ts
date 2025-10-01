import { ModuleWithProviders, NgModule } from "@angular/core";

import { EXTERNAL_HREF_OPTIONS, ExternalHrefOptions } from "./external-href-options";
import { ExternalHrefDirective } from "./external-href.directive";

@NgModule({
    declarations: [ExternalHrefDirective],
    exports: [ExternalHrefDirective],
})
export class ExternalHrefModule {
    public static forRoot(options: ExternalHrefOptions = {}): ModuleWithProviders<ExternalHrefModule> {
        return {
            ngModule: ExternalHrefModule,
            providers: [
                {
                    provide: EXTERNAL_HREF_OPTIONS,
                    useValue: options,
                },
            ],
        };
    }
}
