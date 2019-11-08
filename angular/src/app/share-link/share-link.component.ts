import { Component, ElementRef, Input, ViewChild, } from "@angular/core";
import { MatMenuTrigger } from "@angular/material/menu";

// TODO: Move to library
@Component({
    selector: "app-share-link",
    templateUrl: "./share-link.component.html",
    styleUrls: ["./share-link.component.scss"]
})
export class ShareLinkComponent {

    @Input() title: string;
    @Input() header: string;
    @Input() url: string;
    @Input() clipboardTitle: string;

    @ViewChild(MatMenuTrigger, { static: false }) matMenuTrigger: MatMenuTrigger;
    @ViewChild("input", { static: false }) input: ElementRef;

    onMatButtonClick() {
        this.input.nativeElement.select();
    }

    onClipboardClick() {
        this.input.nativeElement.select();
        const success = document.execCommand("copy");
        if (!success) {
            alert("Could not copy text to clipboard.");
        }
        this.matMenuTrigger.closeMenu();
    }
}
