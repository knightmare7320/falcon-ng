import { useEffect, useState } from "react";
import styles from "./index.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet-async";

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
    if (searchState.status === 'ok' && searchState.row_count === 1 && searchState.search_string.toLocaleUpperCase() === searchState.rows[0].cascade_code.toLocaleUpperCase()) {
      // there is exactly one search result and it is for the cascade requested
      navigate(`/site/${searchState.search_string.toLocaleUpperCase()}`);
    }
  }, [searchState.search_string, searchState.status])


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
    <Helmet>
      <title>Falcon - Search</title>
    </Helmet>

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