import BtsPerfRows from "./BtsPerfRows";
import SectorPerfRows from "./SectorPerfRows";
import CarrierPerfRows from "./CarrierPerfRows";

import { SiteState } from '../../../store/site.slice';
export type PerformanceTabProps = {
  btss:SiteState['btss'], 
  sectors:SiteState['sectors'], 
  carriers:SiteState['carriers'],
};


export default function PerformanceTab({btss, sectors, carriers}:PerformanceTabProps) {
  return <>
    <table className="site-table equipment" style={{width: '100%'}}>
      <tbody>
        <BtsPerfRows     btss={btss} sectors={sectors} carriers={carriers}/>
        <SectorPerfRows  btss={btss} sectors={sectors} carriers={carriers}/>
        <CarrierPerfRows btss={btss} sectors={sectors} carriers={carriers}/>
      </tbody>
    </table>
  </>;
}