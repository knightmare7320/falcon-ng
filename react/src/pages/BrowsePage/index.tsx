import { ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";

import { browseActions } from "../../store/browseSlice";
import store from "../../store";

import LoadingSpinner from "../../components/ui/LoadingSpinner";
import BrowseTable from "./BrowseTable";
import PageNumber from "../../components/ui/PageNumber";
import PageSize from "../../components/ui/PageSize";

import { getTitle } from "./lookups";


export default function BrowsePage({type}: {type: string}) {
  const params = useParams();
  let id: number = -1;
  if (params.id) {
    id = parseInt(params.id); 
  }
  

  const dispatch = useDispatch();
  const browseState = useSelector((state: typeof store.getState) => state.browse);
  if(browseState.status === 'init' || type !== browseState.type || (id | -1) !== (browseState.id | -1)) {
    dispatch(browseActions.setPageType({type, id}));
  }


  function handlePageChange(event: ChangeEvent<HTMLSelectElement>) {
    dispatch(browseActions.setPageNumber(parseInt(event.target.value)));
  }

  function handlePageSizeChange(event: ChangeEvent<HTMLSelectElement>) {
    dispatch(browseActions.setPageSize(parseInt(event.target.value)));
  }


  return <>
    <Helmet>
      <title>Falcon - {getTitle(browseState.type, browseState.name)}</title>
    </Helmet>

    <h1>{getTitle(type, browseState.name)} Performance</h1>
    <BrowseTable type={browseState.type} rows={browseState.rows} />

    <PageNumber rowCount={browseState.row_count} pageNumber={browseState.page_number} pageSize={browseState.page_size} handlePageChange={handlePageChange} />
    <PageSize pageSize={browseState.page_size} pageSizes={browseState.page_sizes} handlePageSizeChange={handlePageSizeChange} />

    {browseState.status === 'loading' && <LoadingSpinner />}
  </>;
}