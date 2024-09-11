import { PerformanceTabProps } from ".";


export default function BtsPerfRows({btss = [], sectors, carriers}:PerformanceTabProps) {
  const sectorCount = sectors?.length || 1;
  let carrierCounts:Map<number, number> = new Map();
  btss.map(bts => {
    const carrierCount = carriers.filter(carrier => carrier.btsId === bts.btsId).length;
    carrierCounts.set(bts.btsId, carrierCount);
  });

  return <>
    <tr>
      <th className="column-head top">Switch</th>
      { btss.map(bts => 
        <td className="column-head top" key={bts.btsId} colSpan={sectorCount * (carrierCounts.get(bts.btsId) || 1)}>
          <strong>{bts.mscName}</strong>
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
  </>;
}