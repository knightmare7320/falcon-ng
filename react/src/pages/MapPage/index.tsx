import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useMap, MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css"

import styles from "./MapPage.module.css";
import SiteLayer from "./SiteLayer";

// https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=<YOUR_API_KEY>&units=metric


function MyMap({latitude, longitude}: {latitude:number, longitude:number}) {
  const map = useMap();
  if (latitude && longitude) {
    map.setView({lat: parseFloat(latitude), lng: parseFloat(longitude)});
  }
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
        <SiteLayer />
      </MapContainer>
    }
  </>; 
}