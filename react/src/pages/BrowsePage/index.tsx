import { ChangeEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";

import { uiActions } from "../../store/ui-slice";

import { fetchBrowsePerfData } from "../../util/http";

import LoadingSpinner from "../../components/ui/LoadingSpinner";
import BrowseTable from "./BrowseTable";
import PageNumber from "../../components/ui/PageNumber";
import PageSize from "../../components/ui/PageSize";

import { getTitle, getQuery } from "./lookups";


export default function BrowsePage({type}: {type: string}) {
  const params = useParams();
  let id: number = -1;
  if (params.id) {
    id = parseInt(params.id); 
  }
  

  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = useSelector(state => state.ui.pageSize);
  const pageSizes = useSelector(state => state.ui.pageSizes);



  const query = getQuery( type, id.toString(), pageNumber, pageSize, fetchBrowsePerfData);
  const { data, isPending, isError, error } = useQuery({queryKey: query.queryKey, queryFn: query.queryFn});


  function handlePageChange(event: ChangeEvent) {
    setPageNumber(event.target.value);
  }

  function handlePageSizeChange(event: ChangeEvent) {
    dispatch(uiActions.setPageSize(event.target.value));
  }


  let content;
  // TODO: push the error into a notification instead
  if (isError) {
    content = <p>ERROR - {error.message}</p>;
  }

  if (data && data.rows) {
    content = <>
      <Helmet>
        <title>Falcon - {getTitle(type, data?.name)}</title>
      </Helmet>

      <h1>{getTitle(type, data?.name)} Performance</h1>
      <BrowseTable type={type} data={data} />

      <PageNumber rowCount={data.row_count} pageNumber={pageNumber} pageSize={pageSize} handlePageChange={handlePageChange} />
      <PageSize pageSize={pageSize} pageSizes={pageSizes} handlePageSizeChange={handlePageSizeChange} />

      {isPending && <LoadingSpinner />}
    </>;
  }

  return content;
}