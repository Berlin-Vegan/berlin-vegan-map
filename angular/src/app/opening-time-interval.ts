import { TimeInterval } from "./time-interval";

export class OpeningTimeInterval {

    constructor(public readonly timeInterval: TimeInterval, public readonly friendly: string) {}

    isOpen(): boolean {
        return !!this.timeInterval;
    }
}
