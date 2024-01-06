import { useMapEvents } from "react-leaflet";

export default function SiteLayer() {
  const map = useMapEvents({
    click: () => {
      map.locate()
    },
    locationfound: (location) => {
      console.log('location found:', location)
    },
  })
  return null
}