import { useEffect, useState } from "react";
import styles from "./index.module.css";
import { useSelector, useDispatch } from "react-redux";

import { useSearchParams, useNavigate } from "react-router-dom";

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

  const dispatch = useDispatch();
  const searchState = useSelector((state:RootState) => state.search);
  const navigate = useNavigate();
  
  useEffect(() => {
    setSearchBoxValue(searchString);
    if (searchString) 
      dispatch(searchActions.setSearchString(searchString));
    else
      dispatch(searchActions.clearSearch());
  }, [searchString]);

  useEffect(() => {
    if (searchState.status === 'ok' && searchState.totalRowCount === 1 && searchState.searchString.toLocaleUpperCase() === searchState.rows[0].cascadeCode.toLocaleUpperCase()) {
      // there is exactly one search result and it is for the cascade requested
      navigate(`/site/${searchState.searchString.toLocaleUpperCase()}`);
    }
  }, [searchState.searchString, searchState.status])


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
    <title>Falcon - Search</title>

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

      {searchState.totalRowCount > Math.min(...searchState.pageSizes) && <>
        <PageNumber pageCount={searchState.pageCount} pageNumber={searchState.pageNumber} onPageChange={handlePageChange} />
        <PageSize pageSize={searchState.pageSize} pageSizes={searchState.pageSizes} onPageSizeChange={handlePageSizeChange} />
      </>
      }
    </main>
  </>;
}