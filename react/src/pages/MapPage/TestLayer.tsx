import { Coords, GridLayer} from "leaflet";
import { createLayerComponent  } from "@react-leaflet/core";


class TestLayer extends GridLayer {
  createTile(coords: Coords): HTMLElement {
    console.log('createTile', coords.x, coords.y, coords.z);
    var tile = document.createElement('div');
    tile.innerHTML = [coords.x, coords.y, coords.z].join(', ');
    tile.style.outline = '1px solid red';
    return tile;    
  }

  _removeTile(key) {
    console.log('unload', key);
  }
}

const createTestLayer = (props: any, context:any) => {
  console.log('create');
  const instance = new TestLayer("placeholder", {...props});
  return {instance, context};
}

const testLayer = createLayerComponent(createTestLayer);
export default testLayer;








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
