import { EquipmentTabProps } from ".";
import moment from 'moment';

export default function CarrierRows({btss, sectors, carriers}:EquipmentTabProps) {
  if (!carriers) return <></>;

  return <>
    <tr>
      <th className="column-head" style={{width:'140px'}}>Carrier</th>
      {btss.map(
        bts => sectors.map(
          (_) => carriers.filter(carrier => carrier.bts_id === bts.bts_id).map(
            carrier =>
              <td key={carrier.carrier_id} className="column-head">
                <strong>{carrier.carrier_designation_name}</strong>
              </td>
          )
        )
      )}
    </tr>
    <tr>
      <th>Channel</th>
      {btss.map(
        bts => sectors.map(
          (_) => carriers.filter(carrier => carrier.bts_id === bts.bts_id).map(
            carrier =>           
              <td key={carrier.carrier_id}>
                {carrier.channel_number}
              </td>
          )
        )
      )}
    </tr>
    <tr>
      <th>Type</th>
      {btss.map(
        bts => sectors.map(
          (_) => carriers.filter(carrier => carrier.bts_id === bts.bts_id).map(
            carrier =>           
              <td key={carrier.carrier_id}>
                {carrier.carrier_type_name}
              </td>
          )
        )
      )}
    </tr>
    <tr>
      <th>Status</th>
      {btss.map(
        bts => sectors.map(
          (_) => carriers.filter(carrier => carrier.bts_id === bts.bts_id).map(
            carrier =>           
              <td key={carrier.carrier_id}>
                {carrier.equipment_status_name}
              </td>
          )
        )
      )}
    </tr>
    <tr>
      <th>On-Air Date</th>
      {btss.map(
        bts => sectors.map(
          (_) => carriers.filter(carrier => carrier.bts_id === bts.bts_id).map(
            carrier =>           
              <td key={carrier.carrier_id}>
                {moment(carrier.on_air_date).format('M/D/YYYY')}
              </td>
          )
        )
      )}
    </tr>
  </>;
}