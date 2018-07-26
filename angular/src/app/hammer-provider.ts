import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from "@angular/platform-browser";
import "hammerjs";
import "hammer-timejs";

declare var Hammer: any;
delete Hammer.defaults.cssProps.userSelect; // Re-enable text selection

export class HammerConfig extends HammerGestureConfig  {
    overrides = {
        "swipe": {
            velocity: 0.3, // Default: 0.3
            threshold: 10, // Default: 10
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
