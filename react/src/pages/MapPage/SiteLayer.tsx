import L, { Coords, DoneCallback, GridLayer} from "leaflet";
import { createLayerComponent  } from "@react-leaflet/core";


class SiteLayer extends GridLayer {

  initialize(url, options) {
    console.log('INITIALIZE');
    this._url = url;
    this._markerStore = {};
    L.GridLayer.prototype.initialize.call(this, options)
  }


  createTile(coords: Coords, done: DoneCallback) {
    var key = this._tileCoordsToKey(coords);

    var tile = document.createElement('div');
    tile.innerHTML = key;
    tile.style.outline = '1px dotted gray';
    tile.style.color = 'black';
    tile.style.fontWeight = 'bold';
    // tile.style.background = 'rgba(0,0,0,0.1)';
    
    fetch(`http://localhost:3000/api/geo/sites/${coords.z}/${coords.x}/${coords.y}`)
      .then(response => response.json())
      .then(json => {
        if(json.rows.length > 0) {
          console.log(json)
        }
        var markers = json.rows.map(function(site){
          const object = L.circleMarker(
            [site.latitude, site.longitude],
            {radius: 4, weight: 1, color: 'white', fillOpacity: 1.0, fillColor: 'green'/*, title: site.cascade_code*/,
          });
          // object.on('click', () => this.router.navigate(['site', site.cascade_code]));
          object.bindTooltip(site.cascade_code).openTooltip();
          return object;
        });
        var group = L.layerGroup(markers);
        this._markerStore[key] = group;
        group.addTo(this._map);

        done();
      });
   
    return tile;
  }

  
  _removeTile(key: string) {
    console.log('remove', key);
    delete this._markerStore[key];

    return L.GridLayer.prototype._removeTile.call(this, key);
  }
}


const createSiteLayer = (context:any) => {
  const instance = new SiteLayer();
  return {instance, context};
}


const siteLayer = createLayerComponent(createSiteLayer);
export default siteLayer;
