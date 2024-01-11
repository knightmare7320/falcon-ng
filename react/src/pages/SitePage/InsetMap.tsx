import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css"

import styles from "./InsetMap.module.css";
import SiteLayer from "../MapPage/SiteLayer";
import { mapsActions } from "../../store/maps.slice";
import SectorLayer from "../MapPage/SectorLayer";

function MyMap({latitude, longitude}: {latitude:number, longitude:number}) {
  const map = useMap();
  const dispatch = useDispatch();

  useEffect(() => {
    map.setView({lat: latitude, lng: longitude});
    const ne = map.getBounds().getNorthEast();
    const sw = map.getBounds().getSouthWest();
    dispatch(mapsActions.setMapBounds({minLng: sw.lng, maxLng: ne.lng, minLat: sw.lat, maxLat: ne.lat}));
  }, [latitude, longitude])
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
          <SectorLayer />
          
        </MapContainer>
      </Link>
    }
  </>; 
}