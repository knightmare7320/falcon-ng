import { redirect } from 'react-router-dom';

import { AuthResponse } from './auth.model';

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;



export async function fetchLogin(email:string, password:string):Promise<AuthResponse> {
  let url = API_URL + '/login';

  const response = await fetch(
    url,
    { method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password})
    },
  );
  
  if (response.status === 401) {
    //specifically pick up login error to drop in the form
    const info = await response.json();
    return { message: info?.message || 'Error' };
  }

  if (!response.ok) {
    const info = await response.json();
    const error = new Error(info?.message || 'There has been an error.');
    throw error;
  }

  return await response.json();}



export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem('expiration');
  const expirationDate = storedExpirationDate ? new Date(storedExpirationDate) : new Date();
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
}

export function getAuthToken() {
  const token = localStorage.getItem('token');

  if (!token) {
    return null;
  }

  const tokenDuration = getTokenDuration();

  if (tokenDuration < 0) {
    return 'EXPIRED';
  }

  return token;
}

export function tokenLoader() {
  const token = getAuthToken();
  return token;
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect('/login');
  }
}