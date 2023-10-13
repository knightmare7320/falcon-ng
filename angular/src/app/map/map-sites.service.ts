// old code from previous attempt!  not used, just putting it here for ease of reference

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as L from 'leaflet';
import { GeoService } from 'src/app/store/geo.service';

// TODO: Add cascade labels for markers
// TODO: Merge the different layers into one, initially they were all independant but I had to combine the data calls for speed, and now the code is all redundant

@Injectable()
export class MapLayerSitesService {
   map!: L.Map;
   baseLayer!: L.Layer;
   paneName = 'sitesPane';

   minZoom = 9;
   maxZoom = 10;

   tileDataList = [];

   constructor(
      private geoService: GeoService,
      private router: Router,
   ) { }

   setMap(map: any, baseLayer: any, minZoom = 9, maxZoom = 10): void {
      this.map = map;
      this.baseLayer = baseLayer;
      this.minZoom = minZoom;
      this.maxZoom = maxZoom;

      this.map.createPane(this.paneName).style.zIndex = '610';

      this.baseLayer.on(
         'tileload',
         obj => {
         const x = obj.coords.x;
         const y = obj.coords.y;
         const z = obj.coords.z;

         if (z >= this.minZoom && z <= this.maxZoom) {
            this.createTile(x, y, z);
            this.geoService(x, y, z)

            this.apollo.watchQuery({
               query: GEO_SITES_QUERY,
               variables: {x, y, z},
            }).valueChanges.subscribe((response: any) => {
               this.processTileJson(x, y, z, response.data.geoSites);
            });
         }
         }
      );

      this.baseLayer.on(
         'tileunload',
         obj => {
         const x = obj.coords.x;
         const y = obj.coords.y;
         const z = obj.coords.z;

         this.clearTile(x, y, z);
         }
      );
   }

   unsetMap(): void {
      this.tileDataList.forEach(tile => {
         this.clearTile(tile.x, tile.y, tile.z);
      });
   }

   createTile(x: number, y: number, z: number): void {
      if (this.findTileIndex(x, y, z) < 0) {
         this.tileDataList.push({x, y, z, objects: []});
      }
   }

   processTileJson(x: number, y: number, z: number, json: any) {
      const tileIndex = this.findTileIndex(x, y, z);

      if (tileIndex >= 0) {
         const objects = [];
         json.map(site => {
         const object = L.circleMarker(
            [site.lat, site.lng],
            {radius: 4, weight: 1, color: 'white', fillOpacity: 1.0, fillColor: 'green', title: site.nme,
               pane: this.paneName,
            }
         );
         object.on('click', obj => this.router.navigate(['site', obj.target.options.title]));
         object.bindTooltip(site.nme).openTooltip();
         object.addTo(this.map);
         // sitesLayer.addLayer(mySite);
         objects.push(object);
         });
         this.tileDataList[tileIndex].objects = objects;
      }
   }

   findTileIndex(x: number, y: number, z: number): number {
      return this.tileDataList.findIndex(item => x === item.x && y === item.y && z === item.z);
   }

   clearTile(x: number, y: number, z: number): void {
      const tileIndex = this.findTileIndex(x, y, z);

      if (tileIndex >= 0) {
         for (const object of this.tileDataList[tileIndex].objects) {
         object.remove();
         }
         this.tileDataList[tileIndex].objects.length = 0;
         this.tileDataList.splice(tileIndex, 1);
      }
   }
}