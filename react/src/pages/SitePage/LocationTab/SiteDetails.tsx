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
        {site.site_name &&
          <tr>
            <th style={{width:'120px'}}>Site Name</th>
            <td>{ site.site_name }</td>
          </tr>
        }
        {site.site_type_name &&
          <tr>
            <th>Site Type:</th>
            <td>{ site.site_type_name }</td>
          </tr>
        }
        {(site.address1 || site.city || site.state || site.zip_code) &&
          <tr>
            <th>Address:</th>
            <td>
              <address>
                { site.address1 } <br/>
                { site.city }, { site.state }  { site.zip_code }
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
        {site.elevation_feet &&
          <tr>
            <th>Elevation:</th>
            <td>{ site.elevation_feet } ft</td>
          </tr>
        }
        {site.structure_type_name &&
          <tr>
            <th>Structure Type:</th>
            <td>{ site.structure_type_name }</td>
          </tr>
        }
        {site.repair_priority_name &&
          <tr>
            <th>Repair Priority:</th>
            <td>{ site.repair_priority_name }</td>
          </tr>
        }
        {site.timezone_name &&
          <tr>
            <th>Timezone:</th>
            <td>{ site.timezone_name }</td>
          </tr>
        }
        {site.region_name &&
          <tr>
            <th>Region:</th>
            <td><Link to={`/browse/region/${site.region_id}`} >{ site.region_name }</Link></td>
          </tr>
        }
        {site.l4_market_name &&
          <tr>
            <th>L4 Market:</th>
            <td><Link to={`/browse/l4_market/${site.l4_market_id}`} >{ site.l4_market_name }</Link></td>
          </tr>
        }
        {site.l5_market_name &&
          <tr>
            <th>L5 Market:</th>
            <td><Link to={`/browse/l5_market/${site.l5_market_id}`} >{ site.l5_market_name }</Link></td>
          </tr>
        }
        {site.org_cluster_name &&
          <tr>
            <th>Cluster:</th>
            <td><Link to={`/browse/cluster/${site.org_cluster_id}`} >{ site.org_cluster_name }</Link></td>
          </tr>
        }
        {(site.create_date || site.created_by_name) &&
          <tr className="edits">
            <th>Created by:</th>
            <td>{ site.created_by_name } on { moment(site.create_date).format('M/D/YYYY h:mm:ss a')}</td>
          </tr>
        }
        {(site.modified_date || site.modified_by_name) &&
          <tr className="edits">
            <th>Modified by:</th>
            <td>{ site.modified_by_name } on { moment(site.modified_date).format('M/D/YYYY h:mm:ss a') }</td>
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