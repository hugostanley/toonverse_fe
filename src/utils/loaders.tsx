import { redirect } from 'react-router-dom';
import { getLocalStorage } from '@utils';

// to access user pages only when logged in as user
export function userAccess() {
  const { 'access-token': accessToken, uid, client, expiry, authorization } = getLocalStorage('Headers') || {};

  if(!accessToken && !uid && !client && !expiry && !authorization) {
    return redirect("/login")
  }

  return { accessToken, uid, client, expiry, authorization }
}

// admin restricted pages
export function adminAccess() {
  const { 'access-token': accessToken, uid, client, expiry, authorization } = getLocalStorage('Headers') || {};

  if(!accessToken && !uid && !client && !expiry && !authorization) {
    return redirect("/login")
  }

  return { accessToken, uid, client, expiry, authorization }
}

// artist restricted pages
export function artistAccess() {
  const { 'access-token': accessToken, uid, client, expiry, authorization } = getLocalStorage('Headers') || {};

  if(!accessToken && !uid && !client && !expiry && !authorization) {
    return redirect("/login")
  }

  return { accessToken, uid, client, expiry, authorization }
}