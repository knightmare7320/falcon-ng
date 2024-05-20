import { Coords, GridLayer, DoneCallback, CircleMarker} from "leaflet";
import { createLayerComponent, createTileLayerComponent, type LayerProps } from "@react-leaflet/core";

import { fetchGeoSiteTile } from "../../util/map.service";
import { createImmutableStateInvariantMiddleware } from "@reduxjs/toolkit";
import L, { TileLayer } from "react-leaflet";


export const SiteLayer2 = createTileLayerComponent (
  L.TileLayer
)





class SiteLayer extends GridLayer {

  tileDataList: {[key: string]: any} = {};


  createTile(coords: Coords, done: DoneCallback): HTMLElement {
    // console.log('load', coords.x, coords.y, coords.z);
    var tile = document.createElement('div');

    if (coords.z < 7) return tile;

    fetchGeoSiteTile({...coords}).then(result => {
      const map = this._map;

      if (result.sites.length>0) {
        const siteList = [];
        result.sites.map(site => {
          const siteMarker = new CircleMarker([site.latitude, site.longitude], {
            radius:4,
            color:'white', 
            fillColor: 'green', 
            weight: 1, 
            fillOpacity: 0.9
          }); 
          siteMarker.addTo(map);
          siteList.push(siteMarker);1
        });
        this.tileDataList[`${coords.x}:${coords.y}:${coords.z}`] = siteList;
      }
      done(undefined, tile);
    });

    return tile;    
  }

  _removeTile(key) {
    const map = this._map;

    if(key in this.tileDataList) {
      this.tileDataList[key].map(item => {
        item.remove();
        item.removeFrom(map);
      });
      this.tileDataList[key].length = 0;
      delete this.tileDataList[key];
    }
    // console.log(this.tileDataList);
  }

}

const createSiteLayer = (props: any, context:any) => {
  const instance = new SiteLayer("placeholder", {...props});
  return {instance, context};
}

const siteLayer = createLayerComponent(createSiteLayer);
export default siteLayer;
