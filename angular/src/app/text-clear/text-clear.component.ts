import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ElementRef,
    Input,
    ViewChild
} from "@angular/core";

// TODO: Move to library
@Component({
    selector: "app-text-clear",
    templateUrl: "./text-clear.component.html",
    styleUrls: [ "./text-clear.component.scss" ],
})
export class TextClearComponent implements AfterViewInit {

    constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}

    @Input() showButtonWhenOutside = false;
    @ContentChild("input") input: ElementRef;
    @ContentChild("buttonContent") buttonContent: ElementRef;
    @ViewChild("button") button: ElementRef;
    initialized = false;
    focus = false;
    hover = false;

    get inputElement(): HTMLInputElement { return this.input.nativeElement; }

    private get buttonElement(): HTMLButtonElement { return this.button.nativeElement; }

    get showButton(): boolean {
        return !this.initialized
            || (!!this.inputElement.value && (this.showButtonWhenOutside || this.focus || this.hover));
    }

    ngAfterViewInit() {
        if (!this.input) {
            throw new Error("#input is mandatory content.");
        }

        const inputPaddingRightPx =
            parseInt(window.getComputedStyle(this.inputElement).paddingRight!.replace("px", ""), 10);
        const paddingRightEm = getEmValueFromElement(this.inputElement, inputPaddingRightPx);
        const buttonWidthEm = getEmValueFromElement(this.buttonElement, this.buttonElement.offsetWidth);
        this.buttonElement.style.right = paddingRightEm + "em";
        this.inputElement.style.paddingRight = (2 * paddingRightEm + buttonWidthEm) + "em";
        this.inputElement.style.flex = "1";
        this.inputElement.addEventListener("focus", () => this.focus = true);
        this.inputElement.addEventListener("blur", () => this.focus = false);

        this.initialized = true;
        this.changeDetectorRef.detectChanges(); // Otherwise ExpressionChangedAfterItHasBeenCheckedError
    }

    onMouseenter() { this.hover = true; }

    onMouseleave() { this.hover = false; }

    onClick() {
        this.inputElement.value = "";
        this.inputElement.dispatchEvent(new Event("input"));
        this.inputElement.focus();
    }
}

function getEmValueFromElement(element: HTMLElement, pixelValue: number): number {
    if (!element.parentElement) {
        throw new Error("Unexpected condition");
    }
    const parentFontSize = parseFloat(window.getComputedStyle(element.parentElement).fontSize!);
    const elementFontSize = parseFloat(window.getComputedStyle(element).fontSize!);
    const pixelValueOfOneEm = (elementFontSize / parentFontSize) * elementFontSize;
    return pixelValue / pixelValueOfOneEm;
}
