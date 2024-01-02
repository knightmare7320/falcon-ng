import { Link } from "react-router-dom"
import { kpiRowType } from "../util/http"
import { ReactElement } from "react";

function getLink(type: string, id: number, name: string, description?: string): ReactElement {
  if (type==="national") {
    return <Link to={'/browse/region/'+id.toString()}>{name}</Link>;
  } else if (type==="region") {
    return <Link to={'/browse/l4_market/'+id.toString()}>{name}</Link>;
  } else if (type==="l4_market") {
    return <Link to={'/browse/l5_market/'+id.toString()}>{name}</Link>;
  } else if (type==="l5_market") {
    return <Link to={'/browse/cluster/'+id.toString()}>{name}</Link>;
  } else if (type==="cluster") {
    return <Link to={'/site/' + name} title={description}>{name}</Link>;
  }
  return <></>;
}

export default function RegionRow({type, row}: {type: string, row: kpiRowType}) {
  return (
    <tr>
      <td>{getLink(type, row.id, row.name, row.description)}</td>
      <td>{row.setup_attempts}</td>
      <td>{row.access_failures}</td>
      <td>{row.equipment_blocks}</td>
      <td>{row.successful_calls}</td>
      <td>{row.primary_drops}</td>
      <td>{row.primary_erlangs}</td>
    </tr>
  )
}