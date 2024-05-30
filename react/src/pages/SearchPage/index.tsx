import { useEffect, useRef, useState } from "react";
import styles from "./index.module.css";
import { useSelector, useDispatch } from "react-redux";

import { useSearchParams } from "react-router-dom";

import { searchActions } from "../../store/search.slice";
import { RootState } from '../../store';
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import SearchResults from "./SearchResults";

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
        searchString={searchState.search_string} 
        rows={searchState.rows} 
      />
    </main>
  </>;
}