import { Component, OnInit, OnDestroy, AfterViewInit, Input } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Subscription } from "rxjs";
import * as Leaflet from 'leaflet';
// import { Coords } from "leaflet";
import { MapLayerSitesService } from "./map-sites.service";
import { MapLayerSectorsService } from "./map-sectors.service";

Leaflet.Icon.Default.imagePath = 'assets/';
@Component({
   selector: 'app-map',
   templateUrl: './map.component.html',
   styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit, OnInit, OnDestroy {
   private routeListener: Subscription | undefined;
   @Input() latitude: number = 42.005450;
   @Input() longitude: number = -87.809870;
   @Input() zoom: number = 17;
   private map!: Leaflet.Map;
   
   constructor(
      private route: ActivatedRoute,
      private sitesLayer: MapLayerSitesService,
      private sectorsLayer: MapLayerSectorsService,
   ) {}

   ngOnInit(): void {
      this.routeListener = this.route.queryParams
         .subscribe(
         (params: Params) => {
            const latitude = params["latitude"];
            const longitude = params["longitude"];
            if (Number(latitude) && Number(longitude)) {
               this.latitude = Number(latitude);
               this.longitude = Number(longitude);
               if (this.map) {
                  this.map.panTo({lat: this.latitude, lng: this.longitude});
               }
            }
         }
      );
   }

   ngOnDestroy(): void {
      this.routeListener?.unsubscribe();
   }

   ngAfterViewInit(): void {
      this.initializeMap();      
   }

   private initializeMap() {
      const baseMapURl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      const baseMapAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';
      this.map = Leaflet.map('map-page');
      const baseLayer = Leaflet.tileLayer(baseMapURl, {attribution: baseMapAttribution}).addTo(this.map);
      this.map.setView({lat: this.latitude, lng: this.longitude, }, 17);

      this.sitesLayer.setMap(this.map, baseLayer, 8, 19);
      this.sectorsLayer.setMap(this.map, baseLayer, 8, 19);
      
      // this.map.addLayer( new SiteLayer() );
   }
}



// import { GeoService } from 'src/app/store/geo.service';
// import axios from 'axios';
// class SiteLayer extends Leaflet.GridLayer {
//    constructor(
//       // private geoService: GeoService,
//    ) {
//       super()
//    }

//    override createTile(coords: Coords, done: Function): any {
//       var tile = document.createElement('div');
//       // var tile = document.createElement('canvas');
//       // var ctx = tile.getContext('2d');

//       axios.get(`http://localhost:3000/api/geo/sites/${coords.z}/${coords.x}/${coords.y}`).then((response: any) => {
//          if(response.data.rows && response.data.rows.length > 0)  {
//             tile.style.outline = '1px solid red';
//          }
//          done(null, tile);	// Syntax is 'done(error, tile)'
//       });

//       return tile;
//    }
// }

// export class SitePane