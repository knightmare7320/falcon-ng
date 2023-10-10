import { Component, Input } from "@angular/core";
import { Site } from "../store/site.model";

@Component({
   selector: 'app-site-info',
   templateUrl: './site-info.component.html',
   styleUrls: ['./site-info.component.scss'],
})
export class SiteInfoComponent {
   @Input() site: Site = {} as Site;
}