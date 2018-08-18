export class Storable {
    storedAt: Date;

    constructor(props: any = {}) {
        Object.assign(this, props);
    }
}
