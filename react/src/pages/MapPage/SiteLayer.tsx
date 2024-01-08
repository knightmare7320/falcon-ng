import L, { Coords, DoneCallback, GridLayer, imageOverlay} from "leaflet";
import { createLayerComponent, LayerProps  } from "@react-leaflet/core";
import { ReactNode } from "react";

interface KittenProps extends LayerProps {
  userId: string,
  children?: ReactNode // PropsWithChildren is not exported by @react-leaflet/core
}

class Kitten extends L.TileLayer {
  getTileUrl(coords: L.Coords) {
    var i = Math.ceil( Math.random() * 4 );
    return "https://placekitten.com/256/256?image=" + i;
  }

  getAttribution() {
    return "<a href='https://placekitten.com/attribution.html'>PlaceKitten</a>"
  }
}

const createKittenLayer = (props: KittenProps, context:any) => {
  const instance = new Kitten("placeholder", {...props});
  return {instance, context};
}

const updateKittenLayer = (instance: any, props: KittenProps, prevProps: KittenProps) => {
  if (prevProps.userId !== props.userId) {
    if (instance.setUserId) instance.setUserId(props.userId)
  }
}

const KittenLayer = createLayerComponent(createKittenLayer, updateKittenLayer);
export default KittenLayer;


// import { useMapEvents } from "react-leaflet";

// export default function SiteLayer() {
//   const map = useMapEvents({
//     click: () => {
//       map.locate()
//     },
//     locationfound: (location) => {
//       console.log('location found:', location)
//     },
//   })
//   return null
// }