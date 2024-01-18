import { SiteState } from "../../../store/site.slice";
import { Carrier } from "../../../util/site.model";

export default function CarrierRows({bts, sectors, carriers}: {bts:SiteState['bts'], sectors:SiteState['sectors'], carriers:SiteState['carriers']}) {
  if (!carriers) return <></>;

  return <>
    <tr>
      <th>Carrier</th>
      { carriers.map((item:Carrier) => <td key={item.carrier_id}>{item.carrier_designation_name}</td>) }
    </tr>
    <tr>
      <th>Channel</th>
      { carriers.map((item:Carrier) => <td key={item.carrier_id}>{item.channel_id}</td>) }
    </tr>
    <tr>
      <th>Type</th>
      { carriers.map((item:Carrier) => <td key={item.carrier_id}>{item.carrier_type_name}</td>) }
    </tr>
    <tr>
      <th>Status</th>
      { carriers.map((item:Carrier) => <td key={item.carrier_id}>{item.equipment_status_name}</td>) }
    </tr>
    <tr>
      <th>On-Air Date</th>
      { carriers.map((item:Carrier) => <td key={item.carrier_id}>{item.on_air_date}</td>) }
    </tr>
  </>;
}