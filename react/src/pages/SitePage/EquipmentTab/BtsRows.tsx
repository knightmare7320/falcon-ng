import { EquipmentTabProps } from ".";
import moment from 'moment';

export default function BtsRows({btss, sectors, carriers}:EquipmentTabProps) {
  const sectorCount = sectors.length;
  let carrierCounts:Map<number, number> = new Map();
  btss.map(bts => {
    const carrierCount = carriers.filter(carrier => carrier.bts_id === bts.bts_id).length;
    carrierCounts.set(bts.bts_id, carrierCount);
  });

  return <>
    <tr>
      <th className="column-head">Switch</th>
      { btss.map(bts => 
        <td className="column-head" key={bts.bts_id} colSpan={sectorCount * (carrierCounts.get(bts.bts_id) || 1)}>
          <strong>{bts.switch_name}</strong>
        </td>
      )}
    </tr>
    <tr>
      <th className="column-head">Switch CLLI Code</th>
      { btss.map(bts => 
        <td className="column-head" key={bts.bts_id} colSpan={sectorCount * (carrierCounts.get(bts.bts_id) || 1)}>
          <strong>{bts.clli_code}</strong>
        </td>
      )}
    </tr>
    <tr>
      <th className="column-head">BSC</th>
      { btss.map(bts => 
        <td className="column-head" key={bts.bts_id} colSpan={sectorCount * (carrierCounts.get(bts.bts_id) || 1)}>
          <strong>{bts.bsc_name}</strong>
        </td>
      )}
    </tr>
    <tr>
      <th className="column-head">BTS</th>
      { btss.map(bts => 
        <td className="column-head" key={bts.bts_id} colSpan={sectorCount * (carrierCounts.get(bts.bts_id) || 1)}>
          <strong>{bts.bts_number}</strong>
        </td>
      )}
    </tr>
    <tr>
      <th>Vendor</th>
      { btss.map(bts => 
        <td key={bts.bts_id} colSpan={sectorCount * (carrierCounts.get(bts.bts_id) || 1)}>{bts.equipment_vendor_name}</td>
      )}
    </tr>
    <tr>
      <th>Bts Type</th>
      { btss.map(bts => 
        <td key={bts.bts_id} colSpan={sectorCount * (carrierCounts.get(bts.bts_id) || 1)}>{bts.bts_type_name}</td>
      )}
    </tr>
    <tr>
      <th>Status</th>
      { btss.map(bts => 
        <td key={bts.bts_id} colSpan={sectorCount * (carrierCounts.get(bts.bts_id) || 1)}>{bts.equipment_status_name}</td>
      )}
    </tr>
    <tr>
      <th>On-Air Date</th>
      { btss.map(bts => 
        <td key={bts.bts_id} colSpan={sectorCount * (carrierCounts.get(bts.bts_id) || 1)}>{moment(bts.on_air_date).format('M/D/YYYY')}</td>
      )}
    </tr>
  </>;
}