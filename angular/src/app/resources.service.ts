import { Injectable } from "@angular/core";

@Injectable()
export class ResourcesService {
    getDotImageUrl(colorString: string): string {
        return "https://maps.google.com/mapfiles/ms/icons/" + colorString + "-dot.png";
    }
}
