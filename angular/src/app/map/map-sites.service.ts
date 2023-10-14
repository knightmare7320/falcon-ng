import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as Leaflet from 'leaflet';
import { GeoService, GeoSite } from 'src/app/store/geo.service';

// TODO: Merge the different layers into one, initially they were all independant but I had to combine the data calls for speed, and now the code is all redundant

@Injectable()
export class MapLayerSitesService {
   map!: Leaflet.Map;
   baseLayer!: Leaflet.Layer;
   paneName = 'sitesPane';

   minZoom = 9;
   maxZoom = 18;

   tileDataList: {x: number, y: number, z: number, objects: any[]}[] = [];

   constructor(
      private geoService: GeoService,
      private router: Router,
   ) { }

   setMap(map: Leaflet.Map, baseLayer: Leaflet.Layer, minZoom?: number, maxZoom?: number): void {
      this.map = map;
      this.baseLayer = baseLayer;
      if (minZoom) this.minZoom = minZoom;
      if (maxZoom) this.maxZoom = maxZoom;

      this.map.createPane(this.paneName).style.zIndex = '610';

      this.baseLayer.on(
         'tileload',
         obj => {
            const x = obj.coords.x;
            const y = obj.coords.y;
            const z = obj.coords.z;

            if (z >= this.minZoom && z <= this.maxZoom) {
               this.geoService.getSites(x, y, z).subscribe(result => {
                  if(result.rows && result.rows.length > 0 && result.Z === z) {
                     this.createTile(x, y, z);
                     this.processTileJson(x, y, z, result.rows);
                  }
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
         const objects: any[] = [];
         json.map((site: GeoSite) => {
            const object = Leaflet.circleMarker(
               [site.latitude, site.longitude],
               {radius: 4, weight: 1, color: 'white', fillOpacity: 1.0, fillColor: 'green'/*, title: site.cascade_code*/,
                  pane: this.paneName,
               }
            );
            object.on('click', () => this.router.navigate(['site', site.cascade_code]));
            object.bindTooltip(site.cascade_code).openTooltip();
            object.addTo(this.map);
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