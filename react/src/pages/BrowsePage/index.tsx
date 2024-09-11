import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet-async";

import { browseActions } from "../../store/browse.slice";
import { RootState } from "../../store";

import LoadingSpinner from "../../components/ui/LoadingSpinner";
import BrowseTable from "./BrowseTable";
import PageNumber from "../../components/ui/PageNumber";
import PageSize from "../../components/ui/PageSize";

import { getTitle } from "./lookups";
import Breadcrumbs from "../../components/ui/Breadcrumbs";


export default function BrowsePage({type}: {type: string}) {
  const params = useParams();
  let id:number|undefined;
  if (params.id) {
    id = parseInt(params.id); 
  }
  

  const dispatch = useDispatch();
  const browseState = useSelector((state: RootState) => state.browse);
  useEffect(() => {
    if(browseState.status === 'init' || type !== browseState.type || id !== browseState.id) {
      dispatch(browseActions.setPageType({type, id}));
    }
  });

  function handlePageChange(pageNumber:number) {
    dispatch(browseActions.setPageNumber(pageNumber));
  }

  function handlePageSizeChange(pageSize:number) {
    dispatch(browseActions.setPageSize(pageSize));
  }

  return <>
    <Helmet>
      <title>Falcon - {getTitle(browseState.type, browseState.name)}</title>
    </Helmet>

    {browseState.status === 'loading' && <LoadingSpinner />}

    <Breadcrumbs 
      regionId={browseState.type === 'region' ? id : undefined}
      l4MarketId={browseState.type === 'l4Market' ? id : undefined}
      l5MarketId={browseState.type === 'l5Market' ? id : undefined}
      orgClusterId={browseState.type === 'orgCluster' ? id : undefined}
    />
    
    <main className="main-content">
      <h1>{getTitle(type, browseState.name)} Performance</h1>
      <BrowseTable type={browseState.type} rows={browseState.rows} />

      {browseState.totalRowCount > Math.min(...browseState.pageSizes) && <>
        <PageNumber pageCount={browseState.pageCount} pageNumber={browseState.pageNumber} onPageChange={handlePageChange} />
        <PageSize pageSize={browseState.pageSize} pageSizes={browseState.pageSizes} onPageSizeChange={handlePageSizeChange} />
      </>}

    </main>
  </>;
}