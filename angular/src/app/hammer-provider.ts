import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from "@angular/platform-browser";
import "hammerjs";
import "hammer-timejs";

delete Hammer.defaults.cssProps.userSelect; // Re-enable text selection

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
