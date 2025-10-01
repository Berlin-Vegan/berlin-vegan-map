import { Injectable } from "@angular/core";
import { HAMMER_GESTURE_CONFIG, HammerGestureConfig } from "@angular/platform-browser";
import "hammer-timejs";
import "hammerjs";

(Hammer.defaults.cssProps as Partial<typeof Hammer.defaults.cssProps>).userSelect = undefined; // Re-enable text selection

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
