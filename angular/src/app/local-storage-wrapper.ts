// TODO: Move to library

export function isLocalStorageAvailable(): boolean {
    return !!localStorage;
}

export function getObject(key: string): any {
    const json = getItem(key);
    return json ? JSON.parse(json) : null;
}

export function getItem(key: string): string | null {
    return localStorage ? localStorage.getItem(key) : null;
}

export function setObject(key: string, data: any) {
    setItem(key, JSON.stringify(data));
}

export function setItem(key: string, data: string): void {
    if (localStorage) {
        localStorage.setItem(key, data);
    }
}

export function removeItem(key: string): void {
    if (localStorage) {
        localStorage.removeItem(key);
    }
}
