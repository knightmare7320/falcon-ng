import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { Link } from "react-router-dom";
import "leaflet/dist/leaflet.css"

import styles from "./InsetMap.module.css";
import SiteLayer from "../MapPage/SiteLayer";


function MyMap({latitude, longitude}: {latitude:number, longitude:number}) {
  const map = useMap();
  map.setView([latitude, longitude]);
  return null;
}

export default function InsetMap({latitude, longitude}: {latitude:number, longitude:number}) {
  return <>
    {latitude && longitude && 
      <Link to={`/map?latitude=${latitude}&longitude=${longitude}`}>
        <MapContainer className={ styles['leaflet-container'] } center={[latitude, longitude]} zoom={17} scrollWheelZoom={false} dragging={false} zoomControl={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MyMap latitude={latitude} longitude={longitude} />

          <SiteLayer />
          
        </MapContainer>
      </Link>
    }
  </>; 
}