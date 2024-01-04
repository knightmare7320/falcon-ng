import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../store';
import { siteActions } from '../../store/siteSlice';

export default function SitePage() {
  const params = useParams();
  let cascade_code: string = '';
  if (params.cascade_code) {
    cascade_code = params.cascade_code; 
  }
  
  const dispatch = useDispatch();
  const siteState = useSelector((state: RootState) => state.site);
  useEffect(() => {
    if(siteState.status === 'init' || cascade_code !== siteState.cascade_code) {
      dispatch(siteActions.setCascade(cascade_code));
    }
  });

  return (
    <>
      <Helmet>
        <title>Falcon - Site Page</title>
      </Helmet>
      <h1>Site Page</h1>
    </>
  );
}