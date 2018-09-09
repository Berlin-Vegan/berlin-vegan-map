// TODO: Refactor to library

export function toMapOfStringToBoolean(keys: string[], value: boolean): { [key: string]: boolean; } {
    const obj: any = {};
    for (const key of keys) {
        obj[key] = value;
    }
    return obj;
}
