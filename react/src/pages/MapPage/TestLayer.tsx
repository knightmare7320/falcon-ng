import { Coords, GridLayer, DoneCallback, CircleMarker} from "leaflet";
import { createLayerComponent  } from "@react-leaflet/core";

import { fetchGeoSiteTile } from "../../util/map.service";

class SiteLayer extends GridLayer {

  tileDataList: {[key: string]: any} = {};


  createTile(coords: Coords, done: DoneCallback): HTMLElement {
    // console.log('load', coords.x, coords.y, coords.z);
    var tile = document.createElement('div');

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
          siteList.push(siteMarker);
        });
        this.tileDataList[`${coords.x}:${coords.y}:${coords.z}`] = siteList;
      }
      done(undefined, tile);
    });

    return tile;    
  }

  _removeTile(key) {
    if(key in this.tileDataList) {
      this.tileDataList[key].map(item => {
        item.remove();
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









// import L, { Coords, DoneCallback, GridLayer, imageOverlay} from "leaflet";
// import { createLayerComponent, LayerProps  } from "@react-leaflet/core";
// import { ReactNode } from "react";

// interface KittenProps extends LayerProps {
//   userId: string,
//   children?: ReactNode // PropsWithChildren is not exported by @react-leaflet/core
// }

// class Kitten extends L.TileLayer {
//   getTileUrl(coords: L.Coords) {
//     var i = Math.ceil( Math.random() * 4 );
//     return "https://placekitten.com/256/256?image=" + i;
//   }

//   getAttribution() {
//     return "<a href='https://placekitten.com/attribution.html'>PlaceKitten</a>"
//   }
// }

// const createKittenLayer = (props: KittenProps, context:any) => {
//   const instance = new Kitten("placeholder", {...props});
//   return {instance, context};
// }

// const updateKittenLayer = (instance: any, props: KittenProps, prevProps: KittenProps) => {
//   if (prevProps.userId !== props.userId) {
//     if (instance.setUserId) instance.setUserId(props.userId)
//   }
// }

// const KittenLayer = createLayerComponent(createKittenLayer, updateKittenLayer);
// export default KittenLayer;
