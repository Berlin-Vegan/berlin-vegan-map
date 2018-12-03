import { Component, EventEmitter, Input, Output } from "@angular/core";

// TODO: Move to library
@Component({
    selector: "app-text-clear",
    templateUrl: "./text-clear.component.html",
    styleUrls: [ "./text-clear.component.scss" ],
})
export class TextClearComponent {
    @Input() text: string;
    @Output() readonly textChange = new EventEmitter<string>();
}
