import { SiteState } from '../../../store/site.slice';

import BtsParamRows from "./BtsParamRows";
import SectorParamRows from "./SectorParamRows";
import CarrierParamRows from "./CarrierParamRows";

export default function ParamsTab({btss, sectors, carriers}: {btss:SiteState['btss'], sectors: SiteState['sectors'], carriers: SiteState['carriers']}) {
  return <>
    <table className="site-table equipment" style={{width: '100%'}}>
      <tbody>
        <BtsParamRows     btss={btss} sectors={sectors} carriers={carriers}/>
        <SectorParamRows  btss={btss} sectors={sectors} carriers={carriers}/>
        <CarrierParamRows btss={btss} sectors={sectors} carriers={carriers}/>
      </tbody>
    </table>
  </>;
}