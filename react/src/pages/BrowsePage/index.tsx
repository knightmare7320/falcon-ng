import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";

import { uiActions } from "../../store/ui-slice";

import { fetchBrowsePerfData, kpiTableType } from "../../util/http";

import LoadingSpinner from "../../components/ui/LoadingSpinner";
import BrowseTable from "./BrowseTable";

function getTitle(type: string, data: kpiTableType): string {
  if (type === "national") {
    return "National";
  } else if (type === "region") {
    return data.name + " Region";
  } else if (type === "l4_market") {
    return data.name + " L4 Market";
  } else if (type === "l5_market") {
    return data.name + " L5 Market";
  } else if (type === "cluster") {
    return data.name + " Cluster";
  }
  return '';
}

export default function BrowsePage({type}: {type: string}) {
  const params = useParams();
  const [pageNum, setPageNum] = useState(1);

  const dispatch = useDispatch();
  const pageSize = useSelector(state => state.ui.pageSize);
  const pageSizes = useSelector(state => state.ui.pageSizes);

  let id: number = -1;
  if (params.id) {
    id = parseInt(params.id); 
  }

  let queryKey: Array<string> = [];
  let queryFn;
  if (type === "national") {
    queryKey = ['national', pageNum, pageSize]; // TODO: include queryparams
    queryFn = ({signal}: {signal: AbortSignal}) => fetchBrowsePerfData({signal, type: 'national', page_number: pageNum, page_size: pageSize});
  } else if (type === "region") {
    queryKey = ["region", id.toString(), pageNum, pageSize]; // TODO: include queryparams
    queryFn = ({signal}: {signal: AbortSignal}) => fetchBrowsePerfData({signal, id, type:'region', page_number: pageNum, page_size: pageSize});
  } else if (type === "l4_market") {
    queryKey = ["l4_market", id.toString(), pageNum, pageSize]; // TODO: include queryparams
    queryFn = ({signal}: {signal: AbortSignal}) => fetchBrowsePerfData({signal, id, type:'l4_market', page_number: pageNum, page_size: pageSize});
  } else if (type === "l5_market") {
    queryKey = ["l5_market", id.toString(), pageNum, pageSize]; // TODO: include queryparams
    queryFn = ({signal}: {signal: AbortSignal}) => fetchBrowsePerfData({signal, id, type:'l5_market', page_number: pageNum, page_size: pageSize});
  } else if (type === "cluster") {
    queryKey = ["cluster", id.toString(), pageNum, pageSize]; // TODO: include queryparams
    queryFn = ({signal}: {signal: AbortSignal}) => fetchBrowsePerfData({signal, id, type:'cluster', page_number: pageNum, page_size: pageSize});
  }

  const { data, isPending, isError, error } = useQuery({queryKey, queryFn});

  function handlePageChange(event) {
    setPageNum(event.target.value);
  }
  function handlePageSizeChange(event) {
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
        <title>Falcon - {getTitle(type, data)}</title>
      </Helmet>

      <h1>{getTitle(type, data)} Performance</h1>
      <BrowseTable type={type} data={data} />

      { data.row_count > pageSize && 
        <>
          Page Number: 
          <select value={pageNum} onChange={handlePageChange}>
            {Array(Math.ceil(data.row_count / pageSize)).fill(1).map((_, idx) => <option key={idx} value={idx + 1}>{idx + 1}</option>)}
          </select>
        </>
      }

      Page Size: <select value={pageSize} onChange={handlePageSizeChange}>
        {pageSizes.map(val => <option key={val} value={val}>{val}</option>)}
      </select>

      {isPending && <LoadingSpinner />}
    </>;
  }

  return content;
}