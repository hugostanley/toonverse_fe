import { redirect } from 'react-router-dom';
import { getLocalStorage } from '@utils';

// to access user pages only when logged in as user
export function userAccess() {
  const { 'access-token': accessToken, uid, client, expiry, authorization } = getLocalStorage('Headers') || {};
  const { data } = getLocalStorage('AccountData');
  const { role, id, email } = data;

  if(!accessToken && !uid && !client && !expiry && !authorization) {
    return redirect("/login")
  }

  if (role !== undefined) {
    return redirect("/no-access");
  }

  return { accessToken, uid, client, expiry, authorization, id, email, role }
}

// workforce restricted pages
export function workforceAccess() {
  const { 'access-token': accessToken, uid, client, expiry, authorization } = getLocalStorage('Headers') || {};
  const { role, id } = getLocalStorage('AccountData');

  if(!accessToken && !uid && !client && !expiry && !authorization) {
    return redirect("/login")
  } 
  
  if (role === undefined) {
    return redirect("/no-access");
  }

  return { accessToken, uid, client, expiry, authorization, role, id }
}

// admin-restricted pages
export function adminAccess() {
  const { 'access-token': accessToken, uid, client, expiry, authorization } = getLocalStorage('Headers') || {};
  const { role, id } = getLocalStorage('AccountData');

  if(!accessToken && !uid && !client && !expiry && !authorization) {
    return redirect("/login")
  } 
  
  if (role === undefined || role !== 'admin') {
    return redirect("/no-access");
  }

  return { accessToken, uid, client, expiry, authorization, role, id }
}

// artist-restricted pages
export function artistAccess() {
  const { 'access-token': accessToken, uid, client, expiry, authorization } = getLocalStorage('Headers') || {};
  const { role, id } = getLocalStorage('AccountData');

  if(!accessToken && !uid && !client && !expiry && !authorization) {
    return redirect("/login")
  } 
  
  if (role === undefined || role !== 'artist') {
    return redirect("/no-access");
  }

  return { accessToken, uid, client, expiry, authorization, role, id }
}