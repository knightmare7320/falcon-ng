import { useEffect } from "react";
import { useMap, MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css"

import styles from "./MapPage.module.css";
import SiteLayer from "./SiteLayer";

// https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=<YOUR_API_KEY>&units=metric

function MyMap() {
  const map = useMap();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error);
  });

  function success(position: GeolocationPosition) {
    map.panTo({lat: position.coords.latitude, lng: position.coords.longitude})
  }

  function error() {
    console.log("Unable to retrieve location");
  }

  return null;
}


export default function MapPage() {
  return (
    <MapContainer className={ styles['leaflet-container'] } center={[41.993250, -87.800073]} zoom={17} scrollWheelZoom={true}>
      <MyMap />

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[41.993250, -87.800073]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>

      <SiteLayer />
    </MapContainer>
  ); 
}