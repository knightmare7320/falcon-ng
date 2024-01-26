import { useSelector } from "react-redux";
import { useMap, LayerGroup, Polygon } from "react-leaflet";

import { RootState } from "../../store";
import { getPoly } from "../../util/map.geo";

export default function SectorLayer() {
  const map = useMap();
  const zoom = map.getZoom();
  const sectors = useSelector((state: RootState) => state.maps.sectors);

  return <LayerGroup>{
    sectors.map(sector => {
      const poly = getPoly(zoom, sector.latitude, sector.longitude, sector.azimuth, sector.horizontal_bw);
      return <Polygon 
        key={sector.cascade_code + '-' + sector.sector_number} 
        positions={poly} 
        weight={1} 
        color={'#666666'} 
        opacity={0.6} 
        fillOpacity={0.5} 
        fillColor={'#ffffff'} 
        interactive={false} 
      />
    })
  }
  </LayerGroup>;
}