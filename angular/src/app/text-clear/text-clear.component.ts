import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ElementRef,
    HostListener,
    Input,
    ViewChild
} from "@angular/core";

// TODO: Move to library
@Component({
    selector: "app-text-clear",
    templateUrl: "./text-clear.component.html",
    styleUrls: ["./text-clear.component.scss"],
})
export class TextClearComponent implements AfterViewInit {

    constructor(private readonly changeDetectorRef: ChangeDetectorRef) { }

    @Input() showButtonWhenOutside = false;
    @Input() isTouchDevice: () => boolean;
    @ContentChild("input", { static: false }) input: ElementRef;
    @ContentChild("buttonContent", { static: false }) buttonContent: ElementRef;
    @ViewChild("div", { static: false }) div: ElementRef;
    @ViewChild("button", { static: false }) button: ElementRef;
    forceButtonVisibility = false;
    focus = false;
    hover = false;
    private getButtonOffsetWidthPx: () => number;

    get inputElement(): HTMLInputElement { return this.input.nativeElement; }

    private get buttonElement(): HTMLButtonElement { return this.button.nativeElement; }

    get showButton(): boolean {
        return this.forceButtonVisibility
            || (!!this.inputElement.value && (this.showButtonWhenOutside || this.focus || this.hover));
    }

    ngAfterViewInit() {
        if (!this.input) {
            throw new Error("#input is mandatory content.");
        }
        this.inputElement.addEventListener("focus", () => this.focus = true);
        this.inputElement.addEventListener("blur", () => this.focus = false);
        this.inputElement.style.flex = "1";

        if (listenToVisibilityChange) {
            this.getButtonOffsetWidthPx = () => {
                if (!this.showButton) {
                    // Temporarily force button visibility (provided that its container is visible),
                    // so offsetWidth is computed correctly.
                    this.forceButtonVisibility = true;
                    this.changeDetectorRef.detectChanges();
                }
                const offsetWidthPx = this.buttonElement.offsetWidth;
                if (this.forceButtonVisibility) {
                    this.forceButtonVisibility = false;
                    this.changeDetectorRef.detectChanges();
                }
                return offsetWidthPx;
            };
            listenToVisibilityChange(this.div.nativeElement, (visible: boolean) => {
                if (visible) {
                    this.style();
                }
            });
        } else {
            // style() might get called when the button's container (the div element) is invisible
            // and thus have a "wrong" offsetWidth of 0.
            // This is no problem when we can react to the container getting visible, because then
            // - finally - style() can run with the correct button's offsetWidth.
            // When we cannot do this (as in this else branch), at least we can consistently use 0
            // as the utton's offsetWidth.
            this.getButtonOffsetWidthPx = () => 0;
            this.style();
        }
    }

    @HostListener("window:resize") onWindowResize() {
        this.style();
    }

    private style() {
        const inputOriginalPaddingRightPx = this.getInputOriginalPaddingRightPx();

        if (this.isTouchDevice()) {
            this.buttonElement.style.paddingRight = inputOriginalPaddingRightPx + "px";
            this.buttonElement.style.paddingLeft = inputOriginalPaddingRightPx + "px";
            this.buttonElement.style.paddingTop =
                getCssPropertyPx(this.inputElement, "paddingTop") + "px";
            this.buttonElement.style.paddingBottom =
                getCssPropertyPx(this.inputElement, "paddingBottom") + "px";
            this.buttonElement.style.right = "0";

            this.inputElement.style.paddingRight = this.getButtonOffsetWidthPx() + "px";
        } else {
            this.buttonElement.style.padding = "0";
            this.buttonElement.style.right = inputOriginalPaddingRightPx + "px";

            this.inputElement.style.paddingRight =
                (this.getButtonOffsetWidthPx() + 2 * inputOriginalPaddingRightPx) + "px";
        }
    }

    private getInputOriginalPaddingRightPx(): number {
        const paddingRight = this.inputElement.style.paddingRight;
        this.inputElement.style.paddingRight = null;
        const result = getCssPropertyPx(this.inputElement, "paddingRight");
        this.inputElement.style.paddingRight = paddingRight;
        return result;
    }


    onMouseenter() { this.hover = true; }

    onMouseleave() { this.hover = false; }

    onClick() {
        this.inputElement.value = "";
        this.inputElement.dispatchEvent(new Event("input"));
        this.inputElement.focus();
    }
}

function getCssPropertyPx(
    element: HTMLElement,
    property: "paddingTop" | "paddingRight" | "paddingBottom"
): number {
    const value = window.getComputedStyle(element)[property];
    return value ? parseInt(value.replace("px", ""), 10) : 0;
}

// Adopted from https://stackoverflow.com/a/44670818/443836.
// Works only in browsers where IntersectionObserver is defined.
// TODO: Move to library
const listenToVisibilityChange =
    typeof IntersectionObserver !== "undefined" ?
        function (element: Element, callback: (visible: boolean) => void) {
            const observerOptions = {
                root: document.documentElement
            };

            const observer = new IntersectionObserver(
                entries => entries.forEach(entry => callback(entry.intersectionRatio > 0)),
                observerOptions
            );

            observer.observe(element);
        }
        :
        undefined;
