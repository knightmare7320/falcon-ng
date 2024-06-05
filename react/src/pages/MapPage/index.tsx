import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useMap, useMapEvent, WMSTileLayer, MapContainer, TileLayer } from "react-leaflet";
import { useDispatch } from "react-redux";
import { Helmet } from "react-helmet-async";
import "leaflet/dist/leaflet.css"

import styles from "./index.module.css";
import { mapsActions } from "../../store/maps.slice";
import SiteLayer from "./SiteLayer";
import SectorLayer from "./SectorLayer";

export type MapProps = {
  latitude:number, 
  longitude:number,
};


function MyMap({latitude, longitude}:MapProps) {
  const dispatch = useDispatch();
  const map = useMap();

  useEffect(() => {
    map.setView({lat: latitude, lng: longitude});
    const ne = map.getBounds().getNorthEast();
    const sw = map.getBounds().getSouthWest();
    dispatch(mapsActions.setMapBounds({minLng: sw.lng, maxLng: ne.lng, minLat: sw.lat, maxLat: ne.lat}));
  }, [latitude, longitude])

  useMapEvent('moveend', () => {
    const ne = map.getBounds().getNorthEast();
    const sw = map.getBounds().getSouthWest();
    dispatch(mapsActions.setMapBounds({minLng: sw.lng, maxLng: ne.lng, minLat: sw.lat, maxLat: ne.lat}));
  });

  return null;
}


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
    <Helmet>
      <title>Falcon - Map</title>
    </Helmet>

    {latitude && longitude &&
      <MapContainer className={ styles['leaflet-container'] } center={[parseFloat(latitude), parseFloat(longitude)]} zoom={15} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <WMSTileLayer 
          url="http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi"
          layers="nexrad-n0r-900913"
          format="image/png"
          opacity={0.3}
          transparent={true}
          attribution="Weather data © 2012 IEM Nexrad"
        />

        <MyMap latitude={parseFloat(latitude)} longitude={parseFloat(longitude)}/>
        <SectorLayer />
        <SiteLayer /> 

      </MapContainer>
    }
  </>; 
}