import { InjectionToken } from "@angular/core";

export interface ExternalHrefOptions {
    isExternalHref?: (href: string) => boolean;
    isExternalHRef?: (href: string) => boolean;
    externalHrefTargetDefaultsToBlank?: boolean;
    externalHRefTargetDefaultsToBlank?: boolean;
    safeBlankRelTokens?: string[];
}

export interface ResolvedExternalHrefOptions {
    isExternalHref: (href: string) => boolean;
    externalHrefTargetDefaultsToBlank: boolean;
    safeBlankRelTokens: string[];
}

export const EXTERNAL_HREF_OPTIONS = new InjectionToken<ExternalHrefOptions>("EXTERNAL_HREF_OPTIONS");

export const DEFAULT_EXTERNAL_HREF_OPTIONS: ResolvedExternalHrefOptions = {
    isExternalHref: href => (href.startsWith("http://") || href.startsWith("https://"))
        && typeof window !== "undefined"
        && !href.startsWith(window.location.origin),
    externalHrefTargetDefaultsToBlank: false,
    safeBlankRelTokens: ["noopener", "noreferrer"],
};

export function resolveExternalHrefOptions(options?: ExternalHrefOptions | null): ResolvedExternalHrefOptions {
    const resolved: ResolvedExternalHrefOptions = {
        isExternalHref: options?.isExternalHref
            ?? options?.isExternalHRef
            ?? DEFAULT_EXTERNAL_HREF_OPTIONS.isExternalHref,
        externalHrefTargetDefaultsToBlank: options?.externalHrefTargetDefaultsToBlank
            ?? options?.externalHRefTargetDefaultsToBlank
            ?? DEFAULT_EXTERNAL_HREF_OPTIONS.externalHrefTargetDefaultsToBlank,
        safeBlankRelTokens: options?.safeBlankRelTokens
            ?? DEFAULT_EXTERNAL_HREF_OPTIONS.safeBlankRelTokens,
    };

    if (!resolved.safeBlankRelTokens.some(token => token === "noopener" || token === "noreferrer")) {
        throw new Error(`Illegal argument. '${resolved.safeBlankRelTokens}' is not safe for target="blank".`);
    }

    return {
        ...resolved,
        safeBlankRelTokens: [...resolved.safeBlankRelTokens],
    };
}
