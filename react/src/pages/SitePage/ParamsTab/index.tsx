import BtsParamRows from "./BtsParamRows";
import SectorParamRows from "./SectorParamRows";
import CarrierParamRows from "./CarrierParamRows";

import { SiteState } from '../../../store/site.slice';
export type ParamsTabProps = {
  btss:SiteState['btss'], 
  sectors:SiteState['sectors'], 
  carriers:SiteState['carriers'],
};


export default function ParamsTab({btss, sectors, carriers}:ParamsTabProps) {
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