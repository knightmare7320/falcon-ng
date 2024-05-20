import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useMap, useMapEvent, MapContainer, WMSTileLayer, TileLayer, GeoJSON } from "react-leaflet";
// import { useDispatch } from "react-redux";
import "leaflet/dist/leaflet.css"

import styles from "./index.module.css";
import { MapLibreTileLayer } from "./MapLibreTileLayer";
// import { mapsActions } from "../../store/maps.slice";
// import SiteLayer from "./SiteLayer";
// import SectorLayer from "./SectorLayer";
// import TestLayer from "./TestLayer";

export type MapProps = {
  latitude:number, 
  longitude:number,
};


// function MyMap({latitude, longitude}:MapProps) {
//   const dispatch = useDispatch();
//   const map = useMap();

  // useEffect(() => {
  //   map.setView({lat: latitude, lng: longitude});
  //   const ne = map.getBounds().getNorthEast();
  //   const sw = map.getBounds().getSouthWest();
  //   dispatch(mapsActions.setMapBounds({minLng: sw.lng, maxLng: ne.lng, minLat: sw.lat, maxLat: ne.lat}));
  // }, [latitude, longitude])

  // useMapEvent('moveend', () => {
  //   const ne = map.getBounds().getNorthEast();
  //   const sw = map.getBounds().getSouthWest();
  //   dispatch(mapsActions.setMapBounds({minLng: sw.lng, maxLng: ne.lng, minLat: sw.lat, maxLat: ne.lat}));

  //   // dispatch(mapsActions.fetchSiteTile({z:10, x:262, y:379}));
  //   // dispatch(mapsActions.fetchSectorTile({z:10, x:262, y:379}));
  // });

//   return null;
// }


export default function MapPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const latitude = searchParams.get('latitude');
  const longitude = searchParams.get('longitude');

  useEffect(() => {
    if (!searchParams.get("latitude") || !searchParams.get("longitude")) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => setSearchParams({latitude: position.coords.latitude.toString(), longitude: position.coords.longitude.toString()})
      )
    }
  }, [searchParams]);

  return <>
    {latitude && longitude &&
      <MapContainer className={ styles['leaflet-container'] } center={[parseFloat(latitude), parseFloat(longitude)]} zoom={15} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* <WMSTileLayer 
          url="http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi"
          layers="nexrad-n0r-900913"
          format="image/png"
          opacity={0.3}
          transparent={true}
          attribution="Weather data © 2012 IEM Nexrad"
        /> */}

        <MapLibreTileLayer 
          attribution="&copy; me"
          tiles={["http://localhost:3000/api/geo/json/sites/{z}/{x}/{y}"]}
        />


        {/* <MyMap latitude={parseFloat(latitude)} longitude={parseFloat(longitude)}/> */}

        {/* <SectorLayer />
        <SiteLayer />  */}

        {/* <TestLayer /> */}
      </MapContainer>
    }
  </>; 
}