import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useMap, useMapEvent, MapContainer, TileLayer } from "react-leaflet";
import { useDispatch } from "react-redux";
import "leaflet/dist/leaflet.css"

import styles from "./MapPage.module.css";
import { mapsActions } from "../../store/maps.slice";
import SiteLayer from "./SiteLayer";
import SectorLayer from "./SectorLayer";

// https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=<YOUR_API_KEY>&units=metric


function MyMap({latitude, longitude}: {latitude:number, longitude:number}) {
  const dispatch = useDispatch();
  const map = useMap();
  if (latitude && longitude) {
    map.setView({lat: parseFloat(latitude), lng: parseFloat(longitude)});
  }


  useMapEvent('moveend', () => {
    const zoom = map.getZoom();
    const ne = map.getBounds().getNorthEast();
    const sw = map.getBounds().getSouthWest();
    dispatch(mapsActions.setMapBounds({minLng: sw.lng, maxLng: ne.lng, minLat: sw.lat, maxLat: ne.lat}));
  }
  );

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
    {latitude && longitude &&
      <MapContainer className={ styles['leaflet-container'] } center={[parseFloat(latitude), parseFloat(longitude)]} zoom={15} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MyMap latitude={parseFloat(latitude)} longitude={parseFloat(longitude)}/>
        <SectorLayer />
        <SiteLayer />
      </MapContainer>
    }
  </>; 
}