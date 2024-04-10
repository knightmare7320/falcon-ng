import Modal from "../../components/ui/Modal.js";
import { useDispatch } from 'react-redux';
import { siteActions } from '../../store/site.slice';

export default function EditSiteDialog({openFg}: {openFg:boolean}) {  
  const dispatch = useDispatch();
  
  function handleClose() {
    dispatch(siteActions.closeEditSite());
  }

  function handleFinish() {
    // userProgressCtx.hideCheckout();
    // cartCtx.clearCart();
  }

  function handleSubmit(event) {
    event.preventDefault();

    // const fd = new FormData(event.target);
    // const customerData = Object.fromEntries(fd.entries());

    // sendRequest(JSON.stringify({
    //   order: {
    //     items: cartCtx.items,
    //     customer: customerData,
    //   },
    // }));
  }

  return (
    <Modal open={openFg} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <header>Edit Site</header>

        <p>
          <label htmlFor="site_name">Site Name:</label>
          <input 
            id="site_name" 
            name="site_name" 
          />
          <br/>
  site_type_id: number,
  site_type_name: string,
  <br/>

          <label htmlFor="address1">Address:</label>
          <input 
            id="address1" 
            name="address1" 
          />
          <br/>

          <label htmlFor="city">City:</label>
          <input 
            id="city" 
            name="city" 
          />
          <br/>

          <label htmlFor="state">State:</label>
          <input 
            id="state" 
            name="state" 
          />
          <br/>

          <label htmlFor="zip_code">Zip:</label>
          <input 
            id="zip_code" 
            name="zip_code" 
          />
          <br/>

          <label htmlFor="county">County:</label>
          <input 
            id="county" 
            name="county" 
          />
          <br/>

          <label htmlFor="latitude">Latitude (&dev;N):</label>
          <input 
            id="latitude" 
            name="latitude" 
          />
          <br/>

          <label htmlFor="longitude">Longitude (&deg;E):</label>
          <input 
            id="longitude" 
            name="longitude" 
          />
          <br/>

          <label htmlFor="elevation_feet">Elevation (ft):</label>
          <input 
            id="elevation_feet" 
            name="elevation_feet" 
          />
          <br/>

  structure_type_id: number,
  structure_type_name: string,
  <br/>

  repair_priority_id: number,
  repair_priority_name: string,
  <br/>

  timezone_id: number,
  timezone_name: string,
  <br/>

  region_id: number,
  region_name: string,
  <br/>

  market99_id: number,
  market99_name: string,
  <br/>

  l4_market_id: number,
  l4_market_name: string,
  <br/>

  l5_market_id: number,
  l5_market_name: string,
  <br/>

  org_cluster_id: number,
  org_cluster_name: string,
  <br/>

  mta_id: number,
  mta_name: string,
  <br/>

  bta_id: number,
  bta_name: string,
</p>
  
  modified_date: string,

        <footer className="modal-actions">  
          <button onClick={handleClose}> 
            Cancel
          </button>
          <button onClick={handleClose}> 
            Save
          </button>
        </footer>   
      </form>
    </Modal>
  )
}
