export abstract class Storable {
    storedAt: Date;

    constructor(props: any = null) {
        if (props) {
            this.storedAt = props.storedAt;
        }
    }
}
