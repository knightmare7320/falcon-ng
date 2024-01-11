import { useSelector } from "react-redux";
import { useMap, LayerGroup, Polygon } from "react-leaflet";
import L, {LatLng} from "leaflet";

import { RootState } from "../../store";

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



/*--------------*/

function getPoly(z: number, latitude: number, longitude: number, azimuth: number, beamwidth: number): LatLng[] {
  const numberOfDegrees = 10;
  const points = [];
  points.push(L.latLng(latitude, longitude));
  for (let i = 0; i * numberOfDegrees <= beamwidth; i++) {
      points.push(
      plotPoint(
        latitude,
        longitude,
        azimuth - beamwidth / 2 + i * numberOfDegrees,
        getSize(z)),
      );
  }
  points.push(L.latLng(latitude, longitude));
  return points;
}

 /* CALCULATE A POINT AT A GIVEN BEARING AND DISTANCE */
function plotPoint(latitude: number, longitude: number, azimuth: number, distance: number): LatLng {
  const DEGREES_TO_RADIANS = Math.PI / 180.0;
  const EARTH_RADIUS = 6367447;
  const E = Math.E;
  const pi = Math.PI;

  const vLat  = latitude * DEGREES_TO_RADIANS;
  const vLong = longitude * DEGREES_TO_RADIANS;

  const R = EARTH_RADIUS / 1000 * (1 - E * E) / ((1 - E * E * (Math.sin(vLat) ^ 2)) ^ 1.5);

  const psi = distance / R;
  const phi = pi / 2 - vLat;

  const vBearing = azimuth * DEGREES_TO_RADIANS;

  const arccos = Math.cos(psi) * Math.cos(phi) + Math.sin(psi) * Math.sin(phi) * Math.cos(vBearing);
  const outLat = (pi / 2 - Math.acos(arccos)) / DEGREES_TO_RADIANS;

  const arcsin = Math.sin(vBearing) * Math.sin(psi) / Math.sin(phi);
  const outLong = (vLong + Math.asin(arcsin)) / DEGREES_TO_RADIANS;

  return L.latLng(outLat, outLong);
}

function getSize(z: number): number {
  // there might be some fancy way to calculate these numbers but I'm going by "feel"
  switch (z) {
    case 10: return 0.5;
    case 11: return 0.4;
    case 12: return 0.3;
    case 13: return 0.2;
    case 14: return 0.125;
    case 15: return 0.06;
    case 16: return 0.03;
    case 17: return 0.018;
    case 18: return 0.012;
    case 19: return 0.008;
    case 20: return 0.004;
    case 21: return 0.002;
  }
  return 0.002;
}