import { LayerGroup, CircleMarker, Tooltip } from "react-leaflet";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

import { RootState } from "../../store";

export default function SiteLayer() {
  const navigate = useNavigate();

  const sites = useSelector((state: RootState) => state.maps.sites);

  return <LayerGroup>{
    sites.map(site => 
      <CircleMarker key={site.cascade_code} center={[site.latitude, site.longitude]} radius={4} pathOptions={{color:'white', fillColor: 'green', weight: 1, fillOpacity: 0.9}} eventHandlers={{
        click: () => {navigate(`/site/${site.cascade_code}`)}
      }}>
        <Tooltip>{site.cascade_code}</Tooltip>
      </CircleMarker>
    )
  }
  </LayerGroup>;
}
