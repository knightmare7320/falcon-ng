import { useParams } from "react-router-dom"

export default function BrowseRegionPage() {
  const params = useParams();

  return <h1>Region {params.id}</h1>
}