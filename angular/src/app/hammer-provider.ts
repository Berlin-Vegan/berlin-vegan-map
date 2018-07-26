import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from "@angular/platform-browser";
import "hammerjs";
import "hammer-timejs";

delete (window as any).Hammer.defaults.cssProps.userSelect; // Re-enable text selection

class HammerConfig extends HammerGestureConfig  {
    overrides = {
        "swipe": {
            velocity: 0.3, // Default: 0.3
            threshold: 10, // Default: 10
        }
    };
}

export const HammerProvider = { provide: HAMMER_GESTURE_CONFIG, useClass: HammerConfig };
