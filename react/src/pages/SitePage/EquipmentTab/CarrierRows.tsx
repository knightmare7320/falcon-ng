import { EquipmentTabProps } from ".";
import moment from 'moment';

export default function CarrierRows({btss, sectors, carriers}:EquipmentTabProps) {
  if (!carriers) return <></>;

  return <>
    <tr>
      <th className="column-head" style={{width:'140px'}}>Carrier</th>
      {btss.map(
        bts => sectors.map(
          (_) => carriers.filter(carrier => carrier.btsId === bts.btsId).map(
            carrier =>
              <td key={carrier.carrierId} className="column-head">
                <strong>{carrier.carrierDesignationName}</strong>
              </td>
          )
        )
      )}
    </tr>
    <tr>
      <th>Channel</th>
      {btss.map(
        bts => sectors.map(
          (_) => carriers.filter(carrier => carrier.btsId === bts.btsId).map(
            carrier =>           
              <td key={carrier.carrierId}>
                {carrier.channelNumber}
              </td>
          )
        )
      )}
    </tr>
    <tr>
      <th>Type</th>
      {btss.map(
        bts => sectors.map(
          (_) => carriers.filter(carrier => carrier.btsId === bts.btsId).map(
            carrier =>           
              <td key={carrier.carrierId}>
                {carrier.carrierTypeName}
              </td>
          )
        )
      )}
    </tr>
    <tr>
      <th>Status</th>
      {btss.map(
        bts => sectors.map(
          (_) => carriers.filter(carrier => carrier.btsId === bts.btsId).map(
            carrier =>           
              <td key={carrier.carrierId}>
                {carrier.equipmentStatusName}
              </td>
          )
        )
      )}
    </tr>
    <tr>
      <th>On-Air Date</th>
      {btss.map(
        bts => sectors.map(
          (_) => carriers.filter(carrier => carrier.btsId === bts.btsId).map(
            carrier =>           
              <td key={carrier.carrierId}>
                {moment(carrier.onAirDate).format('M/D/YYYY')}
              </td>
          )
        )
      )}
    </tr>
  </>;
}