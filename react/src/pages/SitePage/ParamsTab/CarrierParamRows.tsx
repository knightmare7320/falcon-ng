import { ParamsTabProps } from ".";


export default function CarrierParamRows({btss=[], sectors=[], carriers=[]}:ParamsTabProps) {
  if (!carriers) return <></>;
  return <>
    <tr>
      <th className="column-head top" style={{width:'140px'}}>Carrier</th>
      {btss.map(
        bts => sectors.map(
          (_) => carriers.filter(carrier => carrier.btsId === bts.btsId).map(
            carrier =>
              <td key={carrier.carrierId} className="column-head top">
                <strong>{carrier.carrierDesignationName}</strong>
              </td>
          )
        )
      )}
    </tr>
    <tr>
      <th>pn_offset</th>
      {btss.map(
        bts => sectors.map(
          (_) => carriers.filter(carrier => carrier.btsId === bts.btsId).map(
            carrier =>           
              <td key={carrier.carrierId}>
                &nbsp;
              </td>
          )
        )
      )}
    </tr>
    <tr>
      <th>tadd</th>
      {btss.map(
        bts => sectors.map(
          (_) => carriers.filter(carrier => carrier.btsId === bts.btsId).map(
            carrier =>           
              <td key={carrier.carrierId}>
                &nbsp;
              </td>
          )
        )
      )}
    </tr>
    <tr>
      <th>tdrop</th>
      {btss.map(
        bts => sectors.map(
          (_) => carriers.filter(carrier => carrier.btsId === bts.btsId).map(
            carrier =>           
              <td key={carrier.carrierId}>
                &nbsp;
              </td>
          )
        )
      )}
    </tr>
    <tr>
      <th>tcomp</th>
      {btss.map(
        bts => sectors.map(
          (_) => carriers.filter(carrier => carrier.btsId === bts.btsId).map(
            carrier =>           
              <td key={carrier.carrierId}>
                &nbsp;
              </td>
          )
        )
      )}
    </tr>
    <tr>
      <th>ttdrop</th>
      {btss.map(
        bts => sectors.map(
          (_) => carriers.filter(carrier => carrier.btsId === bts.btsId).map(
            carrier =>           
              <td key={carrier.carrierId}>
                &nbsp;
              </td>
          )
        )
      )}
    </tr>
    <tr>
      <th>pilot_power</th>
      {btss.map(
        bts => sectors.map(
          (_) => carriers.filter(carrier => carrier.btsId === bts.btsId).map(
            carrier =>           
              <td key={carrier.carrierId}>
                &nbsp;
              </td>
          )
        )
      )}
    </tr>
    <tr>
      <th>searchwin_a</th>
      {btss.map(
        bts => sectors.map(
          (_) => carriers.filter(carrier => carrier.btsId === bts.btsId).map(
            carrier =>           
              <td key={carrier.carrierId}>
                &nbsp;
              </td>
          )
        )
      )}
    </tr>
    <tr>
      <th>searchwin_n</th>
      {btss.map(
        bts => sectors.map(
          (_) => carriers.filter(carrier => carrier.btsId === bts.btsId).map(
            carrier =>           
              <td key={carrier.carrierId}>
                &nbsp;
              </td>
          )
        )
      )}
    </tr>
    <tr>
      <th>searchwin_r</th>
      {btss.map(
        bts => sectors.map(
          (_) => carriers.filter(carrier => carrier.btsId === bts.btsId).map(
            carrier =>           
              <td key={carrier.carrierId}>
                &nbsp;
              </td>
          )
        )
      )}
    </tr>

  </>;
}