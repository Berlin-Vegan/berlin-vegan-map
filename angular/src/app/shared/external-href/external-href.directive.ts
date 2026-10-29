import { Directive, ElementRef, Inject, Input, OnChanges, Optional } from "@angular/core";

import {
    EXTERNAL_HREF_OPTIONS,
    ExternalHrefOptions,
    ResolvedExternalHrefOptions,
    resolveExternalHrefOptions,
} from "./external-href-options";

/* eslint-disable @angular-eslint/directive-selector */

interface ManipulatedAttribute {
    value: string | undefined;
}

interface LastManipulated {
    target?: ManipulatedAttribute;
    rel?: ManipulatedAttribute;
}

@Directive({
    selector: "a",
})
export class ExternalHrefDirective implements OnChanges {
    @Input()
    public href?: string;

    @Input()
    public target?: string;

    @Input()
    public rel?: string;

    private readonly anchorElement: HTMLAnchorElement;

    private readonly options: ResolvedExternalHrefOptions;

    private lastManipulated: LastManipulated = {};

    public constructor(
        elementRef: ElementRef<HTMLAnchorElement>,
        @Optional() @Inject(EXTERNAL_HREF_OPTIONS) options: ExternalHrefOptions | null,
    ) {
        this.anchorElement = elementRef.nativeElement;
        this.options = resolveExternalHrefOptions(options ?? {});
    }

    public ngOnChanges(): void {
        const href = this.href ?? this.anchorElement.getAttribute("href") ?? undefined;
        const target = this.target ?? this.anchorElement.getAttribute("target") ?? undefined;
        const rel = this.rel ?? this.anchorElement.getAttribute("rel") ?? undefined;

        const isExternalHref = href ? this.options.isExternalHref(href) : false;

        let nextTarget = target;
        let nextRel = rel;

        if (isExternalHref) {
            if (this.options.externalHrefTargetDefaultsToBlank && !nextTarget) {
                this.lastManipulated.target = { value: target };
                nextTarget = "_blank";
            }

            if (nextTarget === "_blank") {
                const relTokens = nextRel ? nextRel.split(/\s+/).filter(it => it) : [];

                for (const token of this.options.safeBlankRelTokens) {
                    if (!relTokens.includes(token)) {
                        this.lastManipulated.rel = { value: rel };
                        relTokens.push(token);
                    }
                }

                nextRel = relTokens.join(" ");
            }
        } else {
            if (this.lastManipulated.target) {
                nextTarget = this.lastManipulated.target.value;
            }

            if (this.lastManipulated.rel) {
                nextRel = this.lastManipulated.rel.value;
            }
        }

        this.setAttribute("href", href);
        this.setAttribute("target", nextTarget);
        this.setAttribute("rel", nextRel);
    }

    private setAttribute(name: "href" | "target" | "rel", value: string | undefined): void {
        if (value === undefined) {
            this.anchorElement.removeAttribute(name);
        } else {
            this.anchorElement.setAttribute(name, value);
        }
    }
}
