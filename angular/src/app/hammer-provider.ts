import { HAMMER_GESTURE_CONFIG, HammerGestureConfig } from "@angular/platform-browser";
import { Injectable } from "@angular/core";
import "hammer-timejs";
import "hammerjs";

delete Hammer.defaults.cssProps.userSelect; // Re-enable text selection

@Injectable()
export class HammerConfig extends HammerGestureConfig  {
    overrides = {
        "swipe": {
            velocity: 0.7, // Default: 0.3
            threshold: 90, // Default: 10
        }
    };

    buildHammer(element: HTMLElement) {
        const hammer = new Hammer(element, {
            touchAction: "pan-y"
        });
        return hammer;
    }
}

export const HammerProvider = { provide: HAMMER_GESTURE_CONFIG, useClass: HammerConfig };
