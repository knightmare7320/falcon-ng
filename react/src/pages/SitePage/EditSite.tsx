import { useEffect } from "react";
import Modal from "../../components/ui/Modal.js";
import { useDispatch, useSelector } from 'react-redux';
import { siteActions } from '../../store/site.slice';
import { RootState } from '../../store';
import { uiActions } from "../../store/ui.slice.js";

import classes from "./EditSite.module.css";

export default function EditSiteDialog({openFg}: {openFg:boolean}) {  
  const dispatch = useDispatch();
  const site = useSelector((state:RootState) => state.site.site);
  const uiState = useSelector((state:RootState) => state.ui);

  useEffect(() => {
    dispatch(uiActions.fetchSiteTypes());
    dispatch(uiActions.fetchStructureTypes());
    dispatch(uiActions.fetchRepairPriorities());
    dispatch(uiActions.fetchTimezones());
  }, []);
  
  function handleClose() {
    dispatch(siteActions.closeEditSite());
  }

  function handleFinish() {
    // userProgressCtx.hideCheckout();
    // cartCtx.clearCart();
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
console.log('test');
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    console.log(data);

    // sendRequest(JSON.stringify({
    //   order: {
    //     items: cartCtx.items,
    //     customer: customerData,
    //   },
    // }));
  }

  return (
    <Modal open={openFg} onClose={handleClose}>
        <header>Edit Site</header>

        <form onSubmit={handleSubmit} className={classes.form}>
          
          <label htmlFor="site_name">Site Name:</label>
          <input 
            id="site_name" 
            name="site_name" 
            defaultValue={site.site_name}
            autoFocus
          />
          
          <label htmlFor="site_type_id">Site Type:</label>
          <select 
            id="site_type_id" 
            name="site_type_id" 
            defaultValue={site.site_type_id}
          >
            { uiState.site_types.map(item => 
              <option value={item.id} key={item.id}>{item.name}</option>
            )}
          </select>

          <label htmlFor="address1">Address:</label>
          <input 
            id="address1" 
            name="address1" 
            defaultValue={site.address1}
          />

          <label htmlFor="city">City:</label>
          <input 
            id="city" 
            name="city" 
            defaultValue={site.city}
          />

          <label htmlFor="state">State:</label>
          <input 
            id="state" 
            name="state" 
            defaultValue={site.state}
          />

          <label htmlFor="zip_code">Zip:</label>
          <input 
            id="zip_code" 
            name="zip_code" 
            defaultValue={site.zip_code}
          />

          <label htmlFor="county">County:</label>
          <input 
            id="county" 
            name="county" 
            defaultValue={site.county}
          />

          <label htmlFor="latitude">Latitude (&deg;N):</label>
          <input 
            id="latitude" 
            name="latitude" 
            defaultValue={site.latitude}
          />

          <label htmlFor="longitude">Longitude (&deg;E):</label>
          <input 
            id="longitude" 
            name="longitude" 
            defaultValue={site.longitude}
          />

          <label htmlFor="elevation_feet">Elevation (ft):</label>
          <input 
            id="elevation_feet" 
            name="elevation_feet" 
            defaultValue={site.elevation_feet}
          />

          <label htmlFor="structure_type_id">Structure Type:</label>
          <select 
            id="structure_type_id" 
            name="structure_type_id" 
            defaultValue={site.structure_type_id}
          >
            { uiState.structure_types.map(item => 
              <option value={item.id} key={item.id}>{item.name}</option>
            )}
          </select>

          <label htmlFor="repair_priority_id">Repair Priority:</label>
          <select 
            id="repair_priority_id" 
            name="repair_priority_id" 
            defaultValue={site.repair_priority_id}
          >
            { uiState.repair_priorities.map(item => 
              <option value={item.id} key={item.id}>{item.name}</option>
            )}
          </select>

          <label htmlFor="timezone_id">Timezone:</label>
          <select 
            id="timezone_id" 
            name="timezone_id" 
            defaultValue={site.timezone_id}
          >
            { uiState.timezones.map(item => 
              <option value={item.id} key={item.id}>{item.name}</option>
            )}
          </select>



          <label htmlFor="region_id">Region:</label>
          <select 
            id="region_id" 
            name="region_id" 
            defaultValue={site.region_id}
          >
            { uiState.regions.map(item => 
              <option value={item.id} key={item.id}>{item.name}</option>
            )}
          </select>

          <label htmlFor="l4_market_id">L4 Market:</label>
          <select 
            id="l4_market_id" 
            name="l4_market_id" 
            defaultValue={site.l4_market_id}
          >
            { uiState.l4_markets.map(item => 
              <option value={item.id} key={item.id}>{item.name}</option>
            )}
          </select>

          <label htmlFor="l5_market_id">L5 Market:</label>
          <select 
            id="l5_market_id" 
            name="l5_market_id" 
            defaultValue={site.l5_market_id}
          >
            { uiState.l5_markets.map(item => 
              <option value={item.id} key={item.id}>{item.name}</option>
            )}
          </select>

          <label htmlFor="org_cluster_id">Cluster:</label>
          <select 
            id="org_cluster_id" 
            name="org_cluster_id" 
            defaultValue={site.org_cluster_id}
          >
            { uiState.clusters.map(item => 
              <option value={item.id} key={item.id}>{item.name}</option>
            )}
          </select>

</form>
  

        <footer className="modal-actions">  
          <button onClick={handleClose}> 
            Cancel
          </button>
          <button onClick={handleClose}> 
            Save
          </button>
        </footer>   
    </Modal>
  )
}
