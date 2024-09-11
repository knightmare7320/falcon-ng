import { Link } from 'react-router-dom';
import moment from 'moment';

import { Site } from '../../../util/site.model';
import { useDispatch } from 'react-redux';
import { siteActions } from '../../../store/site.slice';

type SiteDetailsProps = {
  site:Site,
  authState:string,
};

export default function SiteDetails({site, authState}:SiteDetailsProps) {
  const dispatch = useDispatch();
  
  function handleOpenEditSite() {
    dispatch(siteActions.openEditSite());
  }

  return <>
    <table className="site-table">
      <tbody>
        {site.siteName &&
          <tr>
            <th style={{width:'120px'}}>Site Name</th>
            <td>{ site.siteName }</td>
          </tr>
        }
        {site.siteTypeName &&
          <tr>
            <th>Site Type:</th>
            <td>{ site.siteTypeName }</td>
          </tr>
        }
        {(site.address || site.city || site.state || site.zipCode) &&
          <tr>
            <th>Address:</th>
            <td>
              <address>
                { site.address } <br/>
                { site.city }, { site.state }  { site.zipCode }
              </address>
            </td>
          </tr>
        }
        {site.county &&
          <tr>
            <th>County:</th>
            <td>{ site.county }</td>
          </tr>
        }
        {site.latitude &&
          <tr>
            <th>Latitude:</th>
            <td>{ site.latitude }&deg; N</td>
          </tr>
        }
        {site.longitude &&
          <tr>
            <th>Longitude:</th>
            <td>{ site.longitude }&deg; E</td>
          </tr>
        }
        {site.elevation &&
          <tr>
            <th>Elevation:</th>
            <td>{ site.elevation } ft</td>
          </tr>
        }
        {site.structureTypeName &&
          <tr>
            <th>Structure Type:</th>
            <td>{ site.structureTypeName }</td>
          </tr>
        }
        {site.repairPriorityName &&
          <tr>
            <th>Repair Priority:</th>
            <td>{ site.repairPriorityName }</td>
          </tr>
        }
        {site.timezoneName &&
          <tr>
            <th>Timezone:</th>
            <td>{ site.timezoneName }</td>
          </tr>
        }
        {site.regionName &&
          <tr>
            <th>Region:</th>
            <td><Link to={`/browse/region/${site.regionId}`} >{ site.regionName }</Link></td>
          </tr>
        }
        {site.l4MarketName &&
          <tr>
            <th>L4 Market:</th>
            <td><Link to={`/browse/l4Market/${site.l4MarketId}`} >{ site.l4MarketName }</Link></td>
          </tr>
        }
        {site.l5MarketName &&
          <tr>
            <th>L5 Market:</th>
            <td><Link to={`/browse/l5Market/${site.l5MarketId}`} >{ site.l5MarketName }</Link></td>
          </tr>
        }
        {site.orgClusterName &&
          <tr>
            <th>Cluster:</th>
            <td><Link to={`/browse/orgCluster/${site.orgClusterId}`} >{ site.orgClusterName }</Link></td>
          </tr>
        }
        {(site.createDate || site.createdByName) &&
          <tr className="edits">
            <th>Created by:</th>
            <td>{ site.createdByName } on { moment(site.createDate).format('M/D/YYYY h:mm:ss a')}</td>
          </tr>
        }
        {(site.modifiedDate || site.modifiedByName) &&
          <tr className="edits">
            <th>Modified by:</th>
            <td>{ site.modifiedByName } on { moment(site.modifiedDate).format('M/D/YYYY h:mm:ss a') }</td>
          </tr>
        }
      </tbody>
    </table>
    {authState === 'ok' &&
      <div style={{textAlign: 'right'}}>
        <button className="link" onClick={handleOpenEditSite}> 
          edit site details
        </button>
      </div>
    }
  </>;
}