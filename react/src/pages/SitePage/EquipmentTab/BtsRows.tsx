import { EquipmentTabProps } from ".";
import moment from 'moment';

export default function BtsRows({btss, sectors, carriers}:EquipmentTabProps) {
  const sectorCount = sectors.length;
  let carrierCounts:Map<number, number> = new Map();
  btss.map(bts => {
    const carrierCount = carriers.filter(carrier => carrier.btsId === bts.btsId).length;
    carrierCounts.set(bts.btsId, carrierCount);
  });

  return <>
    <tr>
      <th className="column-head">Switch</th>
      { btss.map(bts => 
        <td className="column-head" key={bts.btsId} colSpan={sectorCount * (carrierCounts.get(bts.btsId) || 1)}>
          <strong>{bts.mscName}</strong>
        </td>
      )}
    </tr>
    <tr>
      <th className="column-head">Switch CLLI Code</th>
      { btss.map(bts => 
        <td className="column-head" key={bts.btsId} colSpan={sectorCount * (carrierCounts.get(bts.btsId) || 1)}>
          <strong>{bts.clliCode}</strong>
        </td>
      )}
    </tr>
    <tr>
      <th className="column-head">BSC</th>
      { btss.map(bts => 
        <td className="column-head" key={bts.btsId} colSpan={sectorCount * (carrierCounts.get(bts.btsId) || 1)}>
          <strong>{bts.bscName}</strong>
        </td>
      )}
    </tr>
    <tr>
      <th className="column-head">BTS</th>
      { btss.map(bts => 
        <td className="column-head" key={bts.btsId} colSpan={sectorCount * (carrierCounts.get(bts.btsId) || 1)}>
          <strong>{bts.btsNumber}</strong>
        </td>
      )}
    </tr>
    <tr>
      <th>Vendor</th>
      { btss.map(bts => 
        <td key={bts.btsId} colSpan={sectorCount * (carrierCounts.get(bts.btsId) || 1)}>{bts.equipmentVendorName}</td>
      )}
    </tr>
    <tr>
      <th>Status</th>
      { btss.map(bts => 
        <td key={bts.btsId} colSpan={sectorCount * (carrierCounts.get(bts.btsId) || 1)}>{bts.equipmentStatusName}</td>
      )}
    </tr>
    <tr>
      <th>On-Air Date</th>
      { btss.map(bts => 
        <td key={bts.btsId} colSpan={sectorCount * (carrierCounts.get(bts.btsId) || 1)}>{moment(bts.onAirDate).format('M/D/YYYY')}</td>
      )}
    </tr>
  </>;
}