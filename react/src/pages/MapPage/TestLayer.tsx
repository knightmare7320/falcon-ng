import { Coords, GridLayer} from "leaflet";
import { createLayerComponent  } from "@react-leaflet/core";

class TestLayer extends GridLayer {
  createTile(coords: Coords): HTMLElement {
    console.log('createTile', coords.x, coords.y, coords.z);
    var tile = document.createElement('div');
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
