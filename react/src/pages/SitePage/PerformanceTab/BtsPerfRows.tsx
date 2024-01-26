import { PerformanceTabProps } from ".";


export default function BtsPerfRows({btss = [], sectors, carriers}:PerformanceTabProps) {
  const sectorCount = sectors?.length || 1;
  let carrierCounts:Map<number, number> = new Map();
  btss.map(bts => {
    const carrierCount = carriers.filter(carrier => carrier.bts_id === bts.bts_id).length;
    carrierCounts.set(bts.bts_id, carrierCount);
  });

  return <>
    <tr>
      <th className="column-head top">Switch</th>
      { btss.map(bts => 
        <td className="column-head top" key={bts.bts_id} colSpan={sectorCount * (carrierCounts.get(bts.bts_id) || 1)}>
          <strong>{bts.switch_name}</strong>
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
  </>;
}