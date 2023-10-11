import { Component, OnChanges, AfterViewInit, Input, SimpleChanges } from "@angular/core";
import * as L from 'leaflet';
// import { MapLayerSitesService } from '../../components/geo/maplayer-sites.service';

@Component({
   selector: 'app-site-map',
   templateUrl: './site-map.component.html',
   styleUrls: ['./site-map.component.scss'],
})
export class SiteMapComponent implements OnChanges, AfterViewInit {
   @Input() latitude!: number;
   @Input() longitude!: number;
   private map!: L.Map;

   constructor(
      // private sitesLayer: MapLayerSitesService,
   ) {}

   ngOnChanges(changes: SimpleChanges): void {
      if(this.map && this.latitude && this.longitude) {
         this.map.setView({lat: this.latitude, lng: this.longitude}, 17);
      }
   }

   ngAfterViewInit() {
      this.initializeMap();
   }

   private initializeMap() {
      const baseMapURl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      this.map = L.map('map', {dragging: false, zoomControl: false, scrollWheelZoom: false});
      L.tileLayer(baseMapURl).addTo(this.map);
      // this.sitesLayer.setMap(this.map, baseLayer, 8, 10);
   }
}