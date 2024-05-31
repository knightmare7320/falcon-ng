import { useEffect, useRef, useState } from "react";
import styles from "./index.module.css";
import { useSelector, useDispatch } from "react-redux";

import { useSearchParams } from "react-router-dom";

import { searchActions } from "../../store/search.slice";
import { RootState } from '../../store';
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import SearchResults from "./SearchResults";
import PageNumber from "../../components/ui/PageNumber";
import PageSize from "../../components/ui/PageSize";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchBoxValue, setSearchBoxValue] = useState('');
  const searchString = searchParams.get('q') || '';
  
  useEffect(() => {
    setSearchBoxValue(searchString);
    if (searchString) 
      dispatch(searchActions.setSearchString(searchString));
    else
      dispatch(searchActions.clearSearch());
  }, [searchString]);

  const dispatch = useDispatch();
  const searchState = useSelector((state:RootState) => state.search);

  function handleSearchBoxChange(event: React.FormEvent<HTMLInputElement>) {
    setSearchBoxValue(event.currentTarget.value);
  }

  function handleSubmit(event:React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSearchParams({q: searchBoxValue});
  }

  function handlePageChange(pageNumber:number) {
    dispatch(searchActions.setPageNumber(pageNumber));
  }

  function handlePageSizeChange(pageSize:number) {
    dispatch(searchActions.setPageSize(pageSize));
  }

  return <>
    {searchState.status==='loading' && <LoadingSpinner />}

    <br />
    <form className={styles.search__container} method="post" onSubmit={handleSubmit} >
      <input 
        className={styles.search__input} 
        type="text" 
        placeholder="Search" 
        value={searchBoxValue}
        onChange={handleSearchBoxChange}
        autoFocus 
      />
    </form>

    <main className="main-content">
      <SearchResults 
        rows={searchState.rows} 
      />

      {searchState.row_count > Math.min(...searchState.page_sizes) && <>
        <PageNumber pageCount={searchState.page_count} pageNumber={searchState.page_number} onPageChange={handlePageChange} />
        <PageSize pageSize={searchState.page_size} pageSizes={searchState.page_sizes} onPageSizeChange={handlePageSizeChange} />
      </>
      }
    </main>
  </>;
}